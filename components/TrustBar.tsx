import { SITE_RATING, SITE_RATING_DISPLAY } from "@/lib/testimonials-data"
import { getAggregateRating } from "@/lib/reviews"
import { products } from "@/lib/products"
import { CrochetHeart } from "@/lib/crochet-graphics"
import TrustBarReveal from "@/components/TrustBarReveal"

export default async function TrustBar() {
  let ratingDisplay = SITE_RATING_DISPLAY
  let reviewCount = 0
  try {
    const aggregate = await getAggregateRating()
    if (aggregate.reviewCount > 0) {
      ratingDisplay = aggregate.display
      reviewCount = aggregate.reviewCount
    }
  } catch {
    // Fall back to seed display
  }

  const stats = [
    { value: String(products.length), label: "Colecciones" },
    { value: ratingDisplay, label: "Valoración" },
    {
      value: String(reviewCount > 0 ? reviewCount : SITE_RATING.reviewCount),
      label: "Reseñas",
    },
    { value: "PDF", label: "Descarga al momento" },
  ]

  return (
    <section className="trust-bar-section section-trust relative overflow-hidden">
      <div className="section relative">
        <TrustBarReveal>
          <div className="trust-bar py-9 sm:py-14 lg:py-16">
            <p className="trust-script mb-7 text-center font-script text-[1.7rem] leading-[1.15] text-rose-400 sm:mb-10 sm:text-[2rem]">
              Con cariño, para cada tejedora
            </p>

            <ul className="mx-auto flex max-w-4xl flex-wrap items-stretch justify-center gap-y-7 sm:flex-nowrap sm:gap-0">
              {stats.map((stat, i) => (
                <li
                  key={stat.label}
                  style={{ ["--i" as string]: i }}
                  className="trust-stat relative flex w-1/2 flex-col items-center px-3 text-center sm:w-auto sm:flex-1 sm:px-5"
                >
                  {i > 0 && (
                    <span
                      className="trust-stat-heart pointer-events-none absolute -left-1 top-1/2 hidden text-rose-300/75 sm:block"
                      aria-hidden="true"
                    >
                      <CrochetHeart size={16} />
                    </span>
                  )}

                  <span className="font-display text-[1.95rem] font-semibold tracking-[-0.03em] sm:text-[2.45rem] lg:text-[2.65rem]">
                    <span className="gradient-text-candy">{stat.value}</span>
                  </span>
                  <span className="mt-2.5 text-[12px] font-medium leading-snug text-muted sm:mt-3 sm:text-sm">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TrustBarReveal>
      </div>
    </section>
  )
}
