"use client"

import { useMemo, useState } from "react"
import ReviewForm from "@/components/ReviewForm"
import PetiteOrnament from "@/components/PetiteOrnament"
import PrimaryCTA from "@/components/PrimaryCTA"
import ScrollReveal from "@/components/ScrollReveal"
import { StarIcon } from "@/lib/icons"
import {
  computeAggregate,
  dailyShuffleSeed,
  interleaveReviews,
  reviewImageSrc,
  seededShuffle,
  type Review,
} from "@/lib/testimonials-data"

type Props = {
  initialReviews: Review[]
}

/** Full testimonials page: photo wall + review list + leave-a-review form. */
export default function TestimonialsLive({ initialReviews }: Props) {
  const [reviews, setReviews] = useState(initialReviews)
  const shuffleSeed = dailyShuffleSeed("testimonials-page")

  const aggregate = useMemo(() => computeAggregate(reviews), [reviews])
  const photoReviews = useMemo(
    () =>
      seededShuffle(
        reviews.filter((r) => Boolean(reviewImageSrc(r))),
        `${shuffleSeed}-gallery`
      ),
    [reviews, shuffleSeed]
  )
  const visible = useMemo(
    () => interleaveReviews(reviews, `${shuffleSeed}-list`),
    [reviews, shuffleSeed]
  )

  function handleSubmitted(review: Review) {
    setReviews((prev) => {
      if (prev.some((r) => r.id === review.id)) return prev
      return [review, ...prev]
    })
    requestAnimationFrame(() => {
      document
        .getElementById("testimonios-lista")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      {/* Trust strip */}
      <section className="border-y border-rose-100/70 bg-[linear-gradient(180deg,#fffaf8_0%,#fff_100%)]">
        <div className="section flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 text-center sm:gap-x-14 sm:py-7">
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {aggregate.display}
            </p>
            <div
              className="mt-1.5 flex items-center justify-center gap-0.5"
              aria-label={`${aggregate.display} de 5 estrellas`}
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon
                  key={idx}
                  className={
                    idx < Math.round(aggregate.ratingValue)
                      ? "text-rose-400"
                      : "text-rose-100"
                  }
                  size={14}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
              Valoración media
            </p>
          </div>
          <span className="hidden h-10 w-px bg-rose-200/70 sm:block" aria-hidden />
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {aggregate.reviewCount}
            </p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
              Reseñas publicadas
            </p>
          </div>
          <span className="hidden h-10 w-px bg-rose-200/70 sm:block" aria-hidden />
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {photoReviews.length}
            </p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
              Fotos de clientas
            </p>
          </div>
        </div>
      </section>

      {/* Customer photo wall */}
      {photoReviews.length > 0 && (
        <section className="section-white section-padding !pb-10 sm:!pb-12">
          <div className="section">
            <ScrollReveal>
              <div className="section-header">
                <span className="eyebrow">Trabajos reales</span>
                <PetiteOrnament className="mb-5 mt-1" />
                <h2>
                  Hecho con nuestros{" "}
                  <span className="gradient-text-rose italic">patrones</span>
                </h2>
                <p>
                  Fotos que nos envían artesanas después de tejer. Cada una con
                  su propio toque.
                </p>
              </div>
            </ScrollReveal>

            <ul className="mt-2 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
              {photoReviews.map((t, i) => {
                const photo = reviewImageSrc(t)
                if (!photo) return null
                const tall = i % 5 === 1 || i % 5 === 3
                return (
                  <li
                    key={t.id}
                    className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
                  >
                    <ScrollReveal delay={Math.min(i * 40, 280)} variant="fade">
                      <figure className="group overflow-hidden rounded-[1.15rem] bg-rose-50/40 ring-1 ring-rose-100/80">
                        <img
                          src={photo}
                          alt={`Trabajo terminado de ${t.name}`}
                          loading={i < 6 ? "eager" : "lazy"}
                          decoding="async"
                          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                            tall
                              ? "aspect-[3/4]"
                              : "aspect-square"
                          }`}
                        />
                        <figcaption className="px-3 py-2.5 text-left sm:px-3.5 sm:py-3">
                          <p className="truncate text-[13px] font-semibold text-ink">
                            {t.name}
                          </p>
                          {t.location && (
                            <p className="truncate text-[11px] text-muted">
                              {t.location}
                            </p>
                          )}
                        </figcaption>
                      </figure>
                    </ScrollReveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Written reviews */}
      <section
        id="testimonios-lista"
        className="section-alt section-padding !pt-10 sm:!pt-12"
      >
        <div className="section">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Reseñas</span>
              <PetiteOrnament className="mb-5 mt-1" />
              <h2>
                Lo que cuentan nuestras{" "}
                <span className="gradient-text-rose italic">artesanas</span>
              </h2>
              <p>
                Historias reales de compra, tejido y el momento de enseñar el
                resultado.
              </p>
            </div>
          </ScrollReveal>

          <ul className="mx-auto mt-2 grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
            {visible.map((t, i) => {
              const photo = reviewImageSrc(t)
              return (
                <ScrollReveal key={t.id} delay={Math.min(i * 35, 240)} variant="fade">
                  <li className="h-full">
                    <blockquote className="flex h-full flex-col rounded-[1.35rem] border border-rose-100/80 bg-white/80 px-5 py-6 shadow-[0_12px_40px_-28px_rgba(184,74,94,0.35)] backdrop-blur-sm sm:px-6 sm:py-7">
                      <div
                        className="flex items-center gap-0.5"
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

                      <p className="mt-4 flex-1 text-[1.02rem] leading-[1.7] tracking-[-0.01em] text-ink/85">
                        <span className="mr-1 font-script text-[1.7rem] leading-none text-rose-300/85">
                          “
                        </span>
                        {t.text}
                      </p>

                      <footer className="mt-5 flex items-center gap-3.5 border-t border-rose-100/80 pt-5">
                        {photo ? (
                          <div className="overflow-hidden rounded-xl bg-rose-50/60 ring-1 ring-rose-100/80">
                            <img
                              src={photo}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-12 w-12 object-cover sm:h-14 sm:w-14"
                            />
                          </div>
                        ) : (
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 font-script text-xl text-rose-400 sm:h-14 sm:w-14"
                            aria-hidden
                          >
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <cite className="min-w-0 not-italic">
                          <p className="truncate text-sm font-semibold tracking-wide text-ink">
                            {t.name}
                          </p>
                          {t.location && (
                            <p className="truncate text-[12px] text-muted">
                              {t.location}
                            </p>
                          )}
                        </cite>
                      </footer>
                    </blockquote>
                  </li>
                </ScrollReveal>
              )
            })}
          </ul>

          <ScrollReveal delay={120}>
            <div className="mt-12 flex justify-center sm:mt-14">
              <PrimaryCTA href="#dejar-resena">Dejar mi reseña</PrimaryCTA>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-white section-padding" id="dejar-resena">
        <div className="section">
          <ScrollReveal>
            <div className="section-header mb-10">
              <span className="eyebrow">Tu turno</span>
              <PetiteOrnament className="mb-5 mt-1" />
              <h2>
                Comparte tu{" "}
                <span className="gradient-text-rose italic">experiencia</span>
              </h2>
              <p>
                Una foto de tu tejido ayuda a otras artesanas a decidirse. Se
                publica al momento.
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto max-w-xl">
            <ReviewForm variant="full" onSubmitted={handleSubmitted} />
          </div>
        </div>
      </section>
    </>
  )
}
