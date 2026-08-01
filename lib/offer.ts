import { parsePriceValue } from "@/lib/pricing"

/**
 * Promotional window: reference (tachado) prices apply until this deadline.
 * Rolls to 23:59:59 Europe/Madrid on the last calendar day of the current month.
 */
export function getPromoEndDate(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now)
  const year = Number(parts.find((p) => p.type === "year")?.value)
  const month = Number(parts.find((p) => p.type === "month")?.value)
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate()
  return new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}T23:59:59+02:00`
  )
}

export function isPromoActive(now = new Date()): boolean {
  return now.getTime() <= getPromoEndDate(now).getTime()
}

export function formatPromoEndLabel(now = new Date()): string {
  const end = getPromoEndDate(now)
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "short",
  }).format(end)
}

export function getDiscountPercent(price: string, originalPrice: string): number {
  const p = parsePriceValue(price)
  const o = parsePriceValue(originalPrice)
  if (!o || p >= o) return 0
  return Math.round(((o - p) / o) * 100)
}

/** Badge text: "−50% · hasta 31 ago" while promo active; otherwise just "−50%". */
export function formatDiscountBadge(
  discount: number,
  now = new Date()
): string | null {
  if (discount < 1) return null
  if (isPromoActive(now) && discount >= 40) {
    return `−${discount}% · hasta ${formatPromoEndLabel(now)}`
  }
  return `−${discount}%`
}

export function promoUrgencyLine(now = new Date()): string {
  if (!isPromoActive(now)) {
    return "Precio actual en euros · descarga al momento · garantía 7 días"
  }
  return `Precio promocional hasta el ${formatPromoEndLabel(now)} · descarga al momento`
}
