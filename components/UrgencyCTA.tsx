import Link from "next/link"
import PetiteOrnament from "@/components/PetiteOrnament"
import HotmartBuyButton from "@/components/HotmartBuyButton"
import ScrollReveal from "@/components/ScrollReveal"
import { getLocalizedProduct } from "@/lib/pricing"
import { getProductBySlug } from "@/lib/products"

const FEATURED_SLUG = "princesas-disney"

export default function UrgencyCTA() {
  const featured = getLocalizedProduct(getProductBySlug(FEATURED_SLUG)!)

  return (
    <section className="section-premium-dark section-padding">
      <div className="section relative">
        <ScrollReveal variant="scale">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-[2.15rem] leading-[1.15] text-rose-400 sm:text-[2.45rem]">
              Tu colección te espera
            </p>

            <PetiteOrnament className="mt-5" tone="mid" />

            <h2 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-7 sm:text-[2.85rem] lg:text-[3.15rem]">
              Elige hoy.{" "}
              <span className="gradient-text-rose italic">Teje esta semana</span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-ink/55 sm:text-lg">
              Descarga al momento, acceso de por vida y garantía de 7 días.
              Empieza tu próximo proyecto sin riesgo.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:mt-11">
              <HotmartBuyButton
                href={featured.buyUrl}
                contentId={featured.id}
                contentName={featured.seoTitle}
                price={featured.price}
                className="w-full sm:w-auto [&_a]:min-h-[3.15rem] [&_a]:px-10 [&_a]:text-sm sm:[&_a]:px-14 sm:[&_a]:py-5"
              >
                Comprar Princesas — {featured.price}
              </HotmartBuyButton>
              <Link
                href="/shop"
                className="text-sm font-medium text-ink/50 transition-colors hover:text-rose-600"
              >
                Ver todas las colecciones
              </Link>
            </div>

            <p className="mt-7 text-[11px] tracking-[0.06em] text-ink/45">
              {featured.shortTitle} {featured.price}
              <span className="meta-sep" aria-hidden>
                ✦
              </span>
              PDF al momento
              <span className="meta-sep" aria-hidden>
                ✦
              </span>
              Garantía 7 días
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
