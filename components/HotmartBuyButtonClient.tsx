"use client"

import { useLayoutEffect, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { iabPayHref, onsiteCheckoutPath } from "@/lib/hotmart"
import { fireInitiateCheckout } from "@/components/MetaInitiateCheckout"
import { getProductBySlug } from "@/lib/products"
import { isInAppBrowser } from "@/lib/in-app-browser"

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
 * Native <a> checkout CTA.
 * Safari/Chrome → branded /checkout (Hotmart iframe).
 * Facebook/Instagram in-app → Hotmart on the first tap (no extra "Pagar" screen).
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
    if (isInAppBrowser() && product?.buyUrl) {
      setHref(iabPayHref(product.buyUrl, search))
      return
    }
    setHref(onsiteCheckoutPath(slug, search))
  }, [slug, product?.buyUrl])

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

  const goToPay = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackTap()
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (event.button !== 0) return
    const dest = href
    if (!dest || dest.charAt(0) === "#") return
    // Facebook in-app often drops the first native click / capture location.assign.
    // Navigate in this user-gesture turn so Comprar never needs a second tap.
    event.preventDefault()
    event.stopPropagation()
    try {
      window.location.href = dest
    } catch {
      window.location.assign(dest)
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
        onClick={goToPay}
      >
        <span className="btn-label">{children}</span>
      </a>
    </span>
  )
}
