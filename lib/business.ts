/**
 * Legal / commercial identity for policies and schema.
 * Fill LEGAL_ADDRESS via env when you have a public business address.
 */

export const LEGAL_TRADE_NAME = "Manos Creativas Bynmw"
export const LEGAL_CONTROLLER_NAME = "Natalia"
export const LEGAL_CONTROLLER_ROLE = "Titular del tratamiento y responsable comercial"
export const LEGAL_COUNTRY = "Colombia"
export const LEGAL_CONTACT_EMAIL = "bynw808@gmail.com"
export const LEGAL_CONTACT_PHONE = "+57 300 850 4709"
export const LEGAL_WHATSAPP = "+57 300 850 4709"
export const LEGAL_PAYMENT_PROCESSOR = "Hotmart (Launch Pad Tecnologia e Serviços S/A)"
export const LEGAL_HOSTING = "Cloudflare, Inc."

/** Optional public address — set NEXT_PUBLIC_LEGAL_ADDRESS in production. */
export function getLegalAddress(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_LEGAL_ADDRESS?.trim()
  return fromEnv || null
}

export function getLegalIdentityLines(): string[] {
  const lines = [
    `${LEGAL_CONTROLLER_NAME} — ${LEGAL_TRADE_NAME}`,
    LEGAL_CONTROLLER_ROLE,
    `País: ${LEGAL_COUNTRY}`,
    `Email: ${LEGAL_CONTACT_EMAIL}`,
    `WhatsApp: ${LEGAL_WHATSAPP}`,
  ]
  const address = getLegalAddress()
  if (address) lines.splice(3, 0, `Domicilio: ${address}`)
  return lines
}
