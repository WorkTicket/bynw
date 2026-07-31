"use client"

import { useEffect, useRef, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import {
  appendAttributionToHotmartUrl,
  captureAndPersistFromLocation,
} from "@/lib/ad-attribution"
import {
  bindHotmartCheckout,
  isMobileCheckout,
  loadHotmartAssets,
} from "@/lib/hotmart"

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

function whenNearOrInteract(
  el: HTMLElement,
  start: () => void
): () => void {
  let started = false
  const run = () => {
    if (started) return
    started = true
    start()
  }

  const onInteract = () => run()
  el.addEventListener("pointerdown", onInteract, { once: true, passive: true })
  el.addEventListener("focusin", onInteract, { once: true })

  let observer: IntersectionObserver | undefined
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) run()
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    )
    observer.observe(el)
  } else {
    // Fallback: idle then load so checkout still works without IO.
    const ric = window.requestIdleCallback?.bind(window)
    if (ric) {
      ric(() => run(), { timeout: 4000 })
    } else {
      window.setTimeout(run, 2500)
    }
  }

  return () => {
    el.removeEventListener("pointerdown", onInteract)
    el.removeEventListener("focusin", onInteract)
    observer?.disconnect()
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
  const rootRef = useRef<HTMLSpanElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [widgetReady, setWidgetReady] = useState(false)
  const [checkoutHref, setCheckoutHref] = useState(href)

  useEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    setCheckoutHref(appendAttributionToHotmartUrl(href))
  }, [href])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let cancelled = false
    let interval: number | undefined
    let timeout: number | undefined
    let stopWatch: (() => void) | undefined

    const bindWhenReady = () => {
      loadHotmartAssets()
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
    }

    stopWatch = whenNearOrInteract(root, bindWhenReady)

    return () => {
      cancelled = true
      stopWatch?.()
      if (interval) window.clearInterval(interval)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [checkoutHref])

  const value = price ? String(parsePriceValue(price)) : undefined
  const currency = price ? getPriceCurrency(price) : undefined

  return (
    <span ref={rootRef} className={`relative inline-flex w-full ${className ?? ""}`}>
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
