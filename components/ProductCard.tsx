import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { parsePriceValue } from "@/lib/pricing"
import { LayersIcon } from "@/lib/icons"
import LiveViewerCount from "@/components/LiveViewerCount"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const priceNum = parsePriceValue(product.price)
  const originalNum = parsePriceValue(product.originalPrice)
  const discount = originalNum > 0
    ? Math.round((1 - priceNum / originalNum) * 100)
    : 0
  const savings = originalNum - priceNum

  return (
    <Link href={`/shop/${product.slug}`} className="group block h-full">
      <div data-product-card={product.id} className="relative flex h-full flex-col overflow-hidden rounded-3xl2 bg-white border border-rose-100/40 shadow-soft transition-all duration-500 hover:shadow-premium hover:-translate-y-1.5 hover:border-rose-200/60">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-300 via-pink-500 to-rose-300 scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

        <div className="aspect-[4/3] overflow-hidden bg-rose-50/40 relative">
          <Image
            src={`/images/${product.images[0]}`}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {discount >= 50 && (
            <span className="absolute top-3 right-3 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-rose-500/30">
              -{discount}%
            </span>
          )}
          <LiveViewerCount productId={product.id} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gradient-to-r from-rose-50 to-pink-50 px-3 py-1 text-[10px] font-semibold text-rose-600 border border-rose-200/50">
            <LayersIcon className="text-rose-400" size={12} />
            Colección
          </span>

          <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold text-ink group-hover:gradient-text-rose transition-all duration-300 leading-tight line-clamp-2">
            {product.title}
          </h3>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold gradient-text-rose">{product.price}</span>
            <span className="text-sm text-muted/40 line-through font-medium">{product.originalPrice}</span>
            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 rounded-full px-2 py-0.5 border border-rose-200">{discount}% OFF</span>
          </div>

          <p className="mt-1 text-[11px] font-medium text-rose-600 bg-rose-50 rounded-full px-2 py-0.5 self-start border border-rose-200">
            Ahorras {product.price.includes("€") ? `${savings}€` : product.price.includes("MX$") ? `MX$${savings}` : `${savings}`}
          </p>

          <p className="mt-3 flex-1 text-sm text-muted leading-relaxed">
            {product.description}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-rose-500 group-hover:text-rose-400 transition-colors">
            Ver colección
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
