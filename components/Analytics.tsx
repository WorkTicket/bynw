"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

/** Meta standard events we optimize Facebook ads against.
 * Purchase is NOT fired on-site — Hotmart's Pixel must emit it with the same
 * NEXT_PUBLIC_FB_PIXEL_ID (see .env.example). If Purchase is undercounted, add CAPI.
 */
const META_STANDARD = new Set([
  "PageView",
  "ViewContent",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
  "Lead",
  "Contact",
  "CompleteRegistration",
  "Subscribe",
  "Search",
])

function trackPageView(url: string) {
  let gaOk = !GA_ID
  let fbOk = !FB_PIXEL_ID

  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("config", GA_ID, { page_path: url })
    gaOk = true
  }
  if (FB_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", "PageView")
    fbOk = true
  }
  return gaOk && fbOk
}

/** Retry until gtag/fbq are ready so the first landing PageView is never dropped. */
function trackPageViewWhenReady(url: string, onDone: () => void) {
  if (trackPageView(url)) {
    onDone()
    return () => {}
  }

  let attempts = 0
  // Idle/interaction deferred load — allow ~20s so first PageView isn't dropped
  const maxAttempts = 100
  const id = window.setInterval(() => {
    attempts += 1
    if (trackPageView(url) || attempts >= maxAttempts) {
      window.clearInterval(id)
      onDone()
    }
  }, 200)

  return () => window.clearInterval(id)
}

/** GA + Meta (auto: standard track vs trackCustom). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, params)
  }
  if (FB_PIXEL_ID && typeof window.fbq === "function") {
    if (META_STANDARD.has(name)) {
      window.fbq("track", name, params)
    } else {
      window.fbq("trackCustom", name, params)
    }
  }
}

/** Explicit Meta standard event (+ mirrored GA). */
export function trackMetaStandard(name: string, params?: Record<string, unknown>) {
  if (GA_ID && typeof window.gtag === "function") {
    const gaMap: Record<string, string> = {
      ViewContent: "view_item",
      InitiateCheckout: "begin_checkout",
      Purchase: "purchase",
      Lead: "generate_lead",
      Contact: "contact",
      AddToCart: "add_to_cart",
    }
    window.gtag("event", gaMap[name] || name, params)
  }
  if (FB_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", name, params)
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    dataLayer?: unknown[]
  }
}

type AttrBinding = {
  attr: string
  /** Meta event name */
  meta: string
  /** Optional GA event override */
  ga?: string
  /** Read commerce fields from data-* on the element */
  commerce?: boolean
}

const CLICK_BINDINGS: AttrBinding[] = [
  { attr: "data-track-hotmart-click", meta: "InitiateCheckout", ga: "begin_checkout", commerce: true },
  { attr: "data-track-whatsapp-click", meta: "Contact", ga: "whatsapp_click" },
  { attr: "data-track-shop-view", meta: "ShopCollectionClick", ga: "select_item", commerce: true },
]

function commerceFromEl(el: HTMLElement): Record<string, unknown> {
  const id = el.getAttribute("data-content-id") || el.getAttribute("data-track-hotmart-click") || ""
  const name = el.getAttribute("data-content-name") || undefined
  const valueRaw = el.getAttribute("data-value")
  const currency = el.getAttribute("data-currency") || undefined
  const value = valueRaw ? Number(valueRaw) : undefined
  const payload: Record<string, unknown> = {
    content_type: "product",
  }
  if (id) payload.content_ids = [id]
  if (name) payload.content_name = name
  if (typeof value === "number" && !Number.isNaN(value)) payload.value = value
  if (currency) payload.currency = currency
  return payload
}

function injectGa() {
  if (!GA_ID || typeof window === "undefined") return
  if (typeof window.gtag === "function") return

  window.dataLayer = window.dataLayer || []
  // Match gtag's Arguments object shape used by GA
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID, { send_page_view: false })

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return
  const s = document.createElement("script")
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  document.head.appendChild(s)
}

function injectFb() {
  if (!FB_PIXEL_ID || typeof window === "undefined") return
  if (typeof window.fbq === "function") return

  // Standard Meta pixel bootstrap — queues calls until fbevents.js loads
  type FbqFn = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void
    queue: unknown[]
    loaded: boolean
    version: string
    push: (...args: unknown[]) => void
  }

  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args)
    else n.queue.push(args)
  } as FbqFn

  window.fbq = n
  if (!window._fbq) window._fbq = n
  n.push = n
  n.loaded = true
  n.version = "2.0"
  n.queue = []

  if (!document.querySelector('script[src*="connect.facebook.net"]')) {
    const t = document.createElement("script")
    t.async = true
    t.src = "https://connect.facebook.net/en_US/fbevents.js"
    const first = document.getElementsByTagName("script")[0]
    first?.parentNode?.insertBefore(t, first)
  }
  window.fbq("init", FB_PIXEL_ID)
}

/** Load tags after LCP: idle (max ~2.5s) or first user gesture — keeps attribution intact. */
function scheduleAnalyticsLoad(load: () => void) {
  let done = false
  const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const
  const opts: AddEventListenerOptions = { once: true, passive: true, capture: true }

  let idleId: number | undefined
  let timer: number | undefined

  const cleanup = () => {
    for (const ev of events) window.removeEventListener(ev, onInteract, opts)
    if (idleId != null && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleId)
    }
    if (timer != null) window.clearTimeout(timer)
  }

  const run = () => {
    if (done) return
    done = true
    cleanup()
    load()
  }

  const onInteract = () => run()

  for (const ev of events) window.addEventListener(ev, onInteract, opts)

  if (typeof window.requestIdleCallback === "function") {
    idleId = window.requestIdleCallback(() => run(), { timeout: 2500 })
  } else {
    timer = window.setTimeout(run, 2000)
  }

  return cleanup
}

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tracked = useRef<string | null>(null)

  useEffect(() => {
    if (!GA_ID && !FB_PIXEL_ID) return
    return scheduleAnalyticsLoad(() => {
      injectGa()
      injectFb()
    })
  }, [])

  useEffect(() => {
    // Persist UTM/fbclid on first landing so Hotmart checkout can inherit them.
    if (searchParams) {
      captureAndPersistFromLocation(searchParams)
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (tracked.current === url) return

    // Mark pending so SPA navigations don't double-fire while scripts load.
    tracked.current = url
    return trackPageViewWhenReady(url, () => {
      // Keep tracked.current = url (already set)
    })
  }, [pathname, searchParams])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      for (const binding of CLICK_BINDINGS) {
        const el = target.closest(`[${binding.attr}]`) as HTMLElement | null
        if (!el) continue
        const label = el.getAttribute(binding.attr) || ""
        const params = binding.commerce
          ? { ...commerceFromEl(el), event_label: label }
          : { event_label: label, event_category: "engagement" }

        if (GA_ID && typeof window.gtag === "function") {
          window.gtag("event", binding.ga || binding.meta, params)
        }
        if (FB_PIXEL_ID && typeof window.fbq === "function") {
          if (META_STANDARD.has(binding.meta)) {
            window.fbq("track", binding.meta, params)
          } else {
            window.fbq("trackCustom", binding.meta, params)
          }
        }
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return null
}
