import type { Metadata } from "next"
import PrimaryCTA from "@/components/PrimaryCTA"
import ScrollReveal from "@/components/ScrollReveal"
import TestimonialsLive from "@/components/TestimonialsLive"
import { StarIcon } from "@/lib/icons"
import { createPageMetadata, buildReviewsJsonLd } from "@/lib/seo"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { listPublishedReviews } from "@/lib/reviews"
import { computeAggregate } from "@/lib/testimonials-data"

export const metadata: Metadata = createPageMetadata({
  title: "Testimonios",
  description:
    "Lee reseñas reales y deja la tuya. Artesanas de España comparten su experiencia con los patrones de crochet o ganchillo en PDF de Manos Creativas Bynmw.",
  path: "/testimonials",
  images: [DEFAULT_OG_IMAGE],
})

export default async function TestimonialsPage() {
  const reviews = await listPublishedReviews()
  const aggregate = computeAggregate(reviews)
  const reviewsJsonLd = buildReviewsJsonLd(reviews)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <section className="page-hero">
        <div className="section relative z-10 text-center">
          <ScrollReveal>
            <p className="font-script text-[2rem] text-rose-500 sm:text-[2.25rem]">
              Manos Creativas Bynmw
            </p>
            <span className="eyebrow mt-5">Testimonios</span>
            <h1 className="mt-4">
              Artesanas que{" "}
              <span className="gradient-text-rose italic">tejen con nosotras</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Reseñas y fotos reales de clientas. Lee las suyas y, si quieres,
              deja la tuya con una foto de tu tejido.
            </p>

            <div className="mx-auto mt-7 flex flex-col items-center gap-2">
              <div
                className="flex items-center gap-1"
                aria-label={`${aggregate.display} de 5 estrellas`}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon
                    key={idx}
                    className={
                      idx < Math.round(aggregate.ratingValue)
                        ? "text-rose-400"
                        : "text-rose-100"
                    }
                    size={18}
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">{aggregate.display}</span>
                {" · "}
                {aggregate.reviewCount} reseñas
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <PrimaryCTA href="#testimonios-lista">Ver reseñas</PrimaryCTA>
              <a
                href="#dejar-resena"
                className="text-sm font-medium text-ink/60 transition-colors hover:text-rose-600"
              >
                Dejar mi reseña
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TestimonialsLive initialReviews={reviews} />
    </>
  )
}
