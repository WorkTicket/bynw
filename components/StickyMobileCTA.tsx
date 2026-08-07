"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocalizedProduct } from "@/lib/pricing"
import { getProductBySlug } from "@/lib/products"
import HotmartBuyButton from "./HotmartBuyButton"
import PrimaryCTA from "./PrimaryCTA"

const STICKY_ATTR = "data-sticky-cta"

export default function StickyMobileCTA() {
  const pathname = usePathname()
  const enabled =
    pathname === "/" ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/ads")

  const slugMatch = pathname.match(/^\/(?:shop|ads)\/([^/]+)\/?$/)
  const product = slugMatch ? getProductBySlug(slugMatch[1]) : undefined
  const localized = product ? getLocalizedProduct(product) : null
  const isAdsCatalog = pathname === "/ads"
  const isHomeOrShopCatalog = pathname === "/" || pathname === "/shop"

  useLayoutEffect(() => {
    if (enabled) {
      document.documentElement.setAttribute(STICKY_ATTR, "visible")
    } else {
      document.documentElement.removeAttribute(STICKY_ATTR)
    }
    return () => {
      document.documentElement.removeAttribute(STICKY_ATTR)
    }
  }, [enabled])

  if (!enabled) return null

  const title = localized
    ? localized.shortTitle
    : isAdsCatalog || isHomeOrShopCatalog
      ? "Manos Creativas"
      : "Colecciones"

  const priceLabel = localized
    ? localized.price
    : isAdsCatalog || isHomeOrShopCatalog
      ? "PDF al momento"
      : "Ver ofertas"

  return (
    <>
      {/* In-flow spacer so bottom padding exists in SSR HTML (no CLS on hydrate) */}
      <div className="sticky-mobile-cta-spacer lg:hidden" aria-hidden="true" />
      <div
        className="sticky-mobile-cta fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="sticky-mobile-cta__panel">
          <div className="mx-auto flex max-w-lg items-center gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight tracking-tight text-ink sm:text-[0.95rem]">
                {title}
              </p>
              <p className="mt-1.5 flex min-w-0 items-baseline gap-1.5 truncate text-[11px] tracking-[0.04em] text-muted">
                {localized ? (
                  <>
                    <span className="font-semibold tabular-nums text-ink/85">
                      {priceLabel}
                    </span>
                    <span className="text-rose-300/90" aria-hidden>
                      ·
                    </span>
                    <span className="truncate">PDF al momento</span>
                  </>
                ) : (
                  <span className="truncate">{priceLabel}</span>
                )}
              </p>
            </div>

            {localized ? (
              <HotmartBuyButton
                href={localized.buyUrl}
                contentId={localized.id}
                contentName={localized.seoTitle}
                price={localized.price}
                className="!w-auto shrink-0 sticky-mobile-cta__buy"
              >
                Comprar ahora
              </HotmartBuyButton>
            ) : (
              <PrimaryCTA
                href={
                  isAdsCatalog || pathname === "/shop"
                    ? "#colecciones"
                    : "/#colecciones"
                }
                size="sm"
                className="shrink-0"
              >
                Ver colecciones
              </PrimaryCTA>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
