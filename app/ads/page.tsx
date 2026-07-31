import type { Metadata } from "next"
import AdsCatalogLander from "@/components/AdsCatalogLander"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { createPageMetadata } from "@/lib/seo"
import { listFeaturedReviews } from "@/lib/reviews"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Colecciones de Crochet en PDF",
    description:
      "Elige tu colección de patrones de crochet en PDF. Descarga al momento, acceso de por vida y garantía de 7 días.",
    path: "/ads",
    images: [DEFAULT_OG_IMAGE],
    noIndex: true,
  }),
  robots: { index: false, follow: false },
}

export default async function AdsCatalogPage() {
  const reviews = await listFeaturedReviews(3)
  return <AdsCatalogLander reviews={reviews} />
}
