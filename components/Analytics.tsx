"use client"

import Script from "next/script"
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
  const maxAttempts = 40 // ~8s at 200ms
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

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tracked = useRef<string | null>(null)

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

  if (!GA_ID && !FB_PIXEL_ID) return null

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `}
        </Script>
      )}
    </>
  )
}
