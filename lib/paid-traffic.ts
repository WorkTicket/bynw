/**
 * Meta paid-traffic helpers: detect cold ad landings on organic routes
 * and map campaigns → /ads/{slug} product landers.
 *
 * Ops: cold ads must land on /ads/{slug} (see .env.example).
 * This module is the safety net when Ads Manager still points at / or /shop.
 */

import { getProductBySlug, products } from "@/lib/products"

/** Default cold-traffic product when campaign cannot be mapped. */
export const DEFAULT_COLD_ADS_SLUG = "princesas-disney"

const META_SOURCES = new Set([
  "facebook",
  "fb",
  "instagram",
  "ig",
  "meta",
  "an",
])

const PAID_MEDIUM_RE =
  /^(paid|cpc|cpm|ppc|ppa|paidsocial|paid_social|paid-social|social_paid)$/i

/** Campaign / content keywords → product slug (first match wins). */
const CAMPAIGN_SLUG_RULES: { test: RegExp; slug: string }[] = [
  { test: /princesas|disney/i, slug: "princesas-disney" },
  { test: /flores[-_]?eternas|eternas/i, slug: "flores-eternas" },
  { test: /chenille|amigurumis[-_]?chenille/i, slug: "amigurumis-chenille" },
  { test: /munecas|muñecas|premium/i, slug: "munecas-premium" },
  { test: /santos|angeles|ángeles/i, slug: "santos-angeles" },
  { test: /navidad|christmas/i, slug: "navidad" },
  { test: /halloween/i, slug: "halloween" },
  { test: /reversibles/i, slug: "flores-reversibles" },
  { test: /profesiones/i, slug: "profesiones" },
]

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase()
}

export function isPaidMedium(medium: string | null | undefined): boolean {
  const m = normalize(medium)
  if (!m) return false
  if (PAID_MEDIUM_RE.test(m)) return true
  return m.includes("paid")
}

export function isMetaSource(source: string | null | undefined): boolean {
  return META_SOURCES.has(normalize(source))
}

/**
 * True when query params indicate Meta paid traffic that should use /ads landers.
 * Avoids redirecting bare organic Facebook shares (fbclid alone, no campaign/UTM paid).
 */
export function isMetaPaidTraffic(
  searchParams: URLSearchParams | { get(name: string): string | null }
): boolean {
  const source = searchParams.get("utm_source")
  const medium = searchParams.get("utm_medium")
  const campaign = searchParams.get("utm_campaign")
  const fbclid = searchParams.get("fbclid")
  const hasFbclid = Boolean(fbclid?.trim())
  const paid = isPaidMedium(medium)
  const meta = isMetaSource(source)

  if (paid && (meta || hasFbclid || !source?.trim())) return true
  if (meta && paid) return true
  if (meta && campaign?.trim()) return true
  if (hasFbclid && paid) return true
  if (hasFbclid && campaign?.trim()) return true
  if (hasFbclid && meta) return true
  return false
}

/** Resolve product slug from campaign/content, path slug, or default. */
export function resolveColdAdsSlug(options: {
  searchParams: URLSearchParams | { get(name: string): string | null }
  pathSlug?: string | null
}): string {
  const { searchParams, pathSlug } = options

  if (pathSlug) {
    const fromPath = getProductBySlug(pathSlug)
    if (fromPath) return fromPath.slug
  }

  const haystack = [
    searchParams.get("utm_campaign"),
    searchParams.get("utm_content"),
    searchParams.get("utm_term"),
  ]
    .filter(Boolean)
    .join(" ")

  if (haystack) {
    for (const rule of CAMPAIGN_SLUG_RULES) {
      if (rule.test.test(haystack) && getProductBySlug(rule.slug)) {
        return rule.slug
      }
    }
    // Exact slug somewhere in campaign string
    for (const p of products) {
      if (haystack.toLowerCase().includes(p.slug)) return p.slug
    }
  }

  return DEFAULT_COLD_ADS_SLUG
}

/** Paths that should bounce Meta paid traffic onto /ads landers. */
export function shouldRedirectPaidOrganicPath(pathname: string): boolean {
  if (pathname === "/" || pathname === "/shop") return true
  return /^\/shop\/[^/]+\/?$/.test(pathname)
}

export function extractShopSlug(pathname: string): string | null {
  const m = pathname.match(/^\/shop\/([^/]+)\/?$/)
  return m?.[1] ?? null
}

/** Build ads lander path + preserve attribution query string. */
export function buildPaidAdsRedirectUrl(
  originUrl: URL,
  slug: string
): URL {
  const target = new URL(`/ads/${slug}`, originUrl.origin)
  originUrl.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value)
  })
  return target
}

/** Canonical cold-ad URL template for Ads Manager (ops copy-paste). */
export function coldAdsUrlTemplate(slug = DEFAULT_COLD_ADS_SLUG): string {
  return `https://bynmwcreative.com/ads/${slug}?utm_source=facebook&utm_medium=paid&utm_campaign=es_${slug.replace(/-/g, "_")}_cold&utm_content=v1`
}
