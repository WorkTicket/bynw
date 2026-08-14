"use client"

import { useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import {
  buildHotmartPayUrl,
  isFacebookInAppFromDom,
  isInAppBrowser,
  onsiteCheckoutPath,
} from "@/lib/hotmart"
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
  /** Server-detected Facebook/Instagram in-app browser — correct href in first HTML. */
  initialHref: string
  /** Skip /checkout hop and open Hotmart in the top window. */
  directPay: boolean
}

const sizeClass: Record<Size, string> = {
  default: "",
  compact: "btn-collection-buy--compact",
  lg: "btn-collection-buy--lg",
}

function shouldDirectPay(pathname: string | null, directPayProp: boolean): boolean {
  if (directPayProp) return true
  if (pathname?.startsWith("/ads")) return true
  if (isFacebookInAppFromDom()) return true
  if (typeof navigator !== "undefined" && isInAppBrowser()) return true
  if (typeof document !== "undefined" && document.cookie.includes("fb_iab=1")) {
    return true
  }
  return false
}

function resolveHref(
  slug: string,
  search: string,
  direct: boolean
): string {
  const product = getProductBySlug(slug)
  if (!product) return onsiteCheckoutPath(slug, search)
  if (direct) return buildHotmartPayUrl(product.buyUrl, search)
  return onsiteCheckoutPath(slug, search)
}

/**
 * Native <a> checkout CTA. In Facebook/Instagram WebViews the href must be
 * pay.hotmart.com in the first paint — /checkout breaks before hydration.
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
  directPay: directPayProp,
}: HotmartBuyButtonClientProps) {
  const pathname = usePathname()
  const product = getProductBySlug(slug)
  const [href, setHref] = useState(initialHref)
  const [directPay, setDirectPay] = useState(directPayProp)

  useLayoutEffect(() => {
    captureAndPersistFromLocation(window.location.search)
    const search = window.location.search
    const direct = shouldDirectPay(pathname, directPayProp)
    setDirectPay(direct)
    setHref(resolveHref(slug, search, direct))
  }, [slug, pathname, directPayProp])

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
        {...(directPay ? { target: "_top" } : {})}
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
