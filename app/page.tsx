import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import Testimonials from "@/components/Testimonials"
import FeatureGrid from "@/components/FeatureGrid"
import BonusStack from "@/components/BonusStack"
import ProductGrid from "@/components/ProductGrid"
import Guarantee from "@/components/Guarantee"
import WhatsAppSupport from "@/components/WhatsAppSupport"
import FAQ from "@/components/FAQ"
import LeadMagnetSection from "@/components/LeadMagnetSection"
import UrgencyCTA from "@/components/UrgencyCTA"
import ContactForm from "@/components/ContactForm"

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
      <ContactForm />
    </div>
  )
}
