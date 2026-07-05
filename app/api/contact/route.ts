import { sendContactNotification } from "@/lib/contact-email"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { name, email, phone, message } = data as {
      name?: string
      email?: string
      phone?: string
      message?: string
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

    const notification = await sendContactNotification({
      name,
      email: email.trim(),
      phone,
      message,
    })

    if (!notification.ok) {
      console.error("Contact email failed:", notification.error, { name, email })
      return new Response(JSON.stringify({ error: "No se pudo enviar el mensaje. Inténtalo de nuevo." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("Contact form submission sent:", { name, email, phone })

    return new Response(JSON.stringify({ ok: true }), {
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
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
