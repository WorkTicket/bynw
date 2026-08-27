import type { Metadata } from "next"
import { headers } from "next/headers"
import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import ProductGrid from "@/components/ProductGrid"
import AdsCatalogLander from "@/components/AdsCatalogLander"
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
import {
  listAdsFeaturedReviews,
  listFeaturedReviews,
  listPublishedReviews,
} from "@/lib/reviews"
import { isMetaPaidTraffic, toURLSearchParams } from "@/lib/paid-traffic"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: { absolute: `${BRAND_NAME} ⋆ Patrones de Crochet o Ganchillo en PDF` },
    description: DEFAULT_DESCRIPTION,
    path: "/",
    images: [DEFAULT_OG_IMAGE],
  }),
}

type Props = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function HomePage({ searchParams }: Props) {
  const query = toURLSearchParams(searchParams)
  const ua = headers().get("user-agent")
  const paid = isMetaPaidTraffic(query, ua)
  const hrefQuery = paid ? query.toString() : undefined

  // Meta cold ads to `/` (many-options creative): conversion catalog, not organic home.
  if (paid) {
    const reviews = await listAdsFeaturedReviews(3)
    return (
      <div data-ads-lander="true">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.lander="ads";document.documentElement.dataset.announcement="hidden"`,
          }}
        />
        <link
          rel="preload"
          as="image"
          href="/images/imagen-2.webp"
          fetchPriority="high"
        />
        <AdsCatalogLander reviews={reviews} hrefQuery={hrefQuery} />
      </div>
    )
  }

  const [featured, allReviews] = await Promise.all([
    listFeaturedReviews(3),
    listPublishedReviews(),
  ])
  const reviewsJsonLd = buildReviewsJsonLd(allReviews)

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
      <ProductGrid />
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
