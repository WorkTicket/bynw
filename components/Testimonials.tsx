"use client"

import Link from "next/link"
import { QuoteIcon, StarIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

const testimonials = [
  {
    name: "María García",
    avatar: "imagen-18-2.jpeg",
    text: "Los patrones son súper claros y fáciles de seguir. Mi primer amigurumi quedó hermoso gracias a las instrucciones paso a paso.",
    rating: 5,
  },
  {
    name: "Laura Fernández",
    avatar: "imagen-18-1.jpeg",
    text: "Compré la colección de Princesas Disney y me encanta. La calidad de los patrones es increíble, se nota el amor en cada detalle.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    avatar: "imagen-18-3.jpeg",
    text: "Las flores eternas son mi perdición. Los patrones son detallados y el resultado final es precioso. Recomendadísimo.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section-pink section-padding overflow-hidden pt-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <QuoteIcon className="absolute top-8 right-[8%] text-rose-300/15 animate-breathe hidden sm:block" size={40} style={{ animationDelay: "0.5s" }} />
        <StarIcon className="absolute bottom-16 left-[6%] text-rose-300/15 animate-sway hidden sm:block" size={28} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge mb-3">Testimonios</span>
            <h2>
              Lo que dicen nuestras{" "}
              <span className="gradient-text-rose italic">artesanas</span>
            </h2>
            <p>
              Algunas clientas nos cuentan cómo les ha ido con los patrones.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="cute-card-static group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute -top-8 -right-8 text-rose-100/25 transition-all duration-500 group-hover:text-rose-200/35 group-hover:scale-110">
                <QuoteIcon size={56} />
              </div>

              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <StarIcon key={idx} className="h-4 w-4 text-rose-400" size={16} />
                ))}
              </div>

              <p className="relative z-10 mb-5 text-sm leading-relaxed text-muted">{t.text}</p>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-rose-200">
                  <img src={`/images/${t.avatar}`} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-[10px] text-rose-400">Cliente verificada ♡</p>
                </div>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/testimonials"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4"
            >
              Ver todos los testimonios
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
