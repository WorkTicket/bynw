"use client"

import {
  GiftIcon,
  ScissorsIcon,
  MessageCircleIcon,
} from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

const bonuses = [
  {
    icon: (c: string) => <GiftIcon className={c} size={26} />,
    title: "Patrón Sorpresa",
    desc: "Patrón adicional sorpresa con cada compra",
  },
  {
    icon: (c: string) => <ScissorsIcon className={c} size={26} />,
    title: "Guía de Materiales",
    desc: "Guía completa de materiales recomendados",
  },
  {
    icon: (c: string) => <MessageCircleIcon className={c} size={26} />,
    title: "Soporte Ilimitado",
    desc: "Soporte personalizado vía WhatsApp",
  },
]

export default function BonusStack() {
  return (
    <section className="section-alt section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <GiftIcon className="absolute top-10 right-[6%] text-rose-200/20 animate-breathe hidden sm:block" size={34} style={{ animationDelay: "0.8s" }} />
        <ScissorsIcon className="absolute bottom-12 left-[5%] text-rose-200/15 animate-sway hidden sm:block" size={28} style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge mb-3">Bonos incluidos</span>
            <h2>
              Todo incluido en tu{" "}
              <span className="gradient-text-rose italic">compra</span>
            </h2>
            <p>
              Cada colección incluye estos bonos sin coste extra. Todo lo que necesitas para empezar a tejer.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bonuses.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 80}>
              <div className="cute-card-static group h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                {b.icon("text-white")}
              </div>
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink">{b.title}</h3>
              <p className="text-sm text-muted">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
