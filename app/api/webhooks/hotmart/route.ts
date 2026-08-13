import {
  claimEventId,
  fbcFromFbclid,
  hashEmail,
  hashPhone,
  sendMetaCapiEvents,
  type MetaCapiEvent,
} from "@/lib/meta-capi"
import {
  getHotmartCode,
  getProductByHotmartRef,
} from "@/lib/products"
import { absoluteUrl } from "@/lib/site"

type HotmartPrice = {
  value?: number
  currency_value?: string
}

type HotmartBuyer = {
  email?: string
  name?: string
  checkout_phone?: string
  checkout_phone_code?: string
}

type HotmartOrigin = {
  src?: string
  sck?: string
  xcod?: string
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
      origin?: HotmartOrigin
      buyer?: HotmartBuyer
    }
    product?: { id?: number; name?: string; ucode?: string }
    buyer?: HotmartBuyer
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

function looksLikeFbclid(value: string | undefined): string | undefined {
  const v = value?.trim()
  if (!v) return undefined
  if (v.startsWith("fb.1.")) return undefined
  if (v.length < 12) return undefined
  return v
}

function extractFbclid(origin: HotmartOrigin | undefined): string | undefined {
  if (!origin) return undefined
  return (
    looksLikeFbclid(origin.xcod) ||
    looksLikeFbclid(origin.sck) ||
    looksLikeFbclid(origin.src)
  )
}

function buyerPhone(buyer: HotmartBuyer | undefined): string | undefined {
  if (!buyer) return undefined
  const phone = buyer.checkout_phone?.replace(/\D/g, "")
  if (!phone) return undefined
  const code = buyer.checkout_phone_code?.replace(/\D/g, "")
  if (code && !phone.startsWith(code)) return `${code}${phone}`
  return phone
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
  const phone = buyerPhone(buyer)
  const value = purchase?.price?.value
  const currency = (purchase?.price?.currency_value || "EUR").toUpperCase()
  const productName = body.data?.product?.name
  const hotmartRef =
    body.data?.product?.ucode || String(body.data?.product?.id || "")
  const siteProduct = getProductByHotmartRef(
    body.data?.product?.ucode || body.data?.product?.id
  )
  const contentIds = siteProduct
    ? [siteProduct.id, getHotmartCode(siteProduct)].filter(
        (id): id is string => Boolean(id)
      )
    : hotmartRef
      ? [hotmartRef]
      : []
  const fbclid = extractFbclid(purchase?.origin)
  const eventTime = Math.floor(Date.now() / 1000)

  // Never send the webhook request IP/UA — that is Hotmart's server, not the buyer.
  const userData: MetaCapiEvent["user_data"] = {}
  if (email) {
    userData.em = [await hashEmail(email)]
  }
  if (phone) {
    userData.ph = [await hashPhone(phone)]
  }
  if (fbclid) {
    userData.fbc = fbcFromFbclid(fbclid, eventTime)
  }

  const event: MetaCapiEvent = {
    event_name: "Purchase",
    event_time: eventTime,
    event_id: transaction,
    action_source: "website",
    event_source_url: absoluteUrl("/gracias"),
    user_data: userData,
    custom_data: {
      currency,
      value: typeof value === "number" ? value : undefined,
      content_type: "product",
      ...(contentIds.length ? { content_ids: contentIds } : {}),
      ...(productName || siteProduct?.seoTitle
        ? { content_name: siteProduct?.seoTitle || productName }
        : {}),
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
