import { getGiftDownloadUrl, GIFT_MAGNET } from "@/lib/gift-magnet"
import { addToMailchimp } from "@/lib/mailchimp"
import {
  metaUserDataFromRequest,
  sendMetaCapiEvents,
  type MetaCapiEvent,
} from "@/lib/meta-capi"
import { absoluteUrl } from "@/lib/site"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, source, event_id, fbp, fbc, event_source_url } = data as {
      name?: string
      email?: string
      source?: string
      event_id?: string
      fbp?: string
      fbc?: string
      event_source_url?: string
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "El correo electrónico (e-mail) es obligatorio" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Correo electrónico (e-mail) no válido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const downloadUrl = getGiftDownloadUrl(new URL(req.url).origin)

    const mailchimp = await addToMailchimp({ email, name, source })
    if (!mailchimp.ok) {
      console.warn("Mailchimp sync failed:", mailchimp.error, { email, source })
    }

    const eventId =
      (typeof event_id === "string" && event_id.trim().slice(0, 100)) ||
      `lead_${Date.now().toString(36)}`

    const userData = await metaUserDataFromRequest(req, {
      email,
      fbp: typeof fbp === "string" ? fbp : undefined,
      fbc: typeof fbc === "string" ? fbc : undefined,
    })

    const leadEvent: MetaCapiEvent = {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url:
        (typeof event_source_url === "string" && event_source_url.slice(0, 1024)) ||
        absoluteUrl("/#regalo-gratis"),
      user_data: userData,
      custom_data: {
        content_name: GIFT_MAGNET.title,
        content_category: "lead_magnet",
        status: source || "subscribe",
        currency: "EUR",
        value: 0,
      },
    }

    const capi = await sendMetaCapiEvents([leadEvent])
    if (!capi.ok) {
      console.warn("Meta CAPI Lead failed", capi)
    }

    console.log("New lead:", { name, email, source, mailchimp: mailchimp.ok, capi: capi.ok })

    return new Response(JSON.stringify({ ok: true, downloadUrl, event_id: eventId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ error: "Solicitud inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, downloadUrl: getGiftDownloadUrl() }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
