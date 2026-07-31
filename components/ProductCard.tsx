import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { parsePriceValue } from "@/lib/pricing"
import { getPriceCurrency } from "@/lib/tracking"

type Props = {
  product: Product
  /** Base path for the product link. Ads catalog uses `/ads`. */
  hrefBase?: "/shop" | "/ads"
  ctaLabel?: string
  /** LCP hint for above-the-fold cards */
  priority?: boolean
}

export default function ProductCard({
  product,
  hrefBase = "/shop",
  ctaLabel = "Ver y comprar",
  priority = false,
}: Props) {
  const priceNum = parsePriceValue(product.price)
  const originalNum = parsePriceValue(product.originalPrice)
  const discount =
    originalNum > 0 ? Math.round((1 - priceNum / originalNum) * 100) : 0

  return (
    <Link
      href={`${hrefBase}/${product.slug}`}
      className="group block h-full"
      data-track-shop-view={product.id}
      data-content-id={product.id}
      data-content-name={product.seoTitle}
      data-value={String(priceNum)}
      data-currency={getPriceCurrency(product.price)}
    >
      <article
        data-product-card={product.id}
        className="relative flex h-full flex-col"
      >
        <div className="product-media aspect-[4/5]">
          <Image
            src={`/images/${product.images[0]}`}
            alt={product.shortTitle}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.045]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-900/[0.12] via-transparent to-white/15 opacity-80 transition-opacity duration-500 group-hover:opacity-50"
            aria-hidden="true"
          />
          {discount >= 50 && (
            <span className="absolute left-3.5 top-3.5 rounded-xl bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-600 shadow-soft ring-1 ring-rose-100/90 backdrop-blur-sm sm:left-4 sm:top-4">
              −{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-6 sm:pt-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-rose-500">
            Colección
          </p>

          <h3 className="mt-2.5 font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-rose-600 sm:text-[1.85rem]">
            {product.shortTitle}
          </h3>

          <div className="mt-3.5 flex items-baseline gap-3">
            <span className="text-lg font-semibold tracking-tight text-ink">
              {product.price}
            </span>
            {originalNum > priceNum && (
              <span className="text-sm text-muted/40 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <p className="mt-3.5 flex-1 text-[14px] leading-[1.75] text-muted line-clamp-2 sm:text-sm">
            {product.description}
          </p>

          <span className="mt-6 inline-flex min-h-[2.75rem] items-center gap-2.5 text-sm font-medium tracking-[0.02em] text-rose-500 transition-colors group-hover:text-rose-600">
            {ctaLabel}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  )
}
