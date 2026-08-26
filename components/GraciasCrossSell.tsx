import Image from "next/image"
import { products } from "@/lib/products"
import { formatDiscountBadge, getDiscountPercent } from "@/lib/offer"

type Props = {
  /** Exclude the product just purchased when Hotmart passes product slug/id. */
  excludeSlug?: string | null
}

export default function GraciasCrossSell({ excludeSlug }: Props) {
  const picks = products
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)

  if (!picks.length) return null

  return (
    <section className="section-white section-padding border-t border-rose-100/60">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Sigue creando</span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Completa tu taller con otra colección
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Misma descarga inmediata y garantía de 7 días.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {picks.map((product) => {
            const discount = getDiscountPercent(
              product.price,
              product.originalPrice
            )
            const badge = formatDiscountBadge(discount)
            const img = product.images[0]
            return (
              <li key={product.slug}>
                <a
                  href={`/shop/${product.slug}`}
                  className="group block text-center"
                >
                  <div className="relative mx-auto aspect-square max-w-[11rem] overflow-hidden rounded-2xl bg-rose-50/40 ring-1 ring-rose-100/70">
                    {img ? (
                      <Image
                        src={`/images/${img}`}
                        alt={product.shortTitle}
                        fill
                        sizes="176px"
                        className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">
                    {product.shortTitle}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {product.price}
                    {badge ? (
                      <span className="ml-1.5 text-rose-600">{badge}</span>
                    ) : null}
                  </p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
