import { SITE_RATING_DISPLAY } from "@/lib/testimonials-data"
import { getAggregateRating } from "@/lib/reviews"
import { products } from "@/lib/products"
import { CrochetHeart } from "@/lib/crochet-graphics"

export default async function TrustBar() {
  let ratingDisplay = SITE_RATING_DISPLAY
  try {
    const aggregate = await getAggregateRating()
    if (aggregate.reviewCount > 0) ratingDisplay = aggregate.display
  } catch {
    // Fall back to seed display
  }

  const stats = [
    { value: String(products.length), label: "Colecciones" },
    { value: ratingDisplay, label: "Valoración" },
    { value: "PDF", label: "Descarga al momento" },
    { value: "24h", label: "Soporte WhatsApp" },
  ]

  return (
    <section className="trust-bar-section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255, 241, 240, 0.8) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="section relative">
        <div className="trust-bar py-9 sm:py-14 lg:py-16">
          <p className="mb-7 text-center font-script text-[1.7rem] leading-none text-rose-400 sm:mb-10 sm:text-[2rem]">
            Con cariño, para cada tejedora
          </p>

          <ul className="mx-auto flex max-w-4xl flex-wrap items-stretch justify-center gap-y-7 sm:flex-nowrap sm:gap-0">
            {stats.map((stat, i) => (
              <li
                key={stat.label}
                className="relative flex w-1/2 flex-col items-center px-3 text-center sm:w-auto sm:flex-1 sm:px-5"
              >
                {i > 0 && (
                  <span
                    className="pointer-events-none absolute -left-1 top-1/2 hidden -translate-y-1/2 text-rose-300/75 sm:block"
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
      </div>
    </section>
  )
}
