import type { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import TestimonialsLive from "@/components/TestimonialsLive"
import { createPageMetadata, buildReviewsJsonLd } from "@/lib/seo"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { listPublishedReviews } from "@/lib/reviews"

export const metadata: Metadata = createPageMetadata({
  title: "Testimonios",
  description:
    "Lee reseñas reales y deja la tuya. Artesanas de España comparten su experiencia con los patrones de crochet en PDF de Manos Creativas Bynmw.",
  path: "/testimonials",
  images: [DEFAULT_OG_IMAGE],
})

export default async function TestimonialsPage() {
  const reviews = await listPublishedReviews()
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
              Historias reales de artesanas que ya tejen con nosotras. Lee las suyas y, si quieres, deja la tuya.
            </p>
            <a href="#dejar-resena" className="btn-primary mt-8 inline-flex min-h-[3rem] px-8">
              Dejar mi reseña
            </a>
          </ScrollReveal>
        </div>
      </section>

      <TestimonialsLive initialReviews={reviews} />
    </>
  )
}
