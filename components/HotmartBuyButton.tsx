"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getPriceCurrency } from "@/lib/tracking"
import { parsePriceValue } from "@/lib/pricing"
import { captureAndPersistFromLocation } from "@/lib/ad-attribution"
import { onsiteCheckoutPath } from "@/lib/hotmart"

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

/** On-site checkout CTA — navigates to /checkout/{slug} (Hotmart lives there). */
export default function HotmartBuyButton({
  slug,
  children,
  className,
  size = "default",
  contentId,
  contentName,
  price,
}: Props) {
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
      <Link
        href={href}
        data-content-id={contentId}
        data-content-name={contentName}
        data-value={value}
        data-currency={currency}
        className={`btn-collection-buy${sizeMod ? ` ${sizeMod}` : ""}`}
      >
        <span className="btn-label">{children}</span>
      </Link>
    </span>
  )
}
