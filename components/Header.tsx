"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function getSecondsUntilEndOfDay(): number {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000))
}

function formatTime(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
}

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
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem("announcement-dismissed") === "true") {
      setAnnouncementVisible(false)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.announcement = announcementVisible ? "visible" : "hidden"
    return () => {
      delete document.documentElement.dataset.announcement
    }
  }, [announcementVisible])

  useEffect(() => {
    setSeconds(getSecondsUntilEndOfDay())
    const t = setInterval(() => setSeconds(getSecondsUntilEndOfDay()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function dismissAnnouncement() {
    setAnnouncementVisible(false)
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="ios-status-bar" aria-hidden="true" />

      <div className="site-header">
        {announcementVisible && (
          <div className="site-header__announcement text-white">
            <div className="section relative flex min-h-10 items-center justify-center px-5 py-2 pr-11 text-center sm:min-h-11 sm:pr-12">
              <p className="flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[11px] font-medium leading-snug tracking-wide sm:text-xs">
                <span className="font-semibold text-rose-200">Oferta activa</span>
                <span className="font-mono font-bold tabular-nums text-amber-300">
                  {seconds !== null ? formatTime(seconds) : "--:--:--"}
                </span>
                <span className="hidden text-white/40 sm:inline" aria-hidden="true">·</span>
                <span className="hidden sm:inline">Hasta un 70% de descuento.</span>
                <span className="sm:hidden">70% dto.</span>
                <Link
                  href="/shop"
                  className="hidden font-semibold text-rose-200 underline-offset-2 transition hover:text-white hover:underline sm:inline"
                >
                  Ver colecciones
                </Link>
              </p>
              <button
                onClick={dismissAnnouncement}
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white sm:right-3"
                aria-label="Cerrar aviso"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <header
          className={`site-header__nav transition-[border-color,box-shadow,background-color] duration-300 ${
            scrolled ? "is-scrolled" : ""
          }`}
        >
          <div className="section flex h-14 items-center justify-between gap-4 sm:h-16">
            <Link href="/" className="flex min-w-0 items-center gap-2 group sm:gap-2.5">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-rose-200 transition-all duration-300 group-hover:ring-rose-400 shadow-sm sm:h-9 sm:w-9">
                <img
                  src="/images/logo.webp"
                  alt="Manos Creativas Bynmw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold gradient-text-rose leading-none tracking-tight sm:text-lg">
                  Manos Creativas
                </span>
                <p className="-mt-0.5 truncate font-script text-[11px] text-rose-500 leading-none sm:text-sm">
                  Bynmw
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-0.5 md:flex lg:gap-1" aria-label="Principal">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link ${isActive(pathname, l.href) ? "nav-link-active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center">
              <Link
                href="/shop"
                className="btn-primary hidden text-xs px-5 py-2.5 shadow-soft lg:inline-flex"
              >
                Ver Colecciones
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="relative ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100 bg-white text-ink transition-all hover:border-rose-200 hover:bg-rose-50 md:hidden"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            id="mobile-nav"
            className={`overflow-hidden border-t border-rose-100/60 bg-white transition-all duration-300 ease-out md:hidden ${
              open
                ? "max-h-[24rem] opacity-100"
                : "max-h-0 border-transparent opacity-0"
            }`}
          >
            <nav className="section flex flex-col py-2" aria-label="Móvil">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[3rem] items-center border-b border-rose-50 px-1 py-3 text-[15px] font-medium transition last:border-b-0 ${
                    isActive(pathname, l.href)
                      ? "text-rose-700 font-semibold"
                      : "text-ink/80 hover:text-rose-600"
                  }`}
                >
                  {l.label}
                  {isActive(pathname, l.href) && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </header>
      </div>
    </>
  )
}
