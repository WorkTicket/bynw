import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { faqs } from "@/lib/faqs"

/** Native <details> FAQ — zero client JS. */
export default function FAQ() {
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
          {faqs.map((faq) => (
            <ScrollReveal key={faq.q} variant="fade">
              <details className="group faq-details">
                <summary className="flex w-full cursor-pointer list-none items-center justify-between py-5 text-left transition-colors hover:text-rose-600 min-h-[3.25rem] sm:py-6 sm:min-h-[3.5rem] [&::-webkit-details-marker]:hidden">
                  <span className="pr-5 font-display text-[1.05rem] font-medium tracking-tight leading-snug text-ink group-open:text-rose-700 sm:pr-6 sm:text-xl">
                    {faq.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50/80 text-rose-400 transition-colors group-open:bg-rose-100 group-open:text-rose-500">
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180"
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
                </summary>
                <p className="max-w-xl pb-5 text-[14px] leading-relaxed text-muted sm:pb-6 sm:text-[15px]">
                  {faq.a}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
