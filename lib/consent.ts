/** Cookie consent (EU/Spain). Analytics + marketing scripts load only after opt-in. */

export const CONSENT_STORAGE_KEY = "cookie_consent_v1"
export const CONSENT_UPDATED_EVENT = "cookie-consent-updated"
/** Open the preferences panel (footer “Preferencias de cookies”). */
export const OPEN_CONSENT_PREFS_EVENT = "cookie-consent-open-prefs"

export function openConsentPrefs(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(OPEN_CONSENT_PREFS_EVENT))
}

export type ConsentChoice = {
  /** Always true — required for the site to function. */
  necessary: true
  /** Google Analytics */
  analytics: boolean
  /** Meta Pixel / advertising */
  marketing: boolean
  updatedAt: string
}

export function defaultConsentDenied(): ConsentChoice {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  }
}

export function consentAll(): ConsentChoice {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    updatedAt: new Date().toISOString(),
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
      return null
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice))
  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, { detail: choice })
  )
}

export function hasAnalyticsConsent(choice: ConsentChoice | null): boolean {
  return Boolean(choice?.analytics)
}

export function hasMarketingConsent(choice: ConsentChoice | null): boolean {
  return Boolean(choice?.marketing)
}
