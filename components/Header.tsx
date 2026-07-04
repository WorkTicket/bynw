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

  function dismissAnnouncement() {
    setAnnouncementVisible(false)
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  const headerTop = announcementVisible ? "top-12 sm:top-11" : "top-0"

  return (
    <>
      {announcementVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-wine-900 via-wine-800 to-wine-900 text-white">
          <div className="section relative flex min-h-10 items-center justify-center py-1 pr-8 text-center sm:h-11 sm:py-0">
            <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-[11px] font-medium leading-snug tracking-wide sm:text-xs">
              <span className="font-semibold text-rose-200">Oferta activa</span>
              <span className="font-mono font-bold tabular-nums text-amber-300">{seconds !== null ? formatTime(seconds) : "--:--:--"}</span>
              <span className="text-white/40" aria-hidden="true">·</span>
              <span>Hasta un 70% de descuento. </span>
              <Link href="/shop" className="font-semibold text-rose-200 underline-offset-2 transition hover:text-white hover:underline">
                Ver colecciones
              </Link>
            </p>
            <button
              onClick={dismissAnnouncement}
              className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
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
        className={`fixed ${headerTop} left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-rose-200/40 bg-white/92 shadow-soft backdrop-blur-xl"
            : "border-b border-rose-100/30 bg-white/75 backdrop-blur-md"
        }`}
      >
        <div className="section flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-rose-200 transition-all duration-300 group-hover:ring-rose-400 shadow-md group-hover:shadow-rose-glow">
              <img
                src="/images/logo.png"
                alt="Manos Creativas Bynmw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-semibold gradient-text-rose leading-none tracking-tight">
                Manos Creativas
              </span>
              <p className="-mt-0.5 font-script text-sm text-rose-500 leading-none">
                Bynmw
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
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

          <div className="flex items-center gap-3">
            <Link href="/shop" className="btn-primary hidden md:inline-flex text-xs px-5 py-2.5 shadow-soft">
              Ver Colecciones
            </Link>

            <a
              href="https://wa.me/573008504709"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-500/25 transition-all hover:scale-110 hover:shadow-xl hover:shadow-rose-500/40 md:hidden"
              aria-label="WhatsApp"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-all hover:bg-rose-100 md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-rose-100/20 bg-rose-50/95 backdrop-blur-xl md:hidden">
            <nav className="section flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-sm font-medium transition min-h-[3rem] flex items-center ${
                    isActive(pathname, l.href)
                      ? "bg-rose-100 text-rose-700 font-semibold"
                      : "text-muted hover:bg-rose-100 hover:text-rose-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 text-center py-4"
              >
                Ver Colecciones
              </Link>
            </nav>
            <div className="border-t border-rose-100/10 px-5 py-4 flex items-center justify-center gap-3 text-xs text-rose-400">
              <span>+500 clientas</span>
              <span className="text-rose-200">·</span>
              <span>Descarga al momento</span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
