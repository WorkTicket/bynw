import { notFound } from "next/navigation"
import type { Metadata } from "next"
import CheckoutShell from "@/components/CheckoutShell"
import { products, getProductBySlug } from "@/lib/products"
import { createPageMetadata } from "@/lib/seo"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { buildHotmartPayUrl } from "@/lib/hotmart"
import { toURLSearchParams } from "@/lib/paid-traffic"

type Props = {
  params: { slug: string }
  searchParams?: Record<string, string | string[] | undefined>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { robots: { index: false, follow: false } }

  return {
    ...createPageMetadata({
      title: `Checkout · ${product.seoTitle}`,
      description: `Completa tu compra de ${product.shortTitle}. Pago seguro, acceso inmediato por correo.`,
      path: `/checkout/${params.slug}`,
      images: product.images[0]
        ? [
            {
              url: `/images/${product.images[0]}`,
              width: 1200,
              height: 630,
              alt: product.seoTitle,
            },
          ]
        : [DEFAULT_OG_IMAGE],
      noIndex: true,
    }),
    robots: { index: false, follow: false },
  }
}

export default function CheckoutPage({ params, searchParams }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const search = toURLSearchParams(searchParams)
  const payUrl = buildHotmartPayUrl(product.buyUrl, search)

  return <CheckoutShell product={product} payUrl={payUrl} />
}
