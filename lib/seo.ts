import type { Metadata } from "next"
import type { Product } from "@/lib/products"
import { parsePriceValue } from "@/lib/pricing"
import {
  SITE_URL,
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_LINKS,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_LOCALE,
  OG_ALTERNATE_LOCALES,
  absoluteUrl,
  absoluteImageUrl,
} from "@/lib/site"
import { featuredTestimonials, SITE_RATING, type Review, type AggregateRating, computeAggregate } from "@/lib/testimonials-data"

type OgImageInput =
  | string
  | {
      url: string
      width?: number
      height?: number
      alt?: string
    }

type PageMetadataOptions = {
  title: string | { absolute: string }
  description: string
  path: string
  images?: OgImageInput[]
  noIndex?: boolean
  ogType?: "website" | "article"
}

function normalizeOgImages(images: OgImageInput[]) {
  return images.map((img) => {
    if (typeof img === "string") {
      const url = img.startsWith("http") ? img : img.startsWith("/") ? img : `/images/${img}`
      return {
        url,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: DEFAULT_OG_IMAGE.alt,
      }
    }
    return {
      url: img.url,
      width: img.width ?? DEFAULT_OG_IMAGE.width,
      height: img.height ?? DEFAULT_OG_IMAGE.height,
      alt: img.alt ?? DEFAULT_OG_IMAGE.alt,
    }
  })
}

/** Shared page metadata: canonical, OG, Twitter — stable across geo. */
export function createPageMetadata({
  title,
  description,
  path,
  images,
  noIndex = false,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const ogImages = normalizeOgImages(images?.length ? images : [DEFAULT_OG_IMAGE])
  const ogTitle =
    typeof title === "string" ? `${title} ⋆ ${BRAND_NAME}` : title.absolute

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-ES": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: BRAND_NAME,
      type: ogType,
      locale: DEFAULT_OG_LOCALE,
      ...(OG_ALTERNATE_LOCALES.length
        ? { alternateLocale: [...OG_ALTERNATE_LOCALES] }
        : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImages,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
  }
}

export function priceValidUntil(monthsAhead = 12): string {
  const d = new Date()
  d.setMonth(d.getMonth() + monthsAhead)
  return d.toISOString().slice(0, 10)
}

/** Product JSON-LD with EUR offer (Spain). */
export function buildProductJsonLd(product: Product) {
  const productUrl = absoluteUrl(`/shop/${product.slug}`)
  const images = product.images.map((img) => absoluteImageUrl(img))
  const eurPrice = parsePriceValue(product.price)
  const validUntil = priceValidUntil(12)

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.seoTitle,
    description: product.description,
    sku: product.id,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    image: images,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: validUntil,
      price: String(eurPrice),
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
        url: SITE_URL,
      },
    },
  }
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildOrganizationJsonLd(aggregate?: AggregateRating) {
  const rating = aggregate ?? {
    ratingValue: SITE_RATING.ratingValue,
    reviewCount: SITE_RATING.reviewCount,
    bestRating: 5,
    worstRating: 1,
    display: String(SITE_RATING.ratingValue),
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: absoluteImageUrl("logo-64.png"),
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: [...SOCIAL_LINKS],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      contactType: "customer service",
      availableLanguage: ["Spanish"],
      areaServed: "ES",
    },
    ...(rating.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(rating.ratingValue),
            reviewCount: String(rating.reviewCount),
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  }
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    inLanguage: "es",
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  }
}

/** Review schema matching testimonials visible on the site. */
export function buildReviewsJsonLd(reviews: Review[] = featuredTestimonials) {
  const list = reviews.length > 0 ? reviews : featuredTestimonials
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: t.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: String(t.rating),
          bestRating: "5",
        },
        reviewBody: t.text,
        datePublished: t.createdAt,
        itemReviewed: {
          "@type": "Organization",
          name: BRAND_NAME,
          url: SITE_URL,
        },
      },
    })),
  }
}

export function buildAggregateFromReviews(reviews: Review[]): AggregateRating {
  return computeAggregate(reviews)
}
