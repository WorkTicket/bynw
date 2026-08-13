/** Persist Facebook / UTM params and forward them into Hotmart checkout URLs. */

export const AD_ATTRIBUTION_KEY = "ad_attribution"

export type AdAttribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  fbclid?: string
}

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const

function sanitizeParam(value: string, max = 255): string {
  return value.replace(/[^\w\-.|]/g, "_").slice(0, max)
}

/** Extract attribution fields from a query string / URLSearchParams. */
export function captureAdAttribution(
  searchParams: URLSearchParams | string | null | undefined
): AdAttribution | null {
  if (!searchParams) return null
  const params =
    typeof searchParams === "string"
      ? new URLSearchParams(
          searchParams.startsWith("?") ? searchParams.slice(1) : searchParams
        )
      : searchParams

  const captured: AdAttribution = {}
  let has = false
  for (const key of ATTR_KEYS) {
    const value = params.get(key)?.trim()
    if (value) {
      captured[key] = value
      has = true
    }
  }
  return has ? captured : null
}

export function readAdAttribution(): AdAttribution {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(AD_ATTRIBUTION_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as AdAttribution
  } catch {
    return {}
  }
}

/** Merge new params into session storage (first-touch wins per key). */
export function persistAdAttribution(incoming: AdAttribution): AdAttribution {
  if (typeof window === "undefined") return incoming
  const existing = readAdAttribution()
  const merged: AdAttribution = { ...incoming, ...existing }
  for (const key of ATTR_KEYS) {
    if (!existing[key] && incoming[key]) merged[key] = incoming[key]
    else if (existing[key]) merged[key] = existing[key]
  }
  try {
    sessionStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify(merged))
  } catch {
    // Ignore quota / private mode failures.
  }
  return merged
}

/** Capture from the current URL and persist (safe to call on every navigation). */
export function captureAndPersistFromLocation(
  search: string | URLSearchParams | null | undefined
): AdAttribution {
  const captured = captureAdAttribution(search)
  if (!captured) return readAdAttribution()
  return persistAdAttribution(captured)
}

/**
 * Append Hotmart-friendly tracking params + UTM/fbclid to a checkout URL.
 * - `src`: utm_source, or "facebook" when fbclid is present
 * - `sck`: campaign|content (Hotmart sub-tracking)
 */
export function appendAttributionToHotmartUrl(
  href: string,
  attrs?: AdAttribution
): string {
  const attribution =
    attrs ?? (typeof window !== "undefined" ? readAdAttribution() : {})
  if (!attribution || !Object.keys(attribution).length) return href

  try {
    const url = new URL(href)
    const src =
      attribution.utm_source ||
      (attribution.fbclid ? "facebook" : undefined)
    if (src && !url.searchParams.has("src")) {
      url.searchParams.set("src", sanitizeParam(src))
    }

    const sckParts = [attribution.utm_campaign, attribution.utm_content].filter(
      Boolean
    ) as string[]
    if (sckParts.length && !url.searchParams.has("sck")) {
      url.searchParams.set("sck", sanitizeParam(sckParts.join("|")))
    }

    // Official Hotmart param only — raw fbclid/utm_* on the pay URL can
    // break checkout parsers. Webhook reads xcod for Meta fbc.
    if (attribution.fbclid && !url.searchParams.has("xcod")) {
      url.searchParams.set("xcod", sanitizeParam(attribution.fbclid, 255))
    }

    return url.toString()
  } catch {
    return href
  }
}
