/**
 * Meta Conversions API (CAPI) helpers for server-side Purchase events.
 * Deduplicate with browser Pixel using the same event_id (Hotmart transaction).
 */

export type MetaCapiUserData = {
  em?: string[]
  ph?: string[]
  client_ip_address?: string
  client_user_agent?: string
  fbc?: string
  fbp?: string
}

export type MetaCapiEvent = {
  event_name: string
  event_time: number
  event_id: string
  action_source: "website" | "other"
  event_source_url?: string
  user_data: MetaCapiUserData
  custom_data?: Record<string, unknown>
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase())
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function hashEmail(email: string): Promise<string> {
  return sha256Hex(email)
}

type CloudflareEnv = {
  META_CAPI_ACCESS_TOKEN?: string
  META_PIXEL_ID?: string
  NEXT_PUBLIC_FB_PIXEL_ID?: string
  META_CAPI_TEST_EVENT_CODE?: string
  REVIEWS?: {
    get: (key: string) => Promise<string | null>
    put: (
      key: string,
      value: string,
      options?: { expirationTtl?: number }
    ) => Promise<void>
  }
}

async function getWorkerEnv(): Promise<CloudflareEnv> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare")
    const { env } = await getCloudflareContext({ async: true })
    return (env || {}) as CloudflareEnv
  } catch {
    return {}
  }
}

function resolveSecrets(env: CloudflareEnv) {
  const token =
    env.META_CAPI_ACCESS_TOKEN ||
    process.env.META_CAPI_ACCESS_TOKEN ||
    ""
  const pixelId =
    env.META_PIXEL_ID ||
    env.NEXT_PUBLIC_FB_PIXEL_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_FB_PIXEL_ID ||
    ""
  const testCode =
    env.META_CAPI_TEST_EVENT_CODE ||
    process.env.META_CAPI_TEST_EVENT_CODE ||
    ""
  return { token, pixelId, testCode }
}

/** Returns true if this event_id was already sent (idempotent). */
export async function claimEventId(eventId: string): Promise<boolean> {
  const env = await getWorkerEnv()
  const kv = env.REVIEWS
  const key = `meta-capi:${eventId}`

  if (kv) {
    const existing = await kv.get(key)
    if (existing) return false
    await kv.put(key, new Date().toISOString(), {
      expirationTtl: 60 * 60 * 24 * 30, // 30 days
    })
    return true
  }

  // Local/dev fallback — process memory only
  const g = globalThis as unknown as { __metaCapiSent?: Set<string> }
  if (!g.__metaCapiSent) g.__metaCapiSent = new Set()
  if (g.__metaCapiSent.has(eventId)) return false
  g.__metaCapiSent.add(eventId)
  return true
}

export async function sendMetaCapiEvents(
  events: MetaCapiEvent[]
): Promise<{ ok: boolean; status?: number; body?: string; skipped?: string }> {
  const env = await getWorkerEnv()
  const { token, pixelId, testCode } = resolveSecrets(env)

  if (!token || !pixelId) {
    return {
      ok: false,
      skipped: "META_CAPI_ACCESS_TOKEN or pixel ID missing",
    }
  }

  const url = new URL(
    `https://graph.facebook.com/v21.0/${pixelId}/events`
  )
  url.searchParams.set("access_token", token)

  const payload: Record<string, unknown> = {
    data: events,
    partner_agent: "bynmwcreative-capi-1.0",
  }
  if (testCode) payload.test_event_code = testCode

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const body = await res.text()
  return { ok: res.ok, status: res.status, body }
}
