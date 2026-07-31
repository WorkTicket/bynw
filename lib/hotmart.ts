/** Singleton Hotmart checkout widget loader — deferred until a buy CTA needs it. */

declare global {
  interface Window {
    jQuery?: (element: HTMLElement) => {
      fancybox: (options: Record<string, unknown>) => void
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
      if (window.jQuery) {
        resolve()
        return
      }
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener(
        "error",
        () => reject(new Error("Hotmart widget failed")),
        { once: true }
      )
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

export function bindHotmartCheckout(anchor: HTMLAnchorElement) {
  const $ = window.jQuery
  if (!$) return false

  try {
    $(anchor).fancybox({
      type: "iframe",
      toolbar: false,
      smallBtn: true,
      iframe: {
        css: { width: "600px" },
        attr: { allowpaymentrequest: "true" },
      },
    })
    return true
  } catch {
    return false
  }
}

export function isMobileCheckout() {
  if (typeof window === "undefined") return false
  return (
    window.innerWidth <= 600 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
      navigator.userAgent
    )
  )
}
