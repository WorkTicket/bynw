"use client"

import { useLayoutEffect, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { onsiteCheckoutPath } from "@/lib/hotmart"
import { fireInitiateCheckout } from "@/components/MetaInitiateCheckout"
import { getProductBySlug } from "@/lib/products"

type Size = "default" | "compact" | "lg"

export type HotmartBuyButtonClientProps = {
  slug: string
  children: React.ReactNode
  className?: string
  size?: Size
  contentId?: string
  contentName?: string
  price?: string
  /** First-paint href; hydrated to /checkout/{slug} with current query. */
  initialHref: string
}

const sizeClass: Record<Size, string> = {
  default: "",
  compact: "btn-collection-buy--compact",
  lg: "btn-collection-buy--lg",
}

/**
 * Native <a> checkout CTA. Always stays on bynmwcreative.com/checkout —
 * Hotmart only loads inside that branded shell (iframe or Pagar there).
 */
export default function HotmartBuyButtonClient({
  slug,
  children,
  className,
  size = "default",
  contentId,
  contentName,
  price,
  initialHref,
}: HotmartBuyButtonClientProps) {
  const product = getProductBySlug(slug)
  const [href, setHref] = useState(initialHref)

  useLayoutEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    setHref(onsiteCheckoutPath(slug, window.location.search))
  }, [slug])

  const value = price ? String(parsePriceValue(price)) : undefined
  const currency = price ? getPriceCurrency(price) : undefined
  const sizeMod = sizeClass[size]

  const trackTap = () => {
    try {
      fireInitiateCheckout({
        id: contentId || product?.id || slug,
        name: contentName || product?.seoTitle,
        price: price || product?.price || "",
      })
    } catch {
      // Tracking must never block payment.
    }
  }

  return (
    <span
      className={`relative inline-flex w-auto max-w-full justify-center ${className ?? ""}`}
    >
      <a
        href={href}
        suppressHydrationWarning
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className={`btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
        onPointerDown={trackTap}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
