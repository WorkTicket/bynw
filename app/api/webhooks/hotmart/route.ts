import {
  claimEventId,
  hashEmail,
  sendMetaCapiEvents,
  type MetaCapiEvent,
} from "@/lib/meta-capi"
import { absoluteUrl } from "@/lib/site"

type HotmartPrice = {
  value?: number
  currency_value?: string
}

type HotmartPayload = {
  hottok?: string
  event?: string
  data?: {
    purchase?: {
      transaction?: string
      status?: string
      price?: HotmartPrice
      order_date?: number
      buyer?: { email?: string; name?: string; checkout_phone?: string }
    }
    product?: { id?: number; name?: string; ucode?: string }
    buyer?: { email?: string; name?: string; checkout_phone?: string }
    affiliates?: unknown
  }
}

const PURCHASE_EVENTS = new Set([
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "PURCHASE_FINISHED",
  "APPROVED",
])

async function getHottokSecret(): Promise<string> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare")
    const { env } = await getCloudflareContext({ async: true })
    const fromEnv = (env as { HOTMART_HOTTOK?: string }).HOTMART_HOTTOK
    if (fromEnv) return fromEnv
  } catch {
    // local
  }
  return process.env.HOTMART_HOTTOK || process.env.HOTMART_WEBHOOK_TOKEN || ""
}

function extractHottok(req: Request, body: HotmartPayload): string {
  return (
    req.headers.get("x-hotmart-hottok") ||
    req.headers.get("X-Hotmart-Hottok") ||
    body.hottok ||
    new URL(req.url).searchParams.get("hottok") ||
    ""
  )
}

function clientIp(req: Request): string | undefined {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    undefined
  )
}

export async function POST(req: Request) {
  let body: HotmartPayload
  try {
    body = (await req.json()) as HotmartPayload
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const secret = await getHottokSecret()
  if (!secret) {
    console.error("Hotmart webhook: HOTMART_HOTTOK not configured")
    return Response.json({ error: "Webhook not configured" }, { status: 503 })
  }

  const token = extractHottok(req, body)
  if (!token || token !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const eventName = (body.event || "").toUpperCase()
  if (!PURCHASE_EVENTS.has(eventName)) {
    return Response.json({ ok: true, ignored: eventName || "unknown" })
  }

  const purchase = body.data?.purchase
  const transaction = purchase?.transaction?.trim()
  if (!transaction) {
    return Response.json({ error: "Missing transaction" }, { status: 400 })
  }

  const claimed = await claimEventId(transaction)
  if (!claimed) {
    return Response.json({ ok: true, deduped: true, event_id: transaction })
  }

  const buyer = purchase?.buyer || body.data?.buyer
  const email = buyer?.email?.trim()
  const value = purchase?.price?.value
  const currency = (purchase?.price?.currency_value || "EUR").toUpperCase()
  const productName = body.data?.product?.name
  const productId = body.data?.product?.ucode || String(body.data?.product?.id || "")

  const userData: MetaCapiEvent["user_data"] = {
    client_ip_address: clientIp(req),
    client_user_agent: req.headers.get("user-agent") || undefined,
  }
  if (email) {
    userData.em = [await hashEmail(email)]
  }

  const event: MetaCapiEvent = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: transaction,
    action_source: "website",
    event_source_url: absoluteUrl("/gracias"),
    user_data: userData,
    custom_data: {
      currency,
      value: typeof value === "number" ? value : undefined,
      content_type: "product",
      ...(productId ? { content_ids: [productId] } : {}),
      ...(productName ? { content_name: productName } : {}),
      order_id: transaction,
    },
  }

  const result = await sendMetaCapiEvents([event])
  if (!result.ok) {
    console.error("Meta CAPI Purchase failed", result)
    // Still 200 to Hotmart so they don't retry-storm; log for ops
    return Response.json({
      ok: false,
      event_id: transaction,
      capi: result,
    })
  }

  return Response.json({ ok: true, event_id: transaction, capi: "sent" })
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "/api/webhooks/hotmart",
    expects: "POST with Hotmart hottok + PURCHASE_APPROVED payload",
  })
}
