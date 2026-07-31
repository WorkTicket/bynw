"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { StarIcon } from "@/lib/icons"
import ReviewForm from "@/components/ReviewForm"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"
import { reviewImageSrc, type Review } from "@/lib/testimonials-data"

type Props = {
  reviews: Review[]
  /** Show the leave-a-review form under the list (home). */
  showForm?: boolean
  /** Cap how many quotes to show (home = 3, page = all). */
  limit?: number
  /** Override “Ver todos” link (ads landers hide it to keep focus). */
  showMoreLink?: boolean
}

export default function Testimonials({
  reviews: initialReviews,
  showForm,
  limit,
  showMoreLink: showMoreLinkProp,
}: Props) {
  const pathname = usePathname()
  const [reviews, setReviews] = useState(initialReviews)

  useEffect(() => {
    setReviews(initialReviews)
  }, [initialReviews])

  const onTestimonialsPage = pathname === "/testimonials"
  const shouldShowForm = showForm ?? !onTestimonialsPage
  const showMoreLink = showMoreLinkProp ?? !onTestimonialsPage

  const visible = useMemo(() => {
    // Photo reviews first so visitors see product images before scrolling away
    const list = [...reviews].sort((a, b) => {
      const aPhoto = reviewImageSrc(a) ? 1 : 0
      const bPhoto = reviewImageSrc(b) ? 1 : 0
      return bPhoto - aPhoto
    })
    return typeof limit === "number" ? list.slice(0, limit) : list
  }, [reviews, limit])

  function handleSubmitted(review: Review) {
    setReviews((prev) => {
      if (prev.some((r) => r.id === review.id)) return prev
      return [review, ...prev]
    })
  }

  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">Testimonios</span>
            <PetiteOrnament className="mb-5 mt-1" />
            <h2>
              Lo que dicen nuestras{" "}
              <span className="gradient-text-rose italic">artesanas</span>
            </h2>
            <p>Reseñas reales de clientas que ya tejen con nuestros patrones.</p>
          </div>
        </ScrollReveal>

        <ul className="mx-auto max-w-3xl divide-y divide-rose-100/80">
          {visible.map((t, i) => {
            const photo = reviewImageSrc(t)
            return (
              <ScrollReveal key={t.id} delay={i * 55} variant="fade">
                <li>
                  <blockquote className="flex items-start gap-4 py-7 sm:gap-6 sm:py-8">
                    {photo && (
                      <div className="shrink-0">
                        <div className="overflow-hidden rounded-2xl bg-rose-50/50 ring-1 ring-rose-100/70">
                          <img
                            src={photo}
                            alt={`Trabajo terminado de ${t.name}`}
                            loading="lazy"
                            decoding="async"
                            className="h-[5.5rem] w-[5.5rem] object-cover sm:h-[6.75rem] sm:w-[6.75rem]"
                          />
                        </div>
                      </div>
                    )}

                    <div className="min-w-0 flex-1 text-left">
                      <cite className="not-italic">
                        <p className="text-sm font-semibold tracking-wide text-ink">
                          {t.name}
                        </p>
                        {t.location && (
                          <p className="mt-0.5 text-[12px] text-muted">{t.location}</p>
                        )}
                      </cite>

                      <div
                        className="mt-2 flex items-center gap-0.5"
                        aria-label={`${t.rating} de 5 estrellas`}
                      >
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <StarIcon
                            key={idx}
                            className={
                              idx < t.rating ? "text-rose-400" : "text-rose-100"
                            }
                            size={13}
                          />
                        ))}
                      </div>

                      <p className="mt-3 text-[1.05rem] font-normal leading-[1.7] tracking-[-0.01em] text-ink/85 sm:text-[1.1rem]">
                        <span className="font-script text-[1.65rem] leading-none text-rose-300/80 mr-1">
                          “
                        </span>
                        {t.text}
                      </p>
                    </div>
                  </blockquote>
                </li>
              </ScrollReveal>
            )
          })}
        </ul>

        {shouldShowForm && (
          <ScrollReveal delay={120}>
            <div className="mx-auto mt-12 max-w-xl sm:mt-14">
              <ReviewForm variant="compact" onSubmitted={handleSubmitted} />
            </div>
          </ScrollReveal>
        )}

        {showMoreLink && (
          <ScrollReveal delay={160}>
            <div className="mt-9 flex justify-center sm:mt-10">
              <Link
                href="/testimonials"
                className="btn-secondary min-h-[3rem] px-8 py-3.5"
              >
                Ver todos los testimonios
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
