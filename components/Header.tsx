"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
            <div className="section grid h-[4.25rem] grid-cols-[1fr_auto] items-center gap-3 sm:h-[4.5rem]">
              <Link href="/ads" className="group flex min-w-0 items-center gap-3 justify-self-start sm:gap-3.5">
                <div className="site-header__mark relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                  <img
                    src="/images/logo-64.webp"
                    alt="Manos Creativas Bynmw"
                    width="48"
                    height="48"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="block truncate font-display text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-rose-700 sm:text-[19px]">
                    Manos Creativas
                  </span>
                  <p className="mt-0.5 truncate font-script text-[17px] leading-[1.2] text-rose-500 transition-colors group-hover:text-rose-600 sm:mt-1 sm:text-[19px]">
                    Bynmw
                  </p>
                </div>
              </Link>
              {isAdsProduct ? (
                <a
                  href="#oferta"
                  className="btn-nav justify-self-end whitespace-nowrap text-[11px] sm:text-xs"
                >
                  Comprar ahora
                </a>
              ) : (
                <a
                  href="#colecciones"
                  className="btn-nav justify-self-end whitespace-nowrap text-[11px] sm:text-xs"
                >
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
          <div className="site-header__announcement text-white">
            <div className="site-header__announcement-sheen" aria-hidden="true" />
            <div className="section relative flex h-11 items-center justify-center gap-2 px-5 pr-11 text-center sm:h-12 sm:gap-2.5 sm:pr-12">
              <p className="flex min-w-0 items-center justify-center gap-x-2 text-[12px] font-medium leading-none tracking-[0.08em] sm:gap-x-2.5 sm:text-[13px] sm:tracking-[0.12em]">
                <span className="truncate text-white/95">Patrones en PDF</span>
                <span className="shrink-0 text-white/45" aria-hidden="true">
                  ✦
                </span>
                <span className="hidden shrink-0 text-white/90 sm:inline">Descarga al momento</span>
                <span className="hidden shrink-0 text-white/45 sm:inline" aria-hidden="true">
                  ✦
                </span>
                <span className="hidden shrink-0 text-white/90 md:inline">Acceso de por vida</span>
                <span className="hidden shrink-0 text-white/45 md:inline" aria-hidden="true">
                  ✦
                </span>
                <Link href="/#regalo-gratis" className="announcement-gift shrink-0 tracking-[0.06em]">
                  <span aria-hidden="true">♡</span>
                  Regalo gratis
                </Link>
              </p>
              <button
                type="button"
                onClick={dismissAnnouncement}
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white sm:right-2"
                aria-label="Cerrar aviso"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <header className={`site-header__nav ${scrolled ? "is-scrolled" : ""}`}>
          <div className="section grid h-[4.25rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:h-[4.5rem] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-3 justify-self-start sm:gap-3.5"
              onClick={() => setOpen(false)}
            >
              <div className="site-header__mark relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                <img
                  src="/images/logo-64.webp"
                  alt="Manos Creativas Bynmw"
                  width="48"
                  height="48"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block truncate font-display text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-rose-700 sm:text-[19px]">
                  Manos Creativas
                </span>
                <p className="mt-0.5 truncate font-script text-[17px] leading-[1.2] text-rose-500 transition-transform duration-500 group-hover:translate-x-0.5 sm:mt-1 sm:text-[19px]">
                  Bynmw
                </p>
              </div>
            </Link>

            <nav
              className="hidden items-center justify-center lg:flex"
              aria-label="Principal"
            >
              <div className="site-header__desktop-links">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`nav-link ${isActive(pathname, l.href) ? "nav-link-active" : ""}`}
                  >
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="flex items-center justify-self-end gap-2.5 sm:gap-3">
              <Link href="/shop" className="btn-nav group hidden whitespace-nowrap lg:inline-flex">
                <span>Ver Colecciones</span>
                <svg
                  className="ml-1.5 h-3 w-3 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
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
            <p className="font-script text-[1.85rem] leading-none text-rose-500 sm:text-[2.1rem]">
              Manos Creativas
            </p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-rose-400/90">
              Explora el atelier
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
                    <svg viewBox="0 0 28 28" width="14" height="14" fill="none">
                      <path
                        d="M14 24 C7 18 3 13 3 8.5 C3 5 5.5 2.5 9 2.5 C11.5 2.5 13.5 4.5 14 5.5 C14.5 4.5 16.5 2.5 19 2.5 C22.5 2.5 25 5 25 8.5 C25 13 21 18 14 24Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
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
              <svg viewBox="0 0 28 28" width="18" height="18" fill="none">
                <path
                  d="M14 24 C7 18 3 13 3 8.5 C3 5 5.5 2.5 9 2.5 C11.5 2.5 13.5 4.5 14 5.5 C14.5 4.5 16.5 2.5 19 2.5 C22.5 2.5 25 5 25 8.5 C25 13 21 18 14 24Z"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="14" cy="11" r="1.2" fill="currentColor" opacity="0.45" />
              </svg>
              <span />
            </div>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="btn-primary mt-7 w-full py-3.5 text-[13px]"
              tabIndex={open ? 0 : -1}
            >
              Ver Colecciones
            </Link>
            <p className="mt-6 text-center font-script text-[1.35rem] text-rose-400/85">
              Hecho con amor
            </p>
          </div>
        </nav>
      </div>
    </>
  )
}
