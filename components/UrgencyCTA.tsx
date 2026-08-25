import PrimaryCTA from "@/components/PrimaryCTA"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { promoUrgencyLine } from "@/lib/offer"

export default function UrgencyCTA() {
  return (
    <section className="section-premium-dark section-padding">
      <div className="section relative">
        <ScrollReveal variant="scale">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-[2.15rem] leading-[1.15] text-rose-400 sm:text-[2.45rem]">
              Tu colección te espera
            </p>

            <PetiteOrnament className="mt-5" tone="mid" />

            <h2 className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-7 sm:text-[2.85rem] lg:text-[3.15rem]">
              {promoUrgencyLine()}.{" "}
              <span className="gradient-text-rose italic">Teje esta semana</span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-ink/55 sm:text-lg">
              Acceso de por vida y garantía de 7 días. Piezas listas para
              regalar o vender.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:mt-11">
              <PrimaryCTA href="/#colecciones">
                Ver colecciones
              </PrimaryCTA>
            </div>

            <p className="mt-7 text-[11px] tracking-[0.06em] text-ink/45">
              PDF al momento
              <span className="meta-sep" aria-hidden>
                ✦
              </span>
              Acceso de por vida
              <span className="meta-sep" aria-hidden>
                ✦
              </span>
              Garantía 7 días
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
