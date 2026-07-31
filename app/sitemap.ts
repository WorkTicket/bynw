import { MetadataRoute } from "next"
import { products } from "@/lib/products"
import { SITE_URL, SITEMAP_DATES } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: SITEMAP_DATES.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: SITEMAP_DATES.shop,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: SITEMAP_DATES.about,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: SITEMAP_DATES.contact,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: SITEMAP_DATES.testimonials,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: SITEMAP_DATES.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: SITEMAP_DATES.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/cookies-policy`,
      lastModified: SITEMAP_DATES.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: SITEMAP_DATES.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: SITEMAP_DATES.products,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
