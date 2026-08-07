"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PrimaryCTA from "@/components/PrimaryCTA"

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

function BrandMark({
  href,
  onClick,
}: {
  href: string
  onClick?: () => void
}) {
  return (
    <Link
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
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isAds = pathname.startsWith("/ads")
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem("announcement-dismissed") === "true") {
      setAnnouncementVisible(false)
    }
  }, [])

  useEffect(() => {
    if (isAds) {
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
  }, [announcementVisible, isAds])

  useEffect(() => {
    if (isAds) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isAds])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.documentElement.dataset.navOpen = open ? "true" : "false"
    return () => {
      document.body.style.overflow = ""
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
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  // Paid landers: no organic nav — logo + on-page buy so attention stays on the offer.
  if (isAds) {
    const isAdsProduct = /^\/ads\/[^/]+\/?$/.test(pathname)
    return (
      <>
        <div className="ios-status-bar" aria-hidden="true" />
        <div className="site-header">
          <header className={`site-header__nav ${scrolled ? "is-scrolled" : ""}`}>
            <div className="site-header__bar">
              <BrandMark href="/ads" />
              {isAdsProduct ? (
                <a href="#oferta" className="btn-nav">
                  Comprar ahora
                </a>
              ) : (
                <a href="#colecciones" className="btn-nav">
                  Ver ofertas
                </a>
              )}
            </div>
          </header>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="ios-status-bar" aria-hidden="true" />

      <div className={`site-header ${open ? "is-menu-open" : ""}`}>
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
                <Link href="/#regalo-gratis" className="announcement-gift">
                  Regalo gratis
                </Link>
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
                    <Link
                      href={l.href}
                      className={`nav-link ${isActive(pathname, l.href) ? "nav-link-active" : ""}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__actions">
              <Link href="/shop" className="btn-nav group hidden lg:inline-flex">
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
              </Link>

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
        className={`site-header__panel lg:hidden ${open ? "is-open" : ""}`}
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
                <Link
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
                </Link>
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
    </>
  )
}
