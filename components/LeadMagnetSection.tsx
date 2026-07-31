import Image from "next/image"
import LeadMagnet from "./LeadMagnet"
import ScrollReveal from "@/components/ScrollReveal"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

export default function LeadMagnetSection() {
  return (
    <section className="section-pink section-padding relative overflow-hidden">
      <div className="section relative">
        <ScrollReveal>
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="product-media relative mx-auto aspect-[3/2] w-full max-w-md lg:mx-0 lg:max-w-none">
              <Image
                src="/images/kpop.webp"
                alt={GIFT_MAGNET.title}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-center"
              />
            </div>

            <div className="text-center lg:text-left">
              <span className="eyebrow">Guía gratuita</span>

              <h2 className="mt-3 font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:mt-4 sm:text-4xl lg:text-[2.85rem]">
                Prueba la calidad con el{" "}
                <span className="gradient-text-rose italic">
                  patrón gratis K-POP
                </span>
              </h2>

              <p className="mt-4 text-[15px] leading-[1.7] text-muted sm:mt-5 sm:text-base lg:max-w-md lg:text-lg">
                {GIFT_MAGNET.description}
              </p>

              <div className="mx-auto mt-8 w-full max-w-md sm:mt-9 lg:mx-0">
                <LeadMagnet
                  variant="compact"
                  source="inline-section"
                  submitLabel="Descargar patrón gratis"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
