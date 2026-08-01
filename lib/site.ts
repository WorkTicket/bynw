/** Shared site constants for SEO, schema, and contact consistency. */

export const SITE_URL = "https://bynmwcreative.com"
export const BRAND_NAME = "Manos Creativas Bynmw"
export const CONTACT_EMAIL = "bynw808@gmail.com"
export const CONTACT_PHONE = "+57-300-850-4709"
export const WHATSAPP_URL = "https://wa.me/573008504709"
/** Post-purchase support ask (Hotmart thank-you → /gracias). */
export const WHATSAPP_POST_PURCHASE_URL =
  "https://wa.me/573008504709?text=" +
  encodeURIComponent(
    "Hola Natalia, acabo de comprar una colección y quiero confirmar el acceso a los PDF 🙂"
  )
export const SUPPORT_SLA = "Respuesta en menos de 24h"
export const SOCIAL_LINKS = [
  "https://www.tiktok.com/@bynmw8",
  "https://www.instagram.com/bynmw12_",
  "https://www.facebook.com/share/1L3pLJdqvm/",
] as const

/** Primary locale for crawlers — Spain. */
export const SITE_LANG = "es"
export const DEFAULT_OG_LOCALE = "es_ES"
export const OG_ALTERNATE_LOCALES = [] as const

export const DEFAULT_DESCRIPTION =
  "Patrones de crochet o ganchillo en PDF: amigurumis, Princesas Disney y Flores Eternas. Descarga al momento, acceso de por vida. Envío digital en España."

export const DEFAULT_OG_IMAGE = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Manos Creativas Bynmw — Patrones de crochet o ganchillo en PDF",
} as const

export const SITE_KEYWORDS = [
  "patrones crochet",
  "patrones crochet o ganchillo",
  "patrones crochet PDF",
  "patrones crochet España",
  "patrones ganchillo",
  "amigurumis",
  "patrones amigurumi",
  "flores crochet",
  "flores eternas crochet",
  "princesas crochet",
  "manualidades crochet",
  "patrones digitales crochet",
] as const

/** Stable sitemap dates (ISO) — update when content meaningfully changes. */
export const SITEMAP_DATES = {
  home: "2026-07-30",
  shop: "2026-07-30",
  about: "2026-07-27",
  contact: "2026-07-27",
  testimonials: "2026-07-30",
  products: "2026-07-30",
  legal: "2026-07-30",
} as const

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function absoluteImageUrl(filename: string): string {
  const clean = filename.replace(/^\//, "").replace(/^images\//, "")
  return `${SITE_URL}/images/${clean}`
}
