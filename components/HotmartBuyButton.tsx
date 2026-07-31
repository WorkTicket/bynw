'use client'

import { useEffect, useRef, useState } from 'react'
import { getPriceCurrency } from '@/lib/tracking'
import { parsePriceValue } from '@/lib/pricing'
import {
  appendAttributionToHotmartUrl,
  captureAndPersistFromLocation,
} from '@/lib/ad-attribution'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  /** Product id for Meta InitiateCheckout */
  contentId?: string
  contentName?: string
  /** Display price string e.g. "15€" */
  price?: string
}

declare global {
  interface Window {
    jQuery?: (element: HTMLElement) => {
      fancybox: (options: Record<string, unknown>) => void
    }
  }
}

function loadHotmartCSS() {
  if (document.querySelector('link[href*="hotmart-fb"]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css'
  document.head.appendChild(link)
}

function loadHotmartJS(): Promise<void> {
  if (window.jQuery) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="hotmart.com/checkout/widget"]'
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Hotmart widget failed')), {
        once: true,
      })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://static.hotmart.com/checkout/widget.min.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Hotmart widget failed'))
    document.body.appendChild(script)
  })
}

function isMobileCheckout() {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth <= 600 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
  )
}

function bindHotmartCheckout(anchor: HTMLAnchorElement) {
  const $ = window.jQuery
  if (!$) return false

  try {
    $(anchor).fancybox({
      type: 'iframe',
      toolbar: false,
      smallBtn: true,
      iframe: {
        css: { width: '600px' },
        attr: { allowpaymentrequest: 'true' },
      },
    })
    return true
  } catch {
    return false
  }
}

export default function HotmartBuyButton({
  href,
  children,
  className,
  contentId,
  contentName,
  price,
}: Props) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [widgetReady, setWidgetReady] = useState(false)
  const [checkoutHref, setCheckoutHref] = useState(href)

  useEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    setCheckoutHref(appendAttributionToHotmartUrl(href))
  }, [href])

  useEffect(() => {
    let cancelled = false
    let interval: number | undefined
    let timeout: number | undefined

    loadHotmartCSS()
    loadHotmartJS()
      .then(() => {
        if (cancelled) return
        const anchor = anchorRef.current
        if (!anchor) return

        const tryBind = () => {
          if (bindHotmartCheckout(anchor)) {
            if (!cancelled) setWidgetReady(true)
            return true
          }
          return false
        }

        if (tryBind()) return

        interval = window.setInterval(() => {
          if (tryBind() && interval) window.clearInterval(interval)
        }, 200)

        timeout = window.setTimeout(() => {
          if (interval) window.clearInterval(interval)
        }, 15000)
      })
      .catch(() => {
        // Fall through to plain checkout link navigation.
      })

    return () => {
      cancelled = true
      if (interval) window.clearInterval(interval)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [checkoutHref])

  const value = price ? String(parsePriceValue(price)) : undefined
  const currency = price ? getPriceCurrency(price) : undefined

  return (
    <span className={`relative inline-flex w-full ${className ?? ''}`}>
      <a
        ref={anchorRef}
        href={checkoutHref}
        data-track-hotmart-click={contentId || href}
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className="hotmart-fb hotmart__button-checkout btn-collection-buy relative z-10 w-full text-xs py-3 sm:text-sm sm:py-3.5 tracking-wide"
        onClick={(e) => {
          // Refresh attribution at click so late-arriving UTMs still attach.
          const enriched = appendAttributionToHotmartUrl(href)
          if (anchorRef.current && enriched !== anchorRef.current.href) {
            anchorRef.current.href = enriched
            setCheckoutHref(enriched)
          }
          // Only intercept when the Fancybox widget is bound; otherwise navigate.
          if (!isMobileCheckout() && widgetReady) e.preventDefault()
        }}
      >
        {children}
      </a>
    </span>
  )
}
