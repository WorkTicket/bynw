import dynamic from "next/dynamic"
import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"

const Testimonials = dynamic(() => import("@/components/Testimonials"))
const FeatureGrid = dynamic(() => import("@/components/FeatureGrid"))
const BonusStack = dynamic(() => import("@/components/BonusStack"))
const ProductGrid = dynamic(() => import("@/components/ProductGrid"))
const Guarantee = dynamic(() => import("@/components/Guarantee"))
const WhatsAppSupport = dynamic(() => import("@/components/WhatsAppSupport"))
const FAQ = dynamic(() => import("@/components/FAQ"))
const LeadMagnetSection = dynamic(() => import("@/components/LeadMagnetSection"))
const UrgencyCTA = dynamic(() => import("@/components/UrgencyCTA"))

export default function HomePage() {
  return (
    <div className="page-sections">
      <Hero />
      <TrustBar />
      <Testimonials />
      <FeatureGrid />
      <BonusStack />
      <ProductGrid />
      <Guarantee />
      <WhatsAppSupport />
      <FAQ />
      <LeadMagnetSection />
      <UrgencyCTA />
    </div>
  )
}
