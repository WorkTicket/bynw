/** Shared Meta event IDs and click cookies (safe for client + server). */

export function newMetaEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

/** Meta click ID cookie: fb.1.{unixSeconds}.{fbclid} */
export function fbcFromFbclid(fbclid: string, eventTimeSec?: number): string {
  const ts = eventTimeSec ?? Math.floor(Date.now() / 1000)
  return `fb.1.${ts}.${fbclid.trim()}`
}

export function readCookieValue(
  cookieHeader: string | null | undefined,
  name: string
): string | undefined {
  if (!cookieHeader) return undefined
  const parts = cookieHeader.split(";")
  for (const part of parts) {
    const trimmed = part.trim()
    const eq = trimmed.indexOf("=")
    if (eq < 1) continue
    if (trimmed.slice(0, eq) !== name) continue
    try {
      return decodeURIComponent(trimmed.slice(eq + 1))
    } catch {
      return trimmed.slice(eq + 1)
    }
  }
  return undefined
}

export function readBrowserCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  return readCookieValue(document.cookie, name)
}
