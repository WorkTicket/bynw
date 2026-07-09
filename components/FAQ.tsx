"use client"

import { useState } from "react"
import { HelpCircleIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

const faqs = [
  { q: "¿Necesito experiencia previa en crochet?", a: "No hace falta. Cada colección trae vídeos para principiantes donde repasamos abreviaturas y puntadas básicas. Con eso ya puedes seguir los patrones." },
  { q: "¿Cómo recibo los patrones después de comprar?", a: "En cuanto se confirme el pago te llega un correo electrónico con el enlace para descargar todos los PDF. El acceso no caduca." },
  { q: "¿Qué métodos de pago aceptáis?", a: "Los pagos pasan por Hotmart. Puedes pagar con tarjeta, PayPal y otros métodos según tu país." },
  { q: "¿Puedo imprimir los patrones?", a: "Sí, están en PDF listos para imprimir. También puedes consultarlos en el móvil, la tablet o el ordenador." },
  { q: "¿Hay garantía de satisfacción?", a: "Sí. Tienes 7 días para pedir la devolución si los patrones no encajan contigo." },
  { q: "¿Tenéis soporte si tengo dudas?", a: "Sí. Natalia responde por WhatsApp si te atascas con algún patrón o técnica." },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section-white section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <HelpCircleIcon className="absolute top-8 right-[8%] text-rose-200/20 animate-breathe hidden sm:block" size={36} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge mb-3">FAQ</span>
            <h2>
              Preguntas <span className="gradient-text-rose italic">Frecuentes</span>
            </h2>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="cute-card-static overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left transition-all duration-200 hover:bg-rose-50/30 min-h-[3.5rem]"
              >
                <span className="pr-4 text-sm font-medium text-ink leading-relaxed">{faq.q}</span>
                <svg className={`h-4 w-4 shrink-0 text-rose-500 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="border-t border-rose-100/30 px-6 py-4">
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
