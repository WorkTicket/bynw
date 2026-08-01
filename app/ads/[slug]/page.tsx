import { notFound } from "next/navigation"
import type { Metadata } from "next"
import AdsProductLander from "@/components/AdsProductLander"
import { products, getProductBySlug } from "@/lib/products"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { createPageMetadata } from "@/lib/seo"
import { listAdsFeaturedReviews } from "@/lib/reviews"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { robots: { index: false, follow: false } }

  const desc = product.description.slice(0, 160)
  const ogImages = product.images.slice(0, 3).map((img) => ({
    url: `/images/${img}`,
    width: 1200,
    height: 630,
    alt: product.seoTitle,
  }))

  return {
    ...createPageMetadata({
      title: product.seoTitle,
      description: desc,
      path: `/ads/${params.slug}`,
      images: ogImages.length ? ogImages : [DEFAULT_OG_IMAGE],
      noIndex: true,
    }),
    robots: { index: false, follow: false },
  }
}

export default async function AdsProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const featuredReviews = await listAdsFeaturedReviews(3)

  return (
    <AdsProductLander product={product} reviews={featuredReviews} />
  )
}
