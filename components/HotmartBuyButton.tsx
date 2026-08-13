"use client"

import { useEffect, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { onsiteCheckoutPath } from "@/lib/hotmart"
import { fireInitiateCheckout } from "@/components/MetaInitiateCheckout"
import { getProductBySlug } from "@/lib/products"

type Size = "default" | "compact" | "lg"

type Props = {
  slug: string
  children: React.ReactNode
  className?: string
  /** Visual size — maps to CSS modifiers on the checkout anchor */
  size?: Size
  /** Product id for Meta (commerce attrs; InitiateCheckout fires on /checkout) */
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

/**
 * On-site checkout CTA — stays on /checkout/{slug} with Hotmart embedded.
 * Native <a> (not next/link) so Facebook in-app browsers actually navigate.
 */
export default function HotmartBuyButton({
  slug,
  children,
  className,
  size = "default",
  contentId,
  contentName,
  price,
}: Props) {
  const product = getProductBySlug(slug)
  const [href, setHref] = useState(onsiteCheckoutPath(slug))

  useEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    setHref(onsiteCheckoutPath(slug, window.location.search))
  }, [slug])

  const value = price ? String(parsePriceValue(price)) : undefined
  const currency = price ? getPriceCurrency(price) : undefined
  const sizeMod = sizeClass[size]

  return (
    <span
      className={`relative inline-flex w-auto max-w-full justify-center ${className ?? ""}`}
    >
      <a
        href={href}
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className={`btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
        onClick={() => {
          try {
            fireInitiateCheckout({
              id: contentId || product?.id || slug,
              name: contentName || product?.seoTitle,
              price: price || product?.price || "",
            })
          } catch {
            // Tracking must never block checkout.
          }
        }}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
