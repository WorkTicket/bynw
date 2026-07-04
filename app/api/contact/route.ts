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
      return new Response(JSON.stringify({ error: "El correo es obligatorio" }), {
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

    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Manos Creativas Bynmw <noreply@manoscreativasbynmw.com>",
          to: process.env.CONTACT_EMAIL || "natalia@manoscreativasbynmw.com",
          subject: `Nuevo mensaje de contacto de ${name || "anónimo"}`,
          text: `Nombre: ${name || "No indicado"}\nCorreo: ${email}\nTeléfono: ${phone || "No indicado"}\n\nMensaje:\n${message || "No indicado"}`,
        }),
      })
      if (!resendRes.ok) {
        throw new Error("Failed to send email")
      }
    }

    console.log("Contact form submission:", { name, email, phone, message })

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
