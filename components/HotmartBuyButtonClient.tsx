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
 * Native <a> to branded /checkout — buyer stays on bynmwcreative.com.
 * Phone / Facebook in-app: checkout is a confirm screen + top-level Hotmart.
 * Desktop: Hotmart may embed in an iframe. Do not send ads to pay.hotmart.com
 * from the lander (attribution + branded confirm first).
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
    const search = window.location.search
    captureAndPersistFromLocation(search)
    setHref(onsiteCheckoutPath(slug, search))
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
        data-buy-cta="true"
        className={`btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
        onPointerDown={trackTap}
        onClick={trackTap}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
