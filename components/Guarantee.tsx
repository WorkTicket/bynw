"use client"

import { ShieldCheckIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

export default function Guarantee() {
  return (
    <section className="section-white section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <ShieldCheckIcon className="absolute top-6 right-[8%] text-rose-200/20 animate-breathe hidden sm:block" size={36} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <div className="cute-card-static relative overflow-hidden rounded-3xl2 bg-white">
              <div className="pointer-events-none absolute -top-12 -right-12 text-rose-100/25">
                <ShieldCheckIcon size={96} strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-pink-500 to-rose-300" />
              <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[auto_1fr] p-6 sm:p-8 md:p-10">
                <div className="relative mx-auto md:mx-0">
                  <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-rose-100/50 blur-md" />
                  <div className="relative h-20 w-20 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-rose-200 shadow-xl">
                    <img src="/images/imagen-17.webp" alt="Garantía de 7 días" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <span className="badge mb-3">Garantía</span>
                  <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
                    7 días de garantía.{" "}
                    <span className="gradient-text-rose">Compra sin riesgo</span>
                  </h2>
                  <p className="mt-3 text-base text-muted leading-relaxed">
                    Si los patrones no te convencen, te devolvemos el dinero en los 7 días siguientes a la compra.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    {["Compra protegida", "Reembolso 7 días", "Pago Hotmart"].map((label) => (
                      <div key={label} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-rose-700 bg-rose-50 rounded-full px-3 sm:px-4 py-2 border border-rose-200">
                        <ShieldCheckIcon className="shrink-0 text-rose-500" size={16} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
