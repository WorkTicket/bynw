/**
 * Contact form email webhook — sends to bynw808@gmail.com from that Gmail account.
 *
 * Setup (one time):
 * 1. Log into bynw808@gmail.com → https://script.google.com
 * 2. New project → paste this file → Save
 * 3. Project Settings → Script properties → add CONTACT_WEBHOOK_TOKEN (random secret)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me (bynw808@gmail.com)
 *    - Who has access: Anyone
 * 5. Copy web app URL → Cloudflare secret GMAIL_CONTACT_WEBHOOK_URL
 * 6. Copy same token → Cloudflare secret GMAIL_CONTACT_WEBHOOK_TOKEN
 */

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  if (!lock.tryLock(10000)) {
    return jsonResponse({ ok: false, error: "busy" })
  }

  try {
    const data = JSON.parse(e.postData.contents || "{}")
    const expectedToken = PropertiesService.getScriptProperties().getProperty("CONTACT_WEBHOOK_TOKEN")

    if (!expectedToken || data.token !== expectedToken) {
      return jsonResponse({ ok: false, error: "unauthorized" })
    }

    const to = data.to || "bynw808@gmail.com"
    const options = {}

    if (data.html) options.htmlBody = data.html
    if (data.replyTo) options.replyTo = data.replyTo

    GmailApp.sendEmail(
      to,
      data.subject || "Nuevo mensaje de contacto",
      data.text || "",
      options
    )

    return jsonResponse({ ok: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}
