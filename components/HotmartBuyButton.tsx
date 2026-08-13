"use client"

import { useEffect, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { buildHotmartPayUrl, onsiteCheckoutPath } from "@/lib/hotmart"
import { getProductBySlug } from "@/lib/products"
import { fireInitiateCheckout } from "@/components/MetaInitiateCheckout"

type Size = "default" | "compact" | "lg"

type Props = {
  slug: string
  children: React.ReactNode
  className?: string
  /** Visual size — maps to CSS modifiers on the checkout anchor */
  size?: Size
  /** Product id for Meta (commerce attrs; InitiateCheckout fires on tap) */
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

function payHref(slug: string, search?: string): string {
  const product = getProductBySlug(slug)
  if (!product) return onsiteCheckoutPath(slug, search)
  return buildHotmartPayUrl(product.buyUrl, search)
}

/**
 * One-tap Hotmart checkout. Native <a> to pay.hotmart.com so Facebook
 * in-app browsers keep the user gesture (scripted redirects are blocked).
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
  const [href, setHref] = useState(() => payHref(slug))

  useEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    setHref(payHref(slug, window.location.search))
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
        target="_top"
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className={`btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
        onClick={() => {
          // Never mutate href here — rewriting the URL during the tap can
          // cancel navigation in Instagram/Facebook in-app browsers.
          try {
            fireInitiateCheckout({
              id: contentId || product?.id || slug,
              name: contentName || product?.seoTitle,
              price: price || product?.price || "",
            })
          } catch {
            // Tracking must never block payment.
          }
        }}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
