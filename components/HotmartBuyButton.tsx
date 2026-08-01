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

type Size = "default" | "compact" | "lg"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  /** Visual size — maps to CSS modifiers on the checkout anchor */
  size?: Size
  /** Product id for Meta InitiateCheckout */
  contentId?: string
  contentName?: string
  /** Display price string e.g. "15€" */
  price?: string
}

const sizeClass: Record<Size, string> = {
  default: "",
  compact: "btn-collection-buy--compact",
  lg: "btn-collection-buy--lg",
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

/** Hotmart checkout CTA — same silk primary language as PrimaryCTA. */
export default function HotmartBuyButton({
  href,
  children,
  className,
  size = "default",
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
  const sizeMod = sizeClass[size]

  return (
    <span
      ref={rootRef}
      className={`relative inline-flex w-auto max-w-full justify-center ${className ?? ""}`}
    >
      <a
        ref={anchorRef}
        href={checkoutHref}
        data-track-hotmart-click={contentId || href}
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className={`hotmart-fb hotmart__button-checkout btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
        onClick={(e) => {
          const enriched = appendAttributionToHotmartUrl(href)
          if (anchorRef.current && enriched !== anchorRef.current.href) {
            anchorRef.current.href = enriched
            setCheckoutHref(enriched)
          }
          if (!isMobileCheckout() && widgetReady) e.preventDefault()
        }}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
