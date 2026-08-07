"use client"

import Link from "next/link"
import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import PrimaryCTA from "@/components/PrimaryCTA"
import { getLocalizedProduct } from "@/lib/pricing"
import { getProductBySlug } from "@/lib/products"
import {
  DEFAULT_COLD_ADS_SLUG,
  isMetaPaidTraffic,
  resolveColdAdsSlug,
} from "@/lib/paid-traffic"

function OrganicCtas() {
  return (
    <>
      <PrimaryCTA href="/#colecciones" size="lg">
        Ver colecciones
      </PrimaryCTA>
      <Link
        href={`/shop/${DEFAULT_COLD_ADS_SLUG}`}
        className="group inline-flex min-h-12 items-center gap-2 text-[0.9rem] font-medium tracking-[0.03em] text-ink/70 transition-colors hover:text-rose-600 lg:text-ink/60"
      >
        Comprar princesas
        <svg
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </>
  )
}

function PaidAwareCtas() {
  const searchParams = useSearchParams()
  const paid = useMemo(
    () => isMetaPaidTraffic(searchParams),
    [searchParams]
  )

  const featured = useMemo(() => {
    if (!paid) return null
    const slug = resolveColdAdsSlug({ searchParams })
    const product = getProductBySlug(slug)
    return product ? getLocalizedProduct(product) : null
  }, [paid, searchParams])

  if (!paid || !featured) {
    return <OrganicCtas />
  }

  return (
    <>
      <HotmartBuyButton
        href={featured.buyUrl}
        contentId={featured.id}
        contentName={featured.seoTitle}
        price={featured.price}
        size="lg"
      >
        Comprar ahora
      </HotmartBuyButton>
      <Link
        href="/#colecciones"
        className="group inline-flex min-h-12 items-center gap-2 text-[0.9rem] font-medium tracking-[0.03em] text-ink/70 transition-colors hover:text-rose-600 lg:text-ink/60"
      >
        Ver colecciones
        <svg
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </>
  )
}

/** Hero CTAs: paid Meta home → Hotmart buy; organic → browse. */
export default function HeroCtas() {
  return (
    <div className="mt-6 flex flex-row flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6">
      <Suspense fallback={<OrganicCtas />}>
        <PaidAwareCtas />
      </Suspense>
    </div>
  )
}
