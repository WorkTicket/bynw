/** Hotmart checkout URL helpers — embed on /checkout, full-page fallback. */

import {
  AD_ATTRIBUTION_KEY,
  appendAttributionToHotmartUrl,
  captureAdAttribution,
  captureAndPersistFromLocation,
  readAdAttribution,
  type AdAttribution,
} from "@/lib/ad-attribution"
import {
  androidChromeIntentUrl,
  isAndroidUa,
  isInAppBrowser,
} from "@/lib/in-app-browser"

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

export {
  isFacebookInAppFromDom,
  isInAppBrowser,
} from "@/lib/in-app-browser"

/** Full-page Hotmart URL, or Android Chrome intent so cards/PayPal work. */
export function iabPayHref(
  buyUrl: string,
  search?: string | URLSearchParams | null
): string {
  const payUrl = buildHotmartPayUrl(buyUrl, search)
  if (typeof navigator !== "undefined" && isAndroidUa()) {
    return androidChromeIntentUrl(payUrl)
  }
  return payUrl
}

/**
 * Runs in the checkout HTML before React. Facebook/Instagram WebViews must
 * not sit on the "one more step" card — that extra tap drops the sale.
 */
export function checkoutInAppRedirectScript(buyUrl: string): string {
  const payKeys = JSON.stringify(Object.keys(EU_PAY_PARAMS))
  const attrKey = JSON.stringify(AD_ATTRIBUTION_KEY)
  return `(function(){var d=document.documentElement;if(d.dataset.fbIab!=="true"||d.dataset.iabPay==="1")return;d.dataset.iabPay="1";var base=${JSON.stringify(buyUrl)};try{var url=new URL(base);if(url.searchParams.get("checkoutMode")==="2")url.searchParams.delete("checkoutMode");${payKeys}.forEach(function(k){if(!url.searchParams.has(k))url.searchParams.set(k,"1")});var q=new URLSearchParams(location.search);var stored={};try{stored=JSON.parse(sessionStorage.getItem(${attrKey})||"{}")||{}}catch(e1){}function pick(k){return q.get(k)||stored[k]||""}var src=pick("utm_source")||(pick("fbclid")?"facebook":"");if(src&&!url.searchParams.has("src"))url.searchParams.set("src",src);var sck=[pick("utm_campaign"),pick("utm_content")].filter(Boolean).join("|");if(sck&&!url.searchParams.has("sck"))url.searchParams.set("sck",sck);var fb=pick("fbclid");if(fb&&!url.searchParams.has("xcod"))url.searchParams.set("xcod",String(fb).slice(0,255));var pay=url.toString();if(/Android/i.test(navigator.userAgent||"")){var u=new URL(pay);pay="intent://"+u.host+u.pathname+u.search+u.hash+"#Intent;scheme="+u.protocol.replace(":","")+";package=com.android.chrome;S.browser_fallback_url="+encodeURIComponent(url.toString())+";end"}location.replace(pay)}catch(err){location.replace(base)}})();`
}

/**
 * Comprar destination. Safari/Chrome stay on branded /checkout.
 * Facebook in-app: Hotmart immediately (no second "Pagar" tap).
 */
export function resolveBuyHref(
  slug: string,
  buyUrl: string,
  search?: string,
  opts?: { forceInApp?: boolean }
): string {
  const inApp =
    opts?.forceInApp ??
    (typeof navigator !== "undefined" && isInAppBrowser())
  if (inApp && buyUrl) return iabPayHref(buyUrl, search)
  return onsiteCheckoutPath(slug, search)
}

