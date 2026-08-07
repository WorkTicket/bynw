/** Singleton Hotmart checkout widget loader — deferred until a buy CTA needs it. */

declare global {
  interface Window {
    jQuery?: ((element: HTMLElement) => {
      fancybox: (options: Record<string, unknown>) => void
      off?: (events: string) => unknown
    }) & {
      fn?: unknown
    }
  }
}

let cssStarted = false
let jsPromise: Promise<void> | null = null

function ensureHotmartHints() {
  if (typeof document === "undefined") return
  if (!document.querySelector('link[data-hotmart-preconnect]')) {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = "https://static.hotmart.com"
    link.setAttribute("data-hotmart-preconnect", "1")
    document.head.appendChild(link)
  }
  if (!document.querySelector('link[data-hotmart-dns]')) {
    const link = document.createElement("link")
    link.rel = "dns-prefetch"
    link.href = "https://checkout.hotmart.com"
    link.setAttribute("data-hotmart-dns", "1")
    document.head.appendChild(link)
  }
}

export function loadHotmartCSS() {
  if (typeof document === "undefined") return
  if (cssStarted || document.querySelector('link[href*="hotmart-fb"]')) {
    cssStarted = true
    return
  }
  cssStarted = true
  ensureHotmartHints()
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://static.hotmart.com/css/hotmart-fb.min.css"
  document.head.appendChild(link)
}

export function loadHotmartJS(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.jQuery) return Promise.resolve()
  if (jsPromise) return jsPromise

  ensureHotmartHints()
  jsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="hotmart.com/checkout/widget"]'
    )
    if (existing) {
      const done = () => {
        if (window.jQuery) resolve()
      }
      if (window.jQuery) {
        resolve()
        return
      }
      existing.addEventListener("load", done, { once: true })
      existing.addEventListener(
        "error",
        () => {
          jsPromise = null
          reject(new Error("Hotmart widget failed"))
        },
        { once: true }
      )
      // Script may already be complete (load already fired).
      queueMicrotask(done)
      window.setTimeout(() => {
        if (window.jQuery) resolve()
      }, 0)
      return
    }
    const script = document.createElement("script")
    script.src = "https://static.hotmart.com/checkout/widget.min.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      jsPromise = null
      reject(new Error("Hotmart widget failed"))
    }
    document.body.appendChild(script)
  })

  return jsPromise
}

export function loadHotmartAssets(): Promise<void> {
  loadHotmartCSS()
  return loadHotmartJS()
}

/**
 * Strip Hotmart lightbox mode (`checkoutMode=2`) so checkout opens as a
 * full-page mobile-friendly flow instead of a cramped iframe widget.
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

/** Desktop Fancybox needs checkoutMode=2; product buyUrls omit it for SSR/mobile. */
export function toLightboxCheckoutUrl(href: string): string {
  try {
    const url = new URL(href)
    url.searchParams.set("checkoutMode", "2")
    return url.toString()
  } catch {
    if (/[?&]checkoutMode=/.test(href)) return href
    return href.includes("?")
      ? `${href}&checkoutMode=2`
      : `${href}?checkoutMode=2`
  }
}

export function isMobileCheckout() {
  if (typeof window === "undefined") return false
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|FBAN|FBAV|Instagram/i.test(
      navigator.userAgent
    )
  )
}

/** Desktop: Fancybox lightbox. Mobile / in-app browsers: never bind. */
export function bindHotmartCheckout(anchor: HTMLAnchorElement) {
  if (isMobileCheckout()) return false

  const $ = window.jQuery
  if (!$) return false

  try {
    // Avoid stacking Fancybox handlers when rebinding after href updates.
    const api = $(anchor) as {
      fancybox: (options: Record<string, unknown>) => void
      off?: (events: string) => unknown
    }
    api.off?.(".fb")
    // Ensure lightbox mode is on the href Fancybox will iframe.
    const lightbox = toLightboxCheckoutUrl(anchor.href)
    if (lightbox !== anchor.href) anchor.href = lightbox
    api.fancybox({
      type: "iframe",
      toolbar: false,
      smallBtn: true,
      iframe: {
        css: {
          width: "min(600px, 96vw)",
          maxWidth: "100%",
          height: "min(860px, 92vh)",
        },
        attr: { allowpaymentrequest: "true" },
      },
    })
    return true
  } catch {
    return false
  }
}
