import type { Metadata } from "next"
import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import ProductGrid from "@/components/ProductGrid"
import FeatureGrid from "@/components/FeatureGrid"
import WhatsAppSupport from "@/components/WhatsAppSupport"
import Guarantee from "@/components/Guarantee"
import Testimonials from "@/components/Testimonials"
import UrgencyCTA from "@/components/UrgencyCTA"
import FAQ from "@/components/FAQ"
import LeadMagnetSection from "@/components/LeadMagnetSection"
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/site"
import { createPageMetadata, buildReviewsJsonLd } from "@/lib/seo"
import { faqJsonLd } from "@/lib/faqs"
import { listFeaturedReviews, listPublishedReviews } from "@/lib/reviews"
import { toURLSearchParams, isMetaPaidTraffic } from "@/lib/paid-traffic"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: { absolute: `${BRAND_NAME} ⋆ Patrones de Crochet o Ganchillo en PDF` },
    description: DEFAULT_DESCRIPTION,
    path: "/",
    images: [DEFAULT_OG_IMAGE],
  }),
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const [featured, allReviews] = await Promise.all([
    listFeaturedReviews(3),
    listPublishedReviews(),
  ])
  const reviewsJsonLd = buildReviewsJsonLd(allReviews)
  const search = toURLSearchParams(searchParams)
  const hrefQuery = search.toString() || undefined
  const paid = isMetaPaidTraffic(search)

  return (
    <div className="page-sections">
      <link
        rel="preload"
        as="image"
        href="/images/hero-editorial.webp"
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-editorial-lg.webp"
        type="image/webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ProductGrid
        hrefBase={paid ? "/ads" : "/shop"}
        hrefQuery={hrefQuery}
      />
      <FeatureGrid />
      <WhatsAppSupport />
      <Guarantee />
      <LeadMagnetSection />
      <Testimonials reviews={featured} limit={3} showForm preserveOrder />
      <UrgencyCTA />
      <FAQ />
    </div>
  )
}
