const CONTACT_INBOX = process.env.CONTACT_EMAIL || "bynw808@gmail.com"

type ContactPayload = {
  name?: string
  email: string
  phone?: string
  message?: string
}

function formatContactEmail(data: ContactPayload) {
  const name = data.name?.trim() || "Anónimo"
  const phone = data.phone?.trim() || "No indicado"
  const message = data.message?.trim() || "No indicado"

  const text = `Nuevo mensaje desde bynmwcreative.com

Nombre: ${name}
Correo: ${data.email}
Teléfono: ${phone}

Mensaje:
${message}`

  const html = `
    <p><strong>Nuevo mensaje desde bynmwcreative.com</strong></p>
    <p><strong>Nombre:</strong> ${name}<br/>
    <strong>Correo:</strong> <a href="mailto:${data.email}">${data.email}</a><br/>
    <strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
  `

  return {
    subject: `Nuevo contacto: ${name}`,
    text,
    html,
  }
}

async function sendViaGmailWebhook(data: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.GMAIL_CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    return { ok: false, error: "Gmail webhook not configured" }
  }

  const email = formatContactEmail(data)
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: process.env.GMAIL_CONTACT_WEBHOOK_TOKEN || "",
      to: CONTACT_INBOX,
      replyTo: data.email.trim(),
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  })

  if (!response.ok) {
    return { ok: false, error: await response.text() }
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null
  if (!result?.ok) {
    return { ok: false, error: result?.error || "Gmail webhook rejected request" }
  }

  return { ok: true }
}

async function sendViaResend(data: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: "Resend not configured" }
  }

  const email = formatContactEmail(data)
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Manos Creativas Bynmw <noreply@manoscreativasbynmw.com>",
      to: CONTACT_INBOX,
      reply_to: data.email.trim(),
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  })

  if (!response.ok) {
    return { ok: false, error: await response.text() }
  }

  return { ok: true }
}

export async function sendContactNotification(
  data: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  const gmail = await sendViaGmailWebhook(data)
  if (gmail.ok) return gmail

  const resend = await sendViaResend(data)
  if (resend.ok) return resend

  return {
    ok: false,
    error: gmail.error || resend.error || "No email provider configured",
  }
}

export function getContactInbox(): string {
  return CONTACT_INBOX
}
