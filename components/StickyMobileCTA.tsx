"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCatalogFromPrice, getLocalizedProduct } from "@/lib/pricing"
import { getProductBySlug } from "@/lib/products"
import HotmartBuyButton from "./HotmartBuyButton"

const STICKY_ATTR = "data-sticky-cta"
const BESTSELLER_SLUG = "princesas-disney"

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const lastScroll = useRef(0)
  const pathname = usePathname()
  const enabled =
    pathname === "/" ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/ads")

  const slugMatch = pathname.match(/^\/(?:shop|ads)\/([^/]+)\/?$/)
  const product = slugMatch ? getProductBySlug(slugMatch[1]) : undefined
  const localized = product ? getLocalizedProduct(product) : null
  const fromPrice = getCatalogFromPrice()
  const isOfferPage = Boolean(localized)

  useEffect(() => {
    if (!enabled) {
      setVisible(false)
      return
    }

    const onScroll = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? y / docH : 0
      const scrollingDown = y > lastScroll.current
      const nearFooter = docH - y < 280

      // Offer pages: show sooner so paid traffic can buy without hunting
      if (isOfferPage) {
        setVisible(y > 320 && scrollingDown && !nearFooter)
      } else {
        setVisible(pct > 0.28 && scrollingDown && y > 520 && !nearFooter)
      }
      lastScroll.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [enabled, isOfferPage])

  useEffect(() => {
    if (visible) {
      document.documentElement.setAttribute(STICKY_ATTR, "visible")
    } else {
      document.documentElement.removeAttribute(STICKY_ATTR)
    }
    return () => {
      document.documentElement.removeAttribute(STICKY_ATTR)
    }
  }, [visible])

  if (!enabled) return null

  return (
    <div
      className={`sticky-mobile-cta fixed bottom-0 left-0 right-0 z-50 lg:hidden ${
        visible ? "is-visible" : ""
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden={!visible}
    >
      <div className="sticky-mobile-cta__panel">
        <div className="mx-auto flex max-w-lg items-center gap-3.5 px-4 py-3 sm:gap-4 sm:px-5 sm:py-3.5">
          <div className="min-w-0 flex-1">
            <p className="truncate font-script text-[1.22rem] leading-none text-rose-500 sm:text-[1.32rem]">
              {localized ? localized.shortTitle : "Manos Creativas"}
            </p>
            <p className="mt-1.5 flex min-w-0 items-baseline gap-1.5 truncate text-[11px] tracking-[0.04em] text-muted">
              {localized ? (
                <>
                  <span className="font-semibold tabular-nums text-ink/85">
                    {localized.price}
                  </span>
                  <span className="text-rose-300/90" aria-hidden>
                    ·
                  </span>
                  <span className="truncate">PDF al momento</span>
                </>
              ) : (
                <>
                  <span className="shrink-0">
                    Desde{" "}
                    <span className="font-semibold tabular-nums text-ink/85">
                      {fromPrice}
                    </span>
                  </span>
                  <span className="text-rose-300/90" aria-hidden>
                    ·
                  </span>
                  <span className="truncate">PDF al momento</span>
                </>
              )}
            </p>
          </div>
          {localized ? (
            <HotmartBuyButton
              href={localized.buyUrl}
              contentId={localized.id}
              contentName={localized.seoTitle}
              price={localized.price}
              className="!w-auto shrink-0 [&_a]:min-h-[2.625rem] [&_a]:rounded-full [&_a]:px-5 [&_a]:py-2.5 [&_a]:text-[11px] [&_a]:tracking-[0.06em] [&_a]:whitespace-nowrap"
            >
              Comprar
            </HotmartBuyButton>
          ) : pathname === "/ads" ? (
            <a
              href="#colecciones"
              className="btn-nav shrink-0 min-h-[2.625rem] px-5 py-2.5 text-[11px] tracking-[0.06em]"
            >
              Ver colecciones
            </a>
          ) : (
            <Link
              href={`/shop/${BESTSELLER_SLUG}`}
              className="btn-nav shrink-0 min-h-[2.625rem] px-5 py-2.5 text-[11px] tracking-[0.06em]"
            >
              Ver Princesas
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
