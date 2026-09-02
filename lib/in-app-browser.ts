/**
 * Facebook / Instagram / TikTok / WhatsApp in-app browsers (iPhone + Android).
 * Keep UA matching in one place — layout boot script, middleware, checkout, CSS.
 */

export const IN_APP_BROWSER_UA_SOURCE =
  "FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBSS|Messenger|Instagram|Line\\/|WhatsApp|TikTok|BytedanceWebview|musical_ly|TTWebView|Twitter|Snapchat|Pinterest|LinkedInApp|Telegram"

export const META_IN_APP_UA_SOURCE =
  "FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBSS|Messenger|Instagram"

const IN_APP_BROWSER_UA_RE = new RegExp(IN_APP_BROWSER_UA_SOURCE, "i")
const META_IN_APP_UA_RE = new RegExp(META_IN_APP_UA_SOURCE, "i")

function readUa(userAgent?: string | null): string {
  if (userAgent) return userAgent
  if (typeof navigator !== "undefined") return navigator.userAgent || ""
  return ""
}

/** Any social in-app WebView (Meta, TikTok, WhatsApp, Line, …). */
export function isInAppBrowser(userAgent?: string | null): boolean {
  return IN_APP_BROWSER_UA_RE.test(readUa(userAgent))
}

/** Facebook / Instagram / Messenger WebView — Meta ads conversion path. */
export function isMetaInAppBrowser(userAgent?: string | null): boolean {
  return META_IN_APP_UA_RE.test(readUa(userAgent))
}

export function isInstagramInApp(userAgent?: string | null): boolean {
  return /Instagram/i.test(readUa(userAgent))
}

export function isAndroidUa(userAgent?: string | null): boolean {
  return /Android/i.test(readUa(userAgent))
}

export function isAppleMobileUa(userAgent?: string | null): boolean {
  return /iPhone|iPad|iPod/i.test(readUa(userAgent))
}

export type InAppKind = "ig" | "fb" | "tt" | "wa" | "other"

export function inAppKind(userAgent?: string | null): InAppKind | null {
  const ua = readUa(userAgent)
  if (!IN_APP_BROWSER_UA_RE.test(ua)) return null
  if (/Instagram/i.test(ua)) return "ig"
  if (/TikTok|BytedanceWebview|musical_ly|TTWebView/i.test(ua)) return "tt"
  if (/WhatsApp/i.test(ua)) return "wa"
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBSS|Messenger/i.test(ua)) return "fb"
  return "other"
}

export type InAppOs = "ios" | "android" | "other"

export function inAppOs(userAgent?: string | null): InAppOs {
  const ua = readUa(userAgent)
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios"
  if (/Android/i.test(ua)) return "android"
  return "other"
}

/** Early UA flag set by the root-layout boot script (before React). */
export function isFacebookInAppFromDom(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.dataset.fbIab === "true"
}

/**
 * Android Chrome intent — leave Facebook/Instagram WebView so 3DS / PayPal / Google Pay work.
 * Fallback URL keeps Hotmart inside the current WebView if Chrome is missing.
 */
export function androidChromeIntentUrl(httpsUrl: string): string {
  try {
    const url = new URL(httpsUrl)
    if (url.protocol !== "https:" && url.protocol !== "http:") return httpsUrl
    const path = `${url.pathname}${url.search}${url.hash}`
    const fallback = encodeURIComponent(httpsUrl)
    return `intent://${url.host}${path}#Intent;scheme=${url.protocol.replace(":", "")};package=com.android.chrome;S.browser_fallback_url=${fallback};end`
  } catch {
    return httpsUrl
  }
}

/** Top-level Hotmart URL. Android IAB opens Chrome so 3DS / PayPal / Klarna work. */
export function checkoutPayHref(httpsUrl: string, userAgent?: string | null): string {
  if (isInAppBrowser(userAgent) && isAndroidUa(userAgent)) {
    return androidChromeIntentUrl(httpsUrl)
  }
  return httpsUrl
}

/** Desktop Safari/Chrome can embed Hotmart. In-app + phone WebViews cannot. */
export function canEmbedHotmartCheckout(userAgent?: string | null): boolean {
  if (isInAppBrowser(userAgent) || isFacebookInAppFromDom()) return false
  if (typeof window === "undefined") return false
  return window.matchMedia("(min-width: 1024px)").matches
}

export function applyInAppDomFlags(userAgent?: string | null): boolean {
  if (typeof document === "undefined") return false
  const ua = readUa(userAgent)
  const kind = inAppKind(ua)
  const root = document.documentElement
  if (!kind) return false
  root.dataset.fbIab = "true"
  root.dataset.iab = kind
  root.dataset.iabOs = inAppOs(ua)
  return true
}

/**
 * Instagram/Facebook WebViews drop the whole viewport tag if they see an
 * unknown key (e.g. interactive-widget). Page then lays out at ~980px and
 * Tailwind md: styles smash the phone UI. Keep this string conservative.
 */
export const IAB_VIEWPORT_CONTENT =
  "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"

export function lockInAppViewport(): void {
  if (typeof document === "undefined") return
  const head = document.head
  if (!head) return
  const existing = head.querySelector('meta[name="viewport"]')
  const meta =
    existing instanceof HTMLMetaElement
      ? existing
      : head.appendChild(document.createElement("meta"))
  meta.name = "viewport"
  if (meta.getAttribute("content") !== IAB_VIEWPORT_CONTENT) {
    meta.setAttribute("content", IAB_VIEWPORT_CONTENT)
  }
}

/**
 * Runs before React so lander chrome, viewport, and IAB flags exist on first paint.
 * Also restores the dismissed announcement flag.
 */
export const IN_APP_BROWSER_BOOT_SCRIPT = `(function(){var d=document.documentElement,u=navigator.userAgent||'',p=location.pathname||'',q=location.search||'',r=/${IN_APP_BROWSER_UA_SOURCE}/i,iab=r.test(u);if(iab){d.dataset.fbIab='true';d.dataset.iab=/Instagram/i.test(u)?'ig':/TikTok|BytedanceWebview|musical_ly|TTWebView/i.test(u)?'tt':/WhatsApp/i.test(u)?'wa':/FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBSS|Messenger/i.test(u)?'fb':'other';d.dataset.iabOs=/iPhone|iPad|iPod/i.test(u)?'ios':/Android/i.test(u)?'android':'other';d.style.webkitTextSizeAdjust='100%';d.style.textSizeAdjust='100%';var c='${IAB_VIEWPORT_CONTENT}',h=document.head,v=h&&h.querySelector('meta[name="viewport"]');if(v)v.setAttribute('content',c);else if(h){v=document.createElement('meta');v.name='viewport';v.content=c;h.appendChild(v)}}var ads=/^\\/ads(\\/|$)/.test(p),checkout=/^\\/checkout(\\/|$)/.test(p),paidQ=/utm_medium=(paid|cpc|cpm|ppc|paidsocial|paid_social|paid-social)/i.test(q)||/utm_source=(facebook|fb|instagram|ig|meta)\\b/i.test(q),paidHome=(p==='/'||p==='')&&(paidQ||(iab&&/[?&]fbclid=/.test(q)));if(ads||checkout||paidHome){d.dataset.lander=checkout?'checkout':'ads';d.dataset.announcement='hidden'}try{if(sessionStorage.getItem('announcement-dismissed')==='true')d.dataset.announcement='hidden'}catch(e){}})();`
