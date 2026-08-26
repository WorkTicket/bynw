/**
 * Meta paid-traffic helpers for Ads Manager + attribution.
 *
 * Ops: cold ads may land on `/` (home catalog) or `/ads/{slug}`.
 * Paid hits on `/` render AdsCatalogLander (message-match for “many options”).
 * Safety net: paid hits on `/shop*` still bounce to `/ads/{slug}`.
 * Do NOT redirect `/` — home is an intentional paid destination.
 */

import { isMetaInAppBrowser } from "@/lib/in-app-browser"
import { getProductBySlug, products } from "@/lib/products"

/** Default featured / sticky product when campaign cannot be mapped. */
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

/** Next.js page `searchParams` → URLSearchParams (first value wins). */
export function toURLSearchParams(
  raw?: Record<string, string | string[] | undefined> | URLSearchParams | null
): URLSearchParams {
  if (!raw) return new URLSearchParams()
  if (raw instanceof URLSearchParams) return new URLSearchParams(raw)
  const out = new URLSearchParams()
  for (const [key, value] of Object.entries(raw)) {
    const v = Array.isArray(value) ? value[0] : value
    if (v?.trim()) out.set(key, v)
  }
  return out
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

/** Facebook / Instagram / Messenger in-app WebView (Meta ads conversion path). */
export function isFacebookInAppBrowser(userAgent?: string | null): boolean {
  return isMetaInAppBrowser(userAgent)
}

/**
 * True when query params indicate Meta paid traffic that should use /ads landers.
 * In Facebook in-app browsers, fbclid alone counts as paid (ad click).
 * Avoids treating bare fbclid as paid in normal mobile Safari/Chrome shares.
 */
export function isMetaPaidTraffic(
  searchParams: URLSearchParams | { get(name: string): string | null } | null | undefined,
  userAgent?: string | null
): boolean {
  if (!searchParams || typeof searchParams.get !== "function") return false
  const source = searchParams.get("utm_source")
  const medium = searchParams.get("utm_medium")
  const campaign = searchParams.get("utm_campaign")
  const fbclid = searchParams.get("fbclid")
  const hasFbclid = Boolean(fbclid?.trim())
  const paid = isPaidMedium(medium)
  const meta = isMetaSource(source)
  const fbIab = isFacebookInAppBrowser(userAgent)

  if (paid && (meta || hasFbclid || !source?.trim())) return true
  if (meta && paid) return true
  if (meta && campaign?.trim()) return true
  if (hasFbclid && paid) return true
  if (hasFbclid && campaign?.trim()) return true
  if (hasFbclid && meta) return true
  if (hasFbclid && fbIab) return true
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

/** Paths that should bounce Meta paid traffic onto /ads landers.
 * Home (`/`) is intentionally excluded — ads may land on the catalog.
 */
export function shouldRedirectPaidOrganicPath(pathname: string): boolean {
  if (pathname === "/shop") return true
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

/** Canonical home cold-ad URL for Ads Manager (ops copy-paste). */
export function coldHomeAdsUrlTemplate(): string {
  return `https://bynmwcreative.com/?utm_source=facebook&utm_medium=paid&utm_campaign=es_home_cold&utm_content=v1`
}

/** Canonical product lander URL template for Ads Manager (ops copy-paste). */
export function coldAdsUrlTemplate(slug = DEFAULT_COLD_ADS_SLUG): string {
  return `https://bynmwcreative.com/ads/${slug}?utm_source=facebook&utm_medium=paid&utm_campaign=es_${slug.replace(/-/g, "_")}_cold&utm_content=v1`
}
