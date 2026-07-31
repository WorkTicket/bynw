"use client"

import ScrollReveal from "@/components/ScrollReveal"

export default function Guarantee() {
  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
            <div className="mx-auto md:mx-0">
              <img
                src="/images/guarantee-seal.svg"
                alt="Garantía de 7 días sin riesgo"
                width={176}
                height={176}
                loading="lazy"
                decoding="async"
                className="h-36 w-36 sm:h-44 sm:w-44"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="eyebrow">Garantía</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.85rem]">
                7 días de garantía.{" "}
                <span className="gradient-text-rose italic">Compra sin riesgo</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:mx-0 mx-auto sm:text-lg">
                Si los patrones no te convencen, te devolvemos el dinero en los 7
                días siguientes a la compra.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start sm:gap-x-8">
                {["Compra protegida", "Reembolso 7 días", "Pago Hotmart"].map(
                  (label, i) => (
                    <span key={label} className="flex items-center gap-x-6 sm:gap-x-8">
                      {i > 0 && (
                        <span className="hidden text-[8px] text-rose-300/80 sm:inline" aria-hidden="true">
                          ✦
                        </span>
                      )}
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {label}
                      </span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
