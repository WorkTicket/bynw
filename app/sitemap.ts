import { MetadataRoute } from "next"
import { products } from "@/lib/products"

const BASE_URL = "https://bynmwcreative.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/`,
          "es-ES": `${BASE_URL}/`,
          "x-default": `${BASE_URL}/`,
        },
      },
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/shop`,
          "es-ES": `${BASE_URL}/shop`,
          "x-default": `${BASE_URL}/shop`,
        },
      },
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/about`,
          "es-ES": `${BASE_URL}/about`,
          "x-default": `${BASE_URL}/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/contact`,
          "es-ES": `${BASE_URL}/contact`,
          "x-default": `${BASE_URL}/contact`,
        },
      },
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/testimonials`,
          "es-ES": `${BASE_URL}/testimonials`,
          "x-default": `${BASE_URL}/testimonials`,
        },
      },
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/terms`,
          "es-ES": `${BASE_URL}/terms`,
          "x-default": `${BASE_URL}/terms`,
        },
      },
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/privacy-policy`,
          "es-ES": `${BASE_URL}/privacy-policy`,
          "x-default": `${BASE_URL}/privacy-policy`,
        },
      },
    },
    {
      url: `${BASE_URL}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/cookies-policy`,
          "es-ES": `${BASE_URL}/cookies-policy`,
          "x-default": `${BASE_URL}/cookies-policy`,
        },
      },
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: {
        languages: {
          "es-MX": `${BASE_URL}/refund-policy`,
          "es-ES": `${BASE_URL}/refund-policy`,
          "x-default": `${BASE_URL}/refund-policy`,
        },
      },
    },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: {
      languages: {
        "es-MX": `${BASE_URL}/shop/${product.slug}`,
        "es-ES": `${BASE_URL}/shop/${product.slug}`,
        "x-default": `${BASE_URL}/shop/${product.slug}`,
      },
    },
  }))

  return [...staticPages, ...productPages]
}
