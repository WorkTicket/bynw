import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import PrimaryCTA from "@/components/PrimaryCTA"
import ProductCard from "@/components/ProductCard"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { products, getProductBySlug } from "@/lib/products"
import { getCatalogFromPrice, getLocalizedProduct } from "@/lib/pricing"
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
  hrefQuery?: string
}

const TRUST = [
  "PDF con fotos paso a paso",
  "Descarga al momento",
  "Acceso de por vida",
  "Garantía 7 días",
] as const

const sectionHeading =
  "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-normal overflow-visible pb-1"

export default function AdsCatalogLander({ reviews, hrefQuery }: Props) {
  const fromPrice = getCatalogFromPrice()
  const featured = getLocalizedProduct(getProductBySlug("princesas-disney")!)
  const bestsellers = ["princesas-disney", "flores-eternas", "amigurumis-chenille"]
  const adsHref = (slug: string) =>
    hrefQuery ? `/ads/${slug}?${hrefQuery}` : `/ads/${slug}`

  return (
    <>
      <section className="hero-editorial relative min-h-[min(88svh,48rem)] overflow-hidden sm:min-h-[min(90svh,50rem)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 origin-center">
            <Image
              src="/images/hero-editorial.webp"
              alt="Amigurumi de princesa en crochet o ganchillo junto a un ramo de flores eternas tejidas"
              fill
              priority
              fetchPriority="high"
              unoptimized
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[78%_center]"
            />
          </div>

          <div className="hero-veil-mobile pointer-events-none absolute inset-0 lg:hidden" />

          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background: `
                linear-gradient(
                  92deg,
                  #fffaf8 0%,
                  #fffaf8 32%,
                  rgba(255,250,248,0.97) 40%,
                  rgba(255,250,248,0.82) 50%,
                  rgba(255,250,248,0.4) 62%,
                  rgba(255,250,248,0.1) 74%,
                  transparent 86%
                ),
                linear-gradient(
                  180deg,
                  transparent 72%,
                  rgba(250,243,241,0.35) 88%,
                  rgba(250,243,241,0.72) 100%
                )
              `,
            }}
          />
        </div>

        <div className="section relative z-10 flex min-h-[min(88svh,48rem)] flex-col justify-end pb-[calc(var(--sticky-cta-stack)+1.15rem)] pt-10 sm:min-h-[min(90svh,50rem)] sm:justify-center sm:pb-[calc(var(--sticky-cta-stack)+2rem)] sm:pt-16 lg:pb-24">
          <div className="max-w-xl lg:max-w-[36rem]">
            <p className="font-script h-[2.35rem] text-[2.35rem] leading-none text-rose-500 sm:h-[2.75rem] sm:text-[2.75rem]">
              Manos Creativas Bynmw
            </p>
            <h1 className="mt-6 font-display text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.85rem] lg:text-[3.15rem]">
              Elige tu colección de{" "}
              <span className="gradient-text-candy italic">crochet o ganchillo</span>
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

            <div className="mt-8 flex flex-row flex-wrap items-center gap-x-5 gap-y-3">
              <PrimaryCTA href="#colecciones" size="lg">
                Ver colecciones
              </PrimaryCTA>
              <Link
                href={adsHref(featured.slug)}
                className="inline-flex min-h-12 items-center text-[0.9rem] font-medium tracking-[0.03em] text-ink/55 transition-colors hover:text-rose-600"
              >
                Más vendida: {featured.shortTitle} →
              </Link>
            </div>

            <p className="mt-7 text-[11px] tracking-[0.06em] text-muted/65 sm:text-xs">
              Desde {fromPrice}
              <span className="meta-sep" aria-hidden="true">
                ✦
              </span>
              {featured.shortTitle} {featured.price}
              <span className="meta-sep" aria-hidden="true">
                ✦
              </span>
              PDF al momento
            </p>
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

          <ScrollReveal>
            <p className="mb-10 text-center text-[13px] tracking-[0.02em] text-muted sm:mb-12">
              Destacadas:{" "}
              {bestsellers.map((slug, i) => {
                const p = products.find((x) => x.slug === slug)
                if (!p) return null
                return (
                  <span key={slug}>
                    {i > 0 && (
                      <span className="mx-1.5 text-rose-300" aria-hidden>
                        ·
                      </span>
                    )}
                    <Link
                      href={adsHref(slug)}
                      className="font-medium text-ink/75 transition-colors hover:text-rose-600"
                    >
                      {p.shortTitle}
                    </Link>
                  </span>
                )
              })}
            </p>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
            {products.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 60}>
                <ProductCard
                  product={p}
                  hrefBase="/ads"
                  hrefQuery={hrefQuery}
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
              <p className="font-script text-[2rem] leading-none text-rose-400 sm:text-[2.25rem]">
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
                <PrimaryCTA href="#colecciones" size="lg">
                  Ver colecciones
                </PrimaryCTA>
                <Link
                  href={adsHref(featured.slug)}
                  className="text-sm font-medium text-ink/50 transition-colors hover:text-rose-600"
                >
                  {featured.shortTitle} {featured.price} →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
