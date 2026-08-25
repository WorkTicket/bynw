import dynamic from "next/dynamic"
import PrimaryCTA from "@/components/PrimaryCTA"
import ProductCard from "@/components/ProductCard"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import HeroCatalogCollage from "@/components/HeroCatalogCollage"
import PurchaseTrustStrip from "@/components/PurchaseTrustStrip"
import MetaViewCatalog from "@/components/MetaViewCatalog"
import SaleCountdown from "@/components/SaleCountdown"
import { products, isBestseller } from "@/lib/products"
import { getCatalogFromPrice } from "@/lib/pricing"
import { promoHeroBadge, SALE_PERCENT } from "@/lib/offer"
import { CheckCircleIcon, StarIcon } from "@/lib/icons"
import {
  SITE_RATING_DISPLAY,
  SITE_RATING,
  type Review,
} from "@/lib/testimonials-data"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnetSection"))

type Props = {
  reviews: Review[]
  hrefQuery?: string
}

const TRUST = [
  "PDF con fotos paso a paso",
  "Descarga al momento",
  "Listas para regalar o vender",
  "Garantía 7 días",
] as const

const sectionHeading =
  "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

export default function AdsCatalogLander({ reviews, hrefQuery }: Props) {
  const fromPrice = getCatalogFromPrice()
  const collectionCount = products.length
  const featured = products.filter((p) => isBestseller(p.slug))
  const rest = products.filter((p) => !isBestseller(p.slug))
  const catalogItems = products.map((p) => ({
    id: p.id,
    name: p.seoTitle,
    price: p.price,
  }))

  return (
    <>
      <MetaViewCatalog items={catalogItems} />

      <section className="relative overflow-hidden bg-[#fffaf8]">
        <div className="section relative z-10 pb-[calc(var(--sticky-cta-stack)+1.15rem)] pt-10 sm:pb-[calc(var(--sticky-cta-stack)+2rem)] sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <span className="inline-flex items-center rounded-full bg-rose-100/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700">
                {promoHeroBadge()}
              </span>

              <h1 className="mt-5 font-display text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.7rem] lg:text-[3.05rem]">
                Todas las colecciones al{" "}
                <span className="gradient-text-candy italic">{SALE_PERCENT}%</span>{" "}
                esta semana
              </h1>

              <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted mx-auto lg:mx-0 sm:text-base lg:text-lg">
                Princesas, flores eternas, amigurumis, reversibles, Navidad y
                Halloween. PDF con fotos paso a paso, para tejer, regalar o
                vender.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
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

              <div className="mt-8 flex justify-center lg:justify-start">
                <PrimaryCTA href="#colecciones" size="lg">
                  Ver colecciones
                </PrimaryCTA>
              </div>

              <SaleCountdown className="mt-4 text-[12px] font-medium tracking-[0.04em] text-rose-700/90 sm:text-[13px]" />

              <p className="mt-6 text-[11px] tracking-[0.06em] text-muted/65 sm:text-xs">
                {collectionCount} colecciones
                <span className="meta-sep" aria-hidden="true">
                  ✦
                </span>
                Desde {fromPrice}
                <span className="meta-sep" aria-hidden="true">
                  ✦
                </span>
                Acceso de por vida
              </p>
            </div>

            <HeroCatalogCollage />
          </div>
        </div>
      </section>

      <section className="section-trust">
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

      <section id="colecciones" className="section-pink section-padding scroll-mt-28">
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">−{SALE_PERCENT}% en todas</span>
              <PetiteOrnament className="mb-5 mt-1" />
              <h2 className={sectionHeading}>
                Elige la colección{" "}
                <span className="gradient-text-rose italic">que más te guste</span>
              </h2>
              <p>
                Patrones listos para tejer en un fin de semana, regalar o
                vender. Cada una incluye PDF, fotos paso a paso y acceso
                inmediato.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
            {featured.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 45}>
                <ProductCard
                  product={p}
                  hrefBase="/ads"
                  hrefQuery={hrefQuery}
                  ctaLabel="Elegir esta"
                  priority={i < 2}
                  featured
                  badge="Más vendida"
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-12 lg:mt-14 lg:grid-cols-3 lg:gap-14">
            {rest.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 40}>
                <ProductCard
                  product={p}
                  hrefBase="/ads"
                  hrefQuery={hrefQuery}
                  ctaLabel="Elegir esta"
                />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 sm:mt-14">
            <PurchaseTrustStrip />
          </div>
        </div>
      </section>

      <LeadMagnetSection source="ads-catalog" />

      <Testimonials
        reviews={reviews}
        limit={3}
        showForm={false}
        showMoreLink={false}
        layout="photos"
        preserveOrder
      />
      <FAQ />

      <section className="section-premium-dark section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-lg text-center">
              <p className="font-script text-[2rem] leading-none text-rose-400 sm:text-[2.25rem]">
                Manos Creativas Bynmw
              </p>
              <h2 className={`mt-5 ${sectionHeading}`}>
                ¿Cuál vas a{" "}
                <span className="gradient-text-rose italic">elegir</span>?
              </h2>
              <p className="mt-3 text-sm text-muted">
                {collectionCount} opciones · {promoHeroBadge()} · Desde {fromPrice}
              </p>
              <SaleCountdown className="mt-2 text-[12px] font-medium text-rose-700/90" />
              <div className="mt-8 flex flex-col items-center gap-4">
                <PrimaryCTA href="#colecciones" size="lg">
                  Ver colecciones
                </PrimaryCTA>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
