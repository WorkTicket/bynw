import {
  metaUserDataFromRequest,
  sendMetaCapiEvents,
  type MetaCapiEvent,
} from "@/lib/meta-capi"

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Contact",
])

const CUSTOM_KEYS = new Set([
  "content_ids",
  "content_type",
  "content_name",
  "content_category",
  "value",
  "currency",
  "num_items",
  "status",
  "order_id",
])

type Body = {
  event_name?: string
  event_id?: string
  event_source_url?: string
  custom_data?: Record<string, unknown>
  fbp?: string
  fbc?: string
}

function sanitizeCustomData(
  raw: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!raw) return undefined
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw)) {
    if (!CUSTOM_KEYS.has(key) || value == null) continue
    out[key] = value
  }
  return Object.keys(out).length ? out : undefined
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const eventName = (body.event_name || "").trim()
  const eventId = (body.event_id || "").trim().slice(0, 100)
  if (!ALLOWED_EVENTS.has(eventName) || eventId.length < 8) {
    return Response.json({ error: "Invalid event" }, { status: 400 })
  }

  const userData = await metaUserDataFromRequest(req, {
    fbp: body.fbp,
    fbc: body.fbc,
  })

  const event: MetaCapiEvent = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: body.event_source_url?.slice(0, 1024),
    user_data: userData,
    custom_data: sanitizeCustomData(body.custom_data),
  }

  const result = await sendMetaCapiEvents([event])
  if (!result.ok) {
    return Response.json(
      { ok: false, skipped: result.skipped, capi: result },
      { status: result.skipped ? 200 : 502 }
    )
  }

  return Response.json({ ok: true, event_id: eventId })
}
