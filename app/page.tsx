import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/site"
import { createPageMetadata, buildReviewsJsonLd } from "@/lib/seo"
import { faqJsonLd } from "@/lib/faqs"
import { listFeaturedReviews, listPublishedReviews } from "@/lib/reviews"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: { absolute: `${BRAND_NAME} ⋆ Patrones de Crochet o Ganchillo en PDF` },
    description: DEFAULT_DESCRIPTION,
    path: "/",
    images: [DEFAULT_OG_IMAGE],
  }),
}

const ProductGrid = dynamic(() => import("@/components/ProductGrid"))
const FeatureGrid = dynamic(() => import("@/components/FeatureGrid"))
const WhatsAppSupport = dynamic(() => import("@/components/WhatsAppSupport"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
const UrgencyCTA = dynamic(() => import("@/components/UrgencyCTA"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnetSection"))

export default async function HomePage() {
  const [featured, allReviews] = await Promise.all([
    listFeaturedReviews(3),
    listPublishedReviews(),
  ])
  const reviewsJsonLd = buildReviewsJsonLd(allReviews)

  return (
    <div className="page-sections">
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
      {/* Products early — paid traffic should see offers within one scroll */}
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
