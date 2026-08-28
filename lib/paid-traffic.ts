/**
 * Meta paid-traffic helpers for Ads Manager + attribution.
 *
 * Ops: Facebook ads land on `/` (organic home). Existing `/ads*` URLs
 * redirect there and keep UTM / fbclid query params.
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

/** True for `/ads` and `/ads/{slug}` — those URLs redirect to home. */
export function isAdsLanderPath(pathname: string): boolean {
  return pathname === "/ads" || /^\/ads\/[^/]+\/?$/.test(pathname)
}

/** Send `/ads*` to home and keep UTM / fbclid query params. */
export function buildPaidHomeRedirectUrl(originUrl: URL): URL {
  const target = new URL("/", originUrl.origin)
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
  const campaign = `es_${slug.replace(/-/g, "_")}_cold`
  return `https://bynmwcreative.com/?utm_source=facebook&utm_medium=paid&utm_campaign=${campaign}&utm_content=v1`
}
