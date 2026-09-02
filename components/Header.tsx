"use client"

import { useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import PrimaryCTA from "@/components/PrimaryCTA"
import HotmartBuyButtonClient from "@/components/HotmartBuyButtonClient"
import { getProductBySlug } from "@/lib/products"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/shop", label: "Colecciones" },
  { href: "/testimonials", label: "Testimonios" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function pathOf(pathname: string | null): string {
  return pathname ?? ""
}

function BrandMark({
  href,
  onClick,
}: {
  href: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      className="site-header__brand group"
      onClick={onClick}
    >
      <div className="site-header__mark">
        <img
          src="/images/logo-64.webp"
          alt="Manos Creativas Bynmw"
          width="48"
          height="48"
          decoding="async"
        />
      </div>
      <div className="site-header__wordmark">
        <span className="site-header__name">Manos Creativas</span>
        <span className="site-header__script">Bynmw</span>
      </div>
    </a>
  )
}

function SlimBar({
  brandHref,
  className = "",
  children,
}: {
  brandHref: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`site-header ${className}`.trim()}>
      <header className="site-header__nav">
        <div className="site-header__bar">
          <BrandMark href={brandHref} />
          {children}
        </div>
      </header>
    </div>
  )
}

function SlimAction({ pathname }: { pathname: string }) {
  const adsSlug = pathname.match(/^\/ads\/([^/]+)\/?$/)?.[1]
  const adsProduct = adsSlug ? getProductBySlug(adsSlug) : undefined
  const isCheckout = pathname.startsWith("/checkout")

  if (isCheckout) {
    return <span className="btn-nav pointer-events-none">Pago seguro</span>
  }

  if (adsProduct) {
    return (
      <HotmartBuyButtonClient
        slug={adsProduct.slug}
        contentId={adsProduct.id}
        contentName={adsProduct.seoTitle}
        price={adsProduct.price}
        initialHref={`/checkout/${adsProduct.slug}`}
        size="compact"
        className="!w-auto shrink-0"
      >
        Comprar ahora
      </HotmartBuyButtonClient>
    )
  }

  return (
    <a href="#colecciones" className="btn-nav">
      Ver colecciones
    </a>
  )
}

export default function Header() {
  const pathname = pathOf(usePathname())
  const isAds = pathname.startsWith("/ads")
  const isCheckout = pathname.startsWith("/checkout")
  // Pathname-only. Paid home (`/` + [data-ads-lander]) is CSS-toggled so
  // Facebook in-app never hydrates a different header tree than SSR.
  const isSlim = isAds || isCheckout
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  useEffect(() => {
    try {
      if (sessionStorage.getItem("announcement-dismissed") === "true") {
        setAnnouncementVisible(false)
      }
    } catch {
      // Private Safari can block sessionStorage.
    }
  }, [])

  useEffect(() => {
    const adsPage = Boolean(
      document.querySelector("[data-ads-lander], [data-checkout-lander]")
    )
    if (isSlim || adsPage) {
      document.documentElement.dataset.announcement = "hidden"
      return () => {
        delete document.documentElement.dataset.announcement
      }
    }
    document.documentElement.dataset.announcement = announcementVisible
      ? "visible"
      : "hidden"
    return () => {
      delete document.documentElement.dataset.announcement
    }
  }, [announcementVisible, isSlim, pathname])

  useEffect(() => {
    if (isSlim) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isSlim])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.documentElement.style.overflow = open ? "hidden" : ""
    document.documentElement.dataset.navOpen = open ? "true" : "false"
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      delete document.documentElement.dataset.navOpen
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  function dismissAnnouncement() {
    setAnnouncementVisible(false)
    try {
      sessionStorage.setItem("announcement-dismissed", "true")
    } catch {
      // Private Safari can block sessionStorage.
    }
  }

  // /ads + /checkout: pathname-only slim chrome (hydration-safe).
  if (isSlim) {
    return (
      <>
        <div className="ios-status-bar" aria-hidden="true" />
        <SlimBar brandHref={isCheckout ? pathname : "/"}>
          <SlimAction pathname={pathname} />
        </SlimBar>
      </>
    )
  }

  return (
    <>
      <div className="ios-status-bar" aria-hidden="true" />

      <div className={`site-header site-header--organic ${open ? "is-menu-open" : ""}`}>
        {announcementVisible && (
          <div className="site-header__announcement">
            <div className="site-header__announcement-sheen" aria-hidden="true" />
            <div className="site-header__announcement-inner">
              <p className="site-header__announcement-copy">
                <span>Patrones en PDF</span>
                <span className="site-header__diamond" aria-hidden="true" />
                <span className="hidden sm:inline">Descarga al momento</span>
                <span className="site-header__diamond hidden sm:block" aria-hidden="true" />
                <span className="hidden md:inline">Acceso de por vida</span>
                <span className="site-header__diamond hidden md:block" aria-hidden="true" />
                <a href="#regalo-gratis" className="announcement-gift">
                  Regalo gratis
                </a>
              </p>
              <button
                type="button"
                onClick={dismissAnnouncement}
                className="site-header__announcement-close"
                aria-label="Cerrar aviso"
              >
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <header className={`site-header__nav ${scrolled ? "is-scrolled" : ""}`}>
          <div className="site-header__bar site-header__bar--organic">
            <BrandMark href="/" onClick={() => setOpen(false)} />

            <nav className="site-header__desktop" aria-label="Principal">
              <ul className="site-header__desktop-links">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`nav-link ${isActive(pathname, l.href) ? "nav-link-active" : ""}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__actions">
              <a href="/shop" className="btn-nav group hidden lg:inline-flex">
                <span>Ver Colecciones</span>
                <svg
                  className="site-header__cta-arrow"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`site-header__burger lg:hidden ${open ? "is-open" : ""}`}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <span className="burger-line burger-line--top" />
                <span className="burger-line burger-line--mid" />
                <span className="burger-line burger-line--bot" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div
        id="mobile-nav"
        className={`site-header__panel site-header--organic-panel lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="site-header__panel-veil" aria-hidden="true">
          <span className="site-header__panel-petal site-header__panel-petal--a" />
          <span className="site-header__panel-petal site-header__panel-petal--b" />
          <span className="site-header__panel-petal site-header__panel-petal--c" />
        </div>
        <nav className="site-header__panel-nav" aria-label="Móvil">
          <div className="site-header__panel-intro">
            <p className="site-header__panel-kicker">Atelier</p>
            <p className="font-script text-[2rem] leading-none text-rose-500 sm:text-[2.25rem]">
              Manos Creativas
            </p>
            <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.32em] text-rose-400/80">
              Explora la colección
            </p>
          </div>

          <ul className="site-header__panel-list">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{ ["--i" as string]: i }}
                className="site-header__panel-item"
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`site-header__panel-link ${
                    isActive(pathname, l.href) ? "is-active" : ""
                  }`}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="site-header__panel-label">{l.label}</span>
                  <span className="site-header__panel-heart" aria-hidden="true">
                    <svg viewBox="0 0 28 28" width="12" height="12" fill="none">
                      <path
                        d="M14 24 C7 18 3 13 3 8.5 C3 5 5.5 2.5 9 2.5 C11.5 2.5 13.5 4.5 14 5.5 C14.5 4.5 16.5 2.5 19 2.5 C22.5 2.5 25 5 25 8.5 C25 13 21 18 14 24Z"
                        stroke="currentColor"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="site-header__panel-footer">
            <div className="site-header__panel-ornament" aria-hidden="true">
              <span />
              <svg viewBox="0 0 28 28" width="16" height="16" fill="none">
                <path
                  d="M14 24 C7 18 3 13 3 8.5 C3 5 5.5 2.5 9 2.5 C11.5 2.5 13.5 4.5 14 5.5 C14.5 4.5 16.5 2.5 19 2.5 C22.5 2.5 25 5 25 8.5 C25 13 21 18 14 24Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span />
            </div>
            <PrimaryCTA
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-8 w-full"
              tabIndex={open ? 0 : -1}
            >
              Ver Colecciones
            </PrimaryCTA>
            <p className="mt-7 text-center font-script text-[1.4rem] text-rose-400/80">
              Hecho con amor
            </p>
          </div>
        </nav>
      </div>

      <SlimBar brandHref="/" className="site-header--ads-home">
        <SlimAction pathname="/" />
      </SlimBar>
    </>
  )
}
