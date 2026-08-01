"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import FooterSignature from "@/components/FooterSignature"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"

const legalLinks = [
  { href: "/privacy-policy", label: "Privacidad" },
  { href: "/terms", label: "Términos" },
  { href: "/cookies-policy", label: "Cookies" },
  { href: "/refund-policy", label: "Reembolsos" },
]

export default function Footer() {
  const pathname = usePathname()
  const isAds = pathname.startsWith("/ads")
  const year = new Date().getFullYear()

  if (isAds) {
    return (
      <footer className="relative z-[1] bg-[linear-gradient(180deg,transparent_0%,rgba(250,243,241,0.22)_28%,rgba(243,228,226,0.42)_100%)]">
        <div className="section relative py-8 pb-12 sm:py-10 sm:pb-12">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-[11px] tracking-[0.02em] text-muted/75">
              &copy; {year} Manos Creativas Bynmw
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted sm:gap-x-5">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="min-h-[2.5rem] inline-flex items-center transition-colors hover:text-rose-600"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <a
              href="https://wa.me/573008504709"
              target="_blank"
              rel="noopener noreferrer"
              data-track-whatsapp-click="ads-footer"
              className="mt-1 text-xs text-rose-600 transition-colors hover:text-rose-700"
            >
              Soporte WhatsApp
            </a>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative z-[1] bg-[linear-gradient(180deg,transparent_0%,rgba(250,243,241,0.2)_24%,rgba(243,228,226,0.4)_100%)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/35 to-transparent"
        aria-hidden="true"
      />
      <div className="section relative pt-14 pb-10 sm:pt-20 sm:pb-14">
        <ScrollReveal>
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(245,184,190,0.6),0_0_0_5px_rgba(255,249,248,0.95),0_0_0_6px_rgba(235,160,168,0.28)]">
                <img
                  src="/images/logo.webp"
                  alt="Manos Creativas Bynmw"
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="block font-display text-xl font-semibold text-ink leading-tight">
                  Manos Creativas
                </span>
                <span className="font-script text-[1.4rem] text-rose-500">Bynmw</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted max-w-sm">
              Patrones de crochet o ganchillo en PDF: amigurumis, Princesas de Cuento y Flores Eternas.
              Instrucciones claras y acabados hermosos para crear con confianza.
            </p>
            <p className="font-script text-[1.65rem] text-rose-400">Decora · Diseña · Crea</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-500">
              Navegación
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Inicio" },
                { href: "/shop", label: "Colecciones" },
                { href: "/testimonials", label: "Testimonios" },
                { href: "/about", label: "Sobre Nosotros" },
                { href: "/contact", label: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="soft-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-500">
              Colecciones
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: "/shop/amigurumis-chenille", label: "Patrones de Amigurumis" },
                { href: "/shop/princesas-disney", label: "Patrones de Princesas de Cuento" },
                { href: "/shop/flores-eternas", label: "Patrones de Flores Eternas" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="soft-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-500">
              Conéctate
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="https://www.tiktok.com/@bynmw8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soft-link"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bynmw12_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soft-link"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1L3pLJdqvm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soft-link"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:bynw808@gmail.com"
                  className="soft-link"
                >
                  bynw808@gmail.com
                </a>
              </li>
            </ul>
          </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="section relative pb-12 sm:pb-11">
        <ScrollReveal delay={60} variant="fade">
          <PetiteOrnament className="mb-8" />

          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-4">
            {["Pago seguro Hotmart", "Descarga al momento", "Garantía 7 días", "Soporte WhatsApp"].map(
              (label, i) => (
                <span key={label} className="flex items-center gap-x-3 sm:gap-x-4">
                  {i > 0 && (
                    <span className="text-[7px] text-rose-300/80" aria-hidden="true">
                      ✦
                    </span>
                  )}
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                </span>
              )
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-[11px] text-muted/75">
              &copy; {year} Manos Creativas Bynmw. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted sm:gap-x-5">
              {legalLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="min-h-[2.5rem] inline-flex items-center transition-colors hover:text-rose-600"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <FooterSignature />
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
