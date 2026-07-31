"use client"

import { GiftIcon, ScissorsIcon, MessageCircleIcon } from "@/lib/icons"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"

const bonuses = [
  {
    icon: (c: string) => <GiftIcon className={c} size={20} />,
    title: "Bonos exclusivos",
    desc: "Patrones extra y colecciones de regalo incluidas en cada compra",
  },
  {
    icon: (c: string) => <ScissorsIcon className={c} size={20} />,
    title: "Guías prácticas",
    desc: "Abreviaturas, materiales y tips para tejer con más confianza",
  },
  {
    icon: (c: string) => <MessageCircleIcon className={c} size={20} />,
    title: "Soporte WhatsApp",
    desc: "Natalia te acompaña personalmente cuando lo necesites",
  },
]

export default function BonusStack() {
  return (
    <section className="section-alt section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">Bonos incluidos</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Todo incluido en tu{" "}
              <span className="gradient-text-rose italic">compra</span>
            </h2>
            <p>
              Cada colección incluye estos bonos sin coste extra. Todo lo que
              necesitas para empezar a tejer.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-8">
          {bonuses.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 80}>
              <div className="text-center">
                <div className="icon-bloom mx-auto mb-5 bg-white">
                  {b.icon("text-rose-500")}
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="text-sm leading-[1.7] text-muted">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
