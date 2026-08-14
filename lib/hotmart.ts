/** Hotmart checkout URL helpers — embed on /checkout, full-page fallback. */

import {
  appendAttributionToHotmartUrl,
  captureAdAttribution,
  captureAndPersistFromLocation,
  readAdAttribution,
  type AdAttribution,
} from "@/lib/ad-attribution"

const EU_PAY_PARAMS: Record<string, string> = {
  hideBillet: "1",
  hideWallet: "1",
  hideTransf: "1",
  hideMultipleCards: "1",
}

/**
 * Strip Hotmart lightbox mode (`checkoutMode=2`) so checkout opens as a
 * full-page flow. Used as the iframe fallback (3DS / PayPal).
 */
export function toFullPageCheckoutUrl(href: string): string {
  try {
    const url = new URL(href)
    if (url.searchParams.get("checkoutMode") === "2") {
      url.searchParams.delete("checkoutMode")
    }
    return url.toString()
  } catch {
    return href
      .replace(/([?&])checkoutMode=2(&)?/g, (_, sep: string, amp?: string) =>
        amp ? sep : ""
      )
      .replace(/\?$/, "")
  }
}

/**
 * EU-safe checkout params. Boleto, Hotmart wallet and bank transfer look
 * broken when Facebook's in-app browser geolocates the buyer wrongly.
 */
export function withHotmartPayParams(href: string): string {
  try {
    const url = new URL(toFullPageCheckoutUrl(href))
    for (const [key, value] of Object.entries(EU_PAY_PARAMS)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value)
    }
    return url.toString()
  } catch {
    let next = toFullPageCheckoutUrl(href)
    for (const [key, value] of Object.entries(EU_PAY_PARAMS)) {
      if (new RegExp(`[?&]${key}=`).test(next)) continue
      next = next.includes("?") ? `${next}&${key}=${value}` : `${next}?${key}=${value}`
    }
    return next
  }
}

/** Full-page Hotmart URL with attribution + EU checkout params. Safe on server. */
export function buildHotmartPayUrl(
  buyUrl: string,
  search?: string | URLSearchParams | null,
  attrs?: AdAttribution
): string {
  let attribution: AdAttribution = attrs ?? {}
  if (!attrs) {
    if (typeof window !== "undefined") {
      attribution =
        search != null
          ? captureAndPersistFromLocation(search)
          : readAdAttribution()
    } else {
      attribution = captureAdAttribution(search) ?? {}
    }
  }
  return withHotmartPayParams(
    appendAttributionToHotmartUrl(buyUrl, attribution)
  )
}

/** Iframe embed — Hotmart only allows framing with checkoutMode=2. */
export function toLightboxCheckoutUrl(href: string): string {
  try {
    const url = new URL(toFullPageCheckoutUrl(href))
    url.searchParams.set("checkoutMode", "2")
    return url.toString()
  } catch {
    const stripped = toFullPageCheckoutUrl(href)
    if (/[?&]checkoutMode=/.test(stripped)) {
      return stripped.replace(/checkoutMode=[^&]*/g, "checkoutMode=2")
    }
    return stripped.includes("?")
      ? `${stripped}&checkoutMode=2`
      : `${stripped}?checkoutMode=2`
  }
}

/** Embedded Hotmart URL with attribution + EU checkout params. */
export function buildHotmartEmbedUrl(
  buyUrl: string,
  search?: string | URLSearchParams | null,
  attrs?: AdAttribution
): string {
  return toLightboxCheckoutUrl(buildHotmartPayUrl(buyUrl, search, attrs))
}

/** On-site branded checkout path. Optionally keep the current query string. */
export function onsiteCheckoutPath(slug: string, search?: string): string {
  const q = (search ?? "").replace(/^\?/, "")
  return q ? `/checkout/${slug}?${q}` : `/checkout/${slug}`
}

/** Read early UA flag set by inline script in root layout (before React). */
export function isFacebookInAppFromDom(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.dataset.fbIab === "true"
}

/**
 * Comprar destination: in Facebook/Instagram in-app browsers go straight to
 * Hotmart (iframe + /checkout hop often breaks payment). Normal browsers use
 * branded /checkout with embedded Hotmart.
 */
export function resolveBuyHref(
  slug: string,
  buyUrl: string,
  search?: string,
  opts?: { forceInApp?: boolean }
): string {
  const inApp =
    opts?.forceInApp !== undefined
      ? opts.forceInApp
      : isFacebookInAppFromDom() ||
        (typeof navigator !== "undefined" && isInAppBrowser())
  if (inApp) {
    return buildHotmartPayUrl(buyUrl, search)
  }
  return onsiteCheckoutPath(slug, search)
}

/**
 * Facebook / Instagram / TikTok in-app browsers. They often block
 * scripted `location.assign` to a third-party pay domain.
 */
export function isInAppBrowser(userAgent?: string): boolean {
  const ua =
    userAgent ??
    (typeof navigator !== "undefined" ? navigator.userAgent : "")
  return /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|WhatsApp|TikTok|BytedanceWebview|Twitter|Snapchat|Pinterest/i.test(
    ua
  )
}
