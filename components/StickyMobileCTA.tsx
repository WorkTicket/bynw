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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="border-t border-rose-100/70 bg-[#fff9f8]/96 px-4 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-script text-[1.15rem] leading-none text-rose-500">
              {localized ? localized.shortTitle : "Manos Creativas"}
            </p>
            <p className="mt-1 truncate text-[11px] tracking-wide text-muted">
              {localized
                ? `${localized.price} · PDF al momento`
                : `Desde ${fromPrice} · PDF al momento`}
            </p>
          </div>
          {localized ? (
            <HotmartBuyButton
              href={localized.buyUrl}
              contentId={localized.id}
              contentName={localized.seoTitle}
              price={localized.price}
              className="!w-auto shrink-0 [&_a]:min-h-[2.5rem] [&_a]:px-4 [&_a]:py-2.5 [&_a]:text-[11px] [&_a]:whitespace-nowrap"
            >
              Comprar
            </HotmartBuyButton>
          ) : pathname === "/ads" ? (
            <a
              href="#colecciones"
              className="btn-nav shrink-0 min-h-[2.5rem] px-4 py-2.5 text-[11px]"
            >
              Ver colecciones
            </a>
          ) : (
            <Link
              href={`/shop/${BESTSELLER_SLUG}`}
              className="btn-nav shrink-0 min-h-[2.5rem] px-4 py-2.5 text-[11px]"
            >
              Ver Princesas
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
