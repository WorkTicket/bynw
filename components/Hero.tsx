"use client"

import Image from "next/image"
import Link from "next/link"
import { getCatalogFromPrice } from "@/lib/pricing"

export default function Hero() {
  const heroPrice = getCatalogFromPrice()

  return (
    <section className="hero-editorial relative min-h-[min(92svh,52rem)] overflow-hidden bg-[#fff9f8] sm:min-h-[min(94svh,54rem)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-image-drift origin-center scale-[1.04]">
          <Image
            src="/images/hero-editorial.webp"
            alt="Amigurumi de princesa en crochet junto a un ramo de flores eternas tejidas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[78%_center]"
          />
        </div>

        {/* Mobile: soft pearl veil */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background: `
              linear-gradient(to top, #fff9f8 0%, rgba(255,249,248,0.96) 18%, rgba(255,249,248,0.55) 42%, transparent 68%),
              linear-gradient(to bottom, rgba(255,249,248,0.88) 0%, transparent 28%)
            `,
          }}
        />

        {/* Desktop: solid pearl behind copy → fade into image */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background: `
              linear-gradient(
                92deg,
                #fff9f8 0%,
                #fff9f8 32%,
                rgba(255,249,248,0.97) 40%,
                rgba(255,249,248,0.82) 50%,
                rgba(255,249,248,0.4) 62%,
                rgba(255,249,248,0.1) 74%,
                transparent 86%
              )
            `,
          }}
        />
      </div>

      {/* Soft floating petals — atmosphere only */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block" aria-hidden="true">
        <span className="absolute left-[42%] top-[22%] h-2 w-2 rounded-full bg-rose-300/40 animate-petal-float" />
        <span
          className="absolute left-[48%] top-[58%] h-1.5 w-1.5 rounded-full bg-rose-400/30 animate-petal-float"
          style={{ animationDelay: "1.4s" }}
        />
        <span
          className="absolute left-[38%] top-[72%] h-2.5 w-2.5 rounded-full bg-rose-200/60 animate-petal-float"
          style={{ animationDelay: "2.6s" }}
        />
      </div>

      <div className="section relative z-10 flex min-h-[min(92svh,52rem)] flex-col justify-end pb-14 pt-10 sm:min-h-[min(94svh,54rem)] sm:justify-center sm:pb-24 sm:pt-20 lg:pb-28">
        <div className="max-w-xl animate-fade-in-up lg:max-w-[36rem]">
          <p className="font-script text-[2.15rem] leading-[1.05] text-rose-500 sm:text-[2.75rem] lg:text-[3.1rem]">
            Manos Creativas Bynmw
          </p>

          <h1 className="mt-5 font-display text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:mt-7 sm:text-5xl lg:text-[3.55rem] xl:text-[3.85rem]">
            Patrones Digitales de{" "}
            <span className="gradient-text-candy italic">Crochet</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted sm:mt-6 sm:text-base lg:text-lg">
            Colecciones en PDF con fotos paso a paso. Descarga al momento,
            acceso de por vida — listas para tejer o vender.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/shop/princesas-disney"
              className="btn-primary min-h-[3.25rem] px-9 py-3.5 text-sm sm:px-11"
            >
              Comprar Princesas
            </Link>
            <Link
              href="/shop"
              className="group inline-flex min-h-[2.75rem] items-center justify-center gap-2 px-1 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-rose-600 sm:justify-start"
            >
              Ver todas
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <p className="mt-7 text-[11px] tracking-[0.06em] text-muted/65 sm:mt-8 sm:text-xs">
            Desde {heroPrice}
            <span className="meta-sep" aria-hidden="true">✦</span>
            Descarga al momento
            <span className="meta-sep" aria-hidden="true">✦</span>
            Acceso de por vida
          </p>
        </div>
      </div>
    </section>
  )
}
