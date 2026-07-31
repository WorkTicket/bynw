"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import ProductCard from "@/components/ProductCard"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { products } from "@/lib/products"
import { getCatalogFromPrice } from "@/lib/pricing"
import { CheckCircleIcon, StarIcon } from "@/lib/icons"
import {
  SITE_RATING_DISPLAY,
  SITE_RATING,
  type Review,
} from "@/lib/testimonials-data"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
const FAQ = dynamic(() => import("@/components/FAQ"))

type Props = {
  reviews: Review[]
}

const TRUST = [
  "PDF con fotos paso a paso",
  "Descarga al momento",
  "Acceso de por vida",
  "Garantía 7 días",
] as const

const sectionHeading =
  "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

export default function AdsCatalogLander({ reviews }: Props) {
  const fromPrice = getCatalogFromPrice()
  const bestsellers = ["princesas-disney", "flores-eternas", "amigurumis-chenille"]

  return (
    <>
      {/* Full-bleed hero */}
      <section className="hero-editorial relative min-h-[min(88svh,48rem)] overflow-hidden bg-[#fff9f8] sm:min-h-[min(90svh,50rem)]">
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

          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background: `
                linear-gradient(to top, #fff9f8 0%, rgba(255,249,248,0.96) 18%, rgba(255,249,248,0.55) 42%, transparent 68%),
                linear-gradient(to bottom, rgba(255,249,248,0.88) 0%, transparent 28%)
              `,
            }}
          />

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

        <div className="section relative z-10 flex min-h-[min(88svh,48rem)] flex-col justify-end pb-12 pt-10 sm:min-h-[min(90svh,50rem)] sm:justify-center sm:pb-20 sm:pt-16 lg:pb-24">
          <div className="max-w-xl animate-fade-in-up lg:max-w-[36rem]">
            <p className="font-script text-[2rem] leading-none text-rose-500 sm:text-[2.4rem]">
              Manos Creativas Bynmw
            </p>
            <PetiteOrnament className="mt-5" />
            <h1 className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.25rem]">
              Elige tu colección de{" "}
              <span className="gradient-text-candy italic">crochet</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted sm:text-base lg:text-lg">
              Patrones digitales en PDF con fotos paso a paso. Compra una vez,
              descarga al momento y teje cuando quieras.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="text-rose-400" size={14} />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">
                {SITE_RATING_DISPLAY}
              </span>
              <span className="text-sm text-muted">
                · {SITE_RATING.reviewCount}+ artesanas
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
              <a href="#colecciones" className="btn-primary min-h-[3.15rem] px-9 text-sm">
                Ver colecciones
              </a>
              <Link
                href="/ads/princesas-disney"
                className="text-sm font-medium text-ink/55 transition-colors hover:text-rose-600"
              >
                Más vendida: Princesas →
              </Link>
            </div>

            <p className="mt-7 text-[11px] tracking-[0.06em] text-muted/65 sm:text-xs">
              Desde {fromPrice}
              <span className="meta-sep" aria-hidden="true">
                ✦
              </span>
              Descarga al momento
              <span className="meta-sep" aria-hidden="true">
                ✦
              </span>
              Acceso de por vida
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-rose-100/70 bg-white">
        <div className="section py-5 sm:py-6">
          <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70 sm:text-xs"
              >
                <CheckCircleIcon className="text-rose-400" size={16} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All products */}
      <section id="colecciones" className="section-pink section-padding scroll-mt-28">
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Colecciones</span>
              <PetiteOrnament className="mb-5 mt-1" />
              <h2 className={sectionHeading}>
                Todas las colecciones{" "}
                <span className="gradient-text-rose italic">disponibles</span>
              </h2>
              <p>
                Elige la que más te inspire. Cada una incluye patrones en PDF,
                bonos y acceso inmediato.
              </p>
            </div>
          </ScrollReveal>

          {/* Bestseller highlight strip */}
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500">
                Destacadas
              </span>
              {bestsellers.map((slug) => {
                const p = products.find((x) => x.slug === slug)
                if (!p) return null
                return (
                  <Link
                    key={slug}
                    href={`/ads/${slug}`}
                    className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-ink/70 ring-1 ring-rose-100 transition-colors hover:text-rose-600 hover:ring-rose-200"
                  >
                    {p.shortTitle}
                  </Link>
                )
              })}
            </div>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
            {products.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 60}>
                <ProductCard
                  product={p}
                  hrefBase="/ads"
                  ctaLabel="Ver oferta"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials
        reviews={reviews}
        limit={3}
        showForm={false}
        showMoreLink={false}
      />
      <Guarantee />
      <FAQ />

      <section className="section-premium-dark section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-lg text-center">
              <p className="font-script text-[1.85rem] leading-none text-rose-400 sm:text-[2.1rem]">
                Manos Creativas Bynmw
              </p>
              <h2 className={`mt-5 ${sectionHeading}`}>
                ¿Lista para{" "}
                <span className="gradient-text-rose italic">elegir</span>?
              </h2>
              <p className="mt-3 text-sm text-muted">
                Desde {fromPrice} · PDF al momento · Garantía 7 días
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                <a href="#colecciones" className="btn-primary min-h-[3.15rem] px-10 text-sm">
                  Ver colecciones
                </a>
                <Link
                  href="/ads/princesas-disney"
                  className="text-sm font-medium text-ink/50 transition-colors hover:text-rose-600"
                >
                  Ir a la más vendida →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
