import { getGiftDownloadUrl } from "@/lib/gift-magnet"
import { addToMailchimp } from "@/lib/mailchimp"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, source } = data as {
      name?: string
      email?: string
      source?: string
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "El correo electrónico es obligatorio" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Correo electrónico no válido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const downloadUrl = getGiftDownloadUrl(new URL(req.url).origin)

    const mailchimp = await addToMailchimp({ email, name, source })
    if (!mailchimp.ok) {
      console.warn("Mailchimp sync failed:", mailchimp.error, { email, source })
    }

    console.log("New lead:", { name, email, source, mailchimp: mailchimp.ok })

    return new Response(JSON.stringify({ ok: true, downloadUrl }), {
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
