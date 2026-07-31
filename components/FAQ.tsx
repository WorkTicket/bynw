"use client"

import { useState, useId } from "react"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { faqs } from "@/lib/faqs"

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">FAQ</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Preguntas{" "}
              <span className="gradient-text-rose italic">frecuentes</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl divide-y divide-rose-100/60 border-y border-rose-100/60">
          {faqs.map((faq, i) => {
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`
            const isOpen = openIdx === i

            return (
              <ScrollReveal key={faq.q} delay={Math.min(i * 40, 200)} variant="fade">
                <div className={isOpen ? "bg-rose-50/30" : ""}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-rose-600 min-h-[3.25rem] sm:py-6 sm:min-h-[3.5rem]"
                  >
                    <span className={`pr-5 font-display text-[1.05rem] font-medium tracking-tight leading-snug sm:pr-6 sm:text-xl ${isOpen ? "text-rose-700" : "text-ink"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-rose-100 text-rose-500" : "bg-rose-50/80 text-rose-400"
                      }`}
                    >
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 pb-5 sm:pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
