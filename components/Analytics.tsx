"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

function trackPageView(url: string) {
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("config", GA_ID, { page_path: url })
  }
  if (FB_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", "PageView")
  }
}

function trackEvent(name: string, params?: Record<string, unknown>) {
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, params)
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

const EVENTS_FOR_ATTRIBUTES = [
  { attr: "data-track-hotmart-click", event: "hotmart_checkout_click" },
  { attr: "data-track-lead-magnet", event: "lead_magnet_submit" },
  { attr: "data-track-whatsapp-click", event: "whatsapp_click" },
  { attr: "data-track-shop-view", event: "shop_collection_view" },
] as const

export { trackEvent }

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tracked = useRef<string | null>(null)

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    if (tracked.current !== url) {
      tracked.current = url
      trackPageView(url)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      for (const { attr, event } of EVENTS_FOR_ATTRIBUTES) {
        const el = target.closest(`[${attr}]`) as HTMLElement | null
        if (el) {
          const label = el.getAttribute(attr) || ""
          trackEvent(event, { event_label: label, event_category: "engagement" })
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
