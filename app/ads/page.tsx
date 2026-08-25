import type { Metadata } from "next"
import AdsCatalogLander from "@/components/AdsCatalogLander"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { createPageMetadata } from "@/lib/seo"
import { listAdsFeaturedReviews } from "@/lib/reviews"
import { toURLSearchParams } from "@/lib/paid-traffic"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Colecciones de Crochet o Ganchillo en PDF",
    description:
      "Elige tu colección de patrones de crochet o ganchillo en PDF. Descarga al momento, acceso de por vida y garantía de 7 días.",
    path: "/ads",
    images: [DEFAULT_OG_IMAGE],
    noIndex: true,
  }),
  robots: { index: false, follow: false },
}

type Props = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function AdsCatalogPage({ searchParams }: Props) {
  const hrefQuery = toURLSearchParams(searchParams).toString() || undefined
  const reviews = await listAdsFeaturedReviews(3)
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/imagen-2.webp"
        fetchPriority="high"
      />
      <AdsCatalogLander
        reviews={reviews}
        hrefQuery={hrefQuery || undefined}
      />
    </>
  )
}
