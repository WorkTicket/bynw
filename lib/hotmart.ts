/** Hotmart checkout URL helpers — full-page only (iframe/lightbox breaks 3DS). */

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
 * full-page flow. 3DS, PayPal and bank redirects fail inside iframes.
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

/** On-site branded checkout path. Optionally keep the current query string. */
export function onsiteCheckoutPath(slug: string, search?: string): string {
  const q = (search ?? "").replace(/^\?/, "")
  return q ? `/checkout/${slug}?${q}` : `/checkout/${slug}`
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
