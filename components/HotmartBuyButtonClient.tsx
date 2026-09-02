"use client"

import { useLayoutEffect, useState } from "react"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { buildHotmartPayUrl, onsiteCheckoutPath } from "@/lib/hotmart"
import { isFacebookInAppFromDom, isInAppBrowser } from "@/lib/in-app-browser"
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
  /** First-paint href; hydrated to /checkout or Hotmart (Facebook/Instagram). */
  initialHref: string
}

const sizeClass: Record<Size, string> = {
  default: "",
  compact: "btn-collection-buy--compact",
  lg: "btn-collection-buy--lg",
}

/**
 * Native <a> to branded /checkout — desktop Google/Safari embed Hotmart there.
 * Facebook / Instagram: after hydrate, Comprar goes straight to Hotmart in the
 * same WebView (the lander tap is the user gesture). Pre-hydrate taps still
 * hit /checkout, which redirects immediately.
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
    if (
      product?.buyUrl &&
      (isInAppBrowser() || isFacebookInAppFromDom())
    ) {
      setHref(buildHotmartPayUrl(product.buyUrl, search))
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
