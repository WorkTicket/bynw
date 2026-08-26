"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { newMetaEventId, sendBrowserCapiEvent } from "@/lib/meta-browser"
import {
  CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent,
  hasMarketingConsent,
  readConsent,
  type ConsentChoice,
} from "@/lib/consent"
import { isMetaPaidTraffic } from "@/lib/paid-traffic"
import { isFacebookInAppFromDom } from "@/lib/hotmart"
import { isMetaInAppBrowser } from "@/lib/in-app-browser"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

/** Meta standard events we optimize Facebook ads against.
 * InitiateCheckout: fires on Comprar tap and on /checkout load.
 * Purchase: Hotmart Pixel + CAPI webhook (/api/webhooks/hotmart) + optional
 * browser fire on /gracias with matching event_id (transaction).
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

const GA_EVENT_MAP: Record<string, string> = {
  ViewContent: "view_item",
  InitiateCheckout: "begin_checkout",
  Purchase: "purchase",
  Lead: "generate_lead",
  Contact: "contact",
  AddToCart: "add_to_cart",
}

function isAdsPath(pathname: string | null) {
  return Boolean(pathname?.startsWith("/ads"))
}

function isCheckoutPath(pathname: string | null) {
  return Boolean(pathname?.startsWith("/checkout"))
}

function isPaidDestinationPath(pathname: string | null) {
  return pathname === "/" || isAdsPath(pathname) || isCheckoutPath(pathname)
}

/** Home + /ads get eager pixel only when Meta paid params are present.
 * /checkout always eager-loads so InitiateCheckout is ready on the shell.
 * Cold lab runs (no utm/fbclid) stay deferred — attribution still fires on
 * real paid clicks and on first interaction / idle.
 */
function shouldEagerLoadAnalytics(
  pathname: string | null,
  searchParams: URLSearchParams | { get(name: string): string | null } | null
) {
  if (isCheckoutPath(pathname)) return true
  if (!isPaidDestinationPath(pathname)) return false
  if (!searchParams) return false
  return isMetaPaidTraffic(searchParams)
}

function splitMetaParams(params?: Record<string, unknown>) {
  if (!params) return { data: undefined as Record<string, unknown> | undefined, eventID: undefined as string | undefined }
  const { eventID, event_id, ...rest } = params
  const id =
    (typeof eventID === "string" && eventID) ||
    (typeof event_id === "string" && event_id) ||
    undefined
  return { data: rest, eventID: id }
}

function trackPageView(url: string, consent: ConsentChoice | null, eventID?: string) {
  let gaOk = !GA_ID || !hasAnalyticsConsent(consent)
  let fbOk = !FB_PIXEL_ID || !hasMarketingConsent(consent)

  if (hasAnalyticsConsent(consent) && GA_ID && typeof window.gtag === "function") {
    window.gtag("config", GA_ID, { page_path: url })
    gaOk = true
  }
  if (hasMarketingConsent(consent) && FB_PIXEL_ID && typeof window.fbq === "function") {
    if (eventID) window.fbq("track", "PageView", {}, { eventID })
    else window.fbq("track", "PageView")
    fbOk = true
  }
  return gaOk && fbOk
}

/** Retry until gtag/fbq are ready so the first landing PageView is never dropped. */
function trackPageViewWhenReady(
  url: string,
  consent: ConsentChoice | null,
  onDone: (ok: boolean) => void
) {
  const eventID = newMetaEventId()
  if (hasMarketingConsent(consent)) {
    sendBrowserCapiEvent({ event_name: "PageView", event_id: eventID })
  }

  if (trackPageView(url, consent, eventID)) {
    onDone(true)
    return () => {}
  }

  let attempts = 0
  const maxAttempts = 40
  const id = window.setInterval(() => {
    attempts += 1
    if (trackPageView(url, consent, eventID)) {
      window.clearInterval(id)
      onDone(true)
      return
    }
    if (attempts >= maxAttempts) {
      window.clearInterval(id)
      onDone(false)
    }
  }, 200)

  return () => window.clearInterval(id)
}

function whenTrackersReady(
  fire: () => boolean,
  onDone?: () => void
): () => void {
  if (fire()) {
    onDone?.()
    return () => {}
  }

  let attempts = 0
  const maxAttempts = 40
  const id = window.setInterval(() => {
    attempts += 1
    if (fire() || attempts >= maxAttempts) {
      window.clearInterval(id)
      onDone?.()
    }
  }, 200)

  return () => window.clearInterval(id)
}

/** GA + Meta (auto: standard track vs trackCustom). Respects consent. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  const consent = readConsent()
  const { data, eventID } = splitMetaParams(params)

  if (hasAnalyticsConsent(consent) && GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, data || params)
  }
  if (hasMarketingConsent(consent) && FB_PIXEL_ID && typeof window.fbq === "function") {
    if (META_STANDARD.has(name)) {
      if (eventID) window.fbq("track", name, data, { eventID })
      else window.fbq("track", name, data)
    } else {
      window.fbq("trackCustom", name, data || params)
    }
  }
}

/** Explicit Meta standard event (+ mirrored GA). Retries until fbq exists. */
export function trackMetaStandard(
  name: string,
  params?: Record<string, unknown>
): () => void {
  const gaName = GA_EVENT_MAP[name] || name
  const incoming = splitMetaParams(params)
  const eventID = incoming.eventID || newMetaEventId()
  const data = incoming.data
  let gaSent = !GA_ID
  let fbSent = !FB_PIXEL_ID

  if (hasMarketingConsent(readConsent())) {
    sendBrowserCapiEvent({
      event_name: name,
      event_id: eventID,
      custom_data: data,
    })
  }

  return whenTrackersReady(() => {
    const consent = readConsent()
    if (!hasAnalyticsConsent(consent)) gaSent = true
    if (!hasMarketingConsent(consent)) fbSent = true

    if (!gaSent && hasAnalyticsConsent(consent) && typeof window.gtag === "function") {
      window.gtag("event", gaName, data || params)
      gaSent = true
    }
    if (!fbSent && hasMarketingConsent(consent) && typeof window.fbq === "function") {
      if (eventID) window.fbq("track", name, data, { eventID })
      else window.fbq("track", name, data)
      fbSent = true
    }
    return gaSent && fbSent
  })
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
  meta: string
  ga?: string
  commerce?: boolean
}

const CLICK_BINDINGS: AttrBinding[] = [
  { attr: "data-track-whatsapp-click", meta: "Contact", ga: "whatsapp_click" },
  { attr: "data-track-shop-view", meta: "ShopCollectionClick", ga: "select_item", commerce: true },
]

function commerceFromEl(el: HTMLElement): Record<string, unknown> {
  const id = el.getAttribute("data-content-id") || ""
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
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  })

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return
  const s = document.createElement("script")
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  document.head.appendChild(s)
}

function injectFb() {
  if (!FB_PIXEL_ID || typeof window === "undefined") return
  if (typeof window.fbq === "function") return

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

/**
 * Organic / cold lab: load after LCP (idle ≤2.5s or first gesture).
 * Paid Meta landings with campaign params: inject on the next frame so
 * PageView / InitiateCheckout are ready on /checkout.
 */
function scheduleAnalyticsLoad(load: () => void, eager: boolean) {
  if (eager) {
    let cancelled = false
    let timer: number | undefined
    const run = () => {
      if (cancelled) return
      load()
    }
    // Yield one paint frame, then load immediately — do not wait on idle.
    requestAnimationFrame(() => {
      if (cancelled) return
      timer = window.setTimeout(run, 50)
    })
    return () => {
      cancelled = true
      if (timer != null) window.clearTimeout(timer)
    }
  }

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

function isFacebookInAppClient(): boolean {
  if (typeof document !== "undefined" && isFacebookInAppFromDom()) return true
  return isMetaInAppBrowser()
}

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tracked = useRef<string | null>(null)
  // Query-only on first paint. UA/IAB is applied after mount so iPhone SSR
  // never mismatches the hydrated tree.
  const [eagerAds, setEagerAds] = useState(() =>
    shouldEagerLoadAnalytics(pathname, searchParams)
  )
  const [consent, setConsent] = useState<ConsentChoice | null>(null)

  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : null
    setEagerAds(
      shouldEagerLoadAnalytics(pathname, searchParams) ||
        isFacebookInAppClient() ||
        isMetaPaidTraffic(searchParams ?? new URLSearchParams(), ua)
    )
  }, [pathname, searchParams])

  useEffect(() => {
    setConsent(readConsent())
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<ConsentChoice>).detail
      setConsent(detail || readConsent())
      tracked.current = null
    }
    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate)
  }, [])

  useEffect(() => {
    if (!consent) return
    const wantGa = hasAnalyticsConsent(consent) && Boolean(GA_ID)
    const wantFb = hasMarketingConsent(consent) && Boolean(FB_PIXEL_ID)
    if (!wantGa && !wantFb) return

    // Load immediately once the user has opted in — deferral is only for pre-consent cold traffic.
    const eagerLoad = eagerAds || wantGa || wantFb

    return scheduleAnalyticsLoad(() => {
      if (wantGa) injectGa()
      if (wantFb) injectFb()
    }, eagerLoad)
  }, [eagerAds, consent])

  useEffect(() => {
    if (searchParams) {
      captureAndPersistFromLocation(searchParams)
    }

    if (!consent) return
    if (!hasAnalyticsConsent(consent) && !hasMarketingConsent(consent)) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (tracked.current === url) return

    return trackPageViewWhenReady(url, consent, (ok) => {
      if (ok) tracked.current = url
    })
  }, [pathname, searchParams, consent])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const raw = e.target
      if (!(raw instanceof Element)) return
      for (const binding of CLICK_BINDINGS) {
        const el = raw.closest(`[${binding.attr}]`) as HTMLElement | null
        if (!el) continue

        const label = el.getAttribute(binding.attr) || ""
        const params = binding.commerce
          ? { ...commerceFromEl(el), event_label: label }
          : { event_label: label, event_category: "engagement" }

        if (META_STANDARD.has(binding.meta)) {
          trackMetaStandard(binding.meta, params)
        } else {
          trackEvent(binding.meta, params)
        }
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return null
}
