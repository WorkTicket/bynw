import type { Metadata } from "next"
import TestimonialsLive from "@/components/TestimonialsLive"
import { createPageMetadata, buildReviewsJsonLd } from "@/lib/seo"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { listPublishedReviews } from "@/lib/reviews"
import { dailyShuffleSeed } from "@/lib/testimonials-data"

export const metadata: Metadata = createPageMetadata({
  title: "Testimonios",
  description:
    "Lee reseñas reales y deja la tuya. Artesanas de España comparten su experiencia con los patrones de crochet o ganchillo en PDF de Manos Creativas Bynmw.",
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
      <TestimonialsLive
        initialReviews={reviews}
        shuffleSeed={dailyShuffleSeed("testimonials-page")}
      />
    </>
  )
}
