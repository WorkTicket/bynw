import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { headers } from "next/headers"
import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import ProductGrid from "@/components/ProductGrid"
import AdsCatalogLander from "@/components/AdsCatalogLander"
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

const FeatureGrid = dynamic(() => import("@/components/FeatureGrid"))
const WhatsAppSupport = dynamic(() => import("@/components/WhatsAppSupport"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
const UrgencyCTA = dynamic(() => import("@/components/UrgencyCTA"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnetSection"))

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
        <link
          rel="preload"
          as="image"
          href="/images/hero-editorial.webp"
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
      <Testimonials reviews={featured} limit={3} showForm />
      <Guarantee />
      <UrgencyCTA />
      <LeadMagnetSection />
      <FAQ />
    </div>
  )
}
