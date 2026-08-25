import { parsePriceValue } from "@/lib/pricing"

export function getDiscountPercent(price: string, originalPrice: string): number {
  const p = parsePriceValue(price)
  const o = parsePriceValue(originalPrice)
  if (!o || p >= o) return 0
  return Math.round(((o - p) / o) * 100)
}

/** Badge text for the ongoing promotional price. */
export function formatDiscountBadge(discount: number): string | null {
  if (discount < 1) return null
  return `−${discount}%`
}

/** Hero / catalog hook — all current sale prices are 50% off list. */
export const SALE_PERCENT = 50
export const SALE_TIMEZONE = "Europe/Madrid"

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

/** Milliseconds until Sunday 23:59:59 Europe/Madrid (matches “esta semana”). */
export function msUntilSaleWeekEnd(now = new Date()): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: SALE_TIMEZONE,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hourCycle: "h23",
    }).formatToParts(now)

    const val = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? ""

    const weekday = val("weekday") as (typeof WEEKDAY_SHORT)[number]
    const dow = WEEKDAY_SHORT.includes(weekday) ? WEEKDAY_SHORT.indexOf(weekday) : 0
    const hourRaw = val("hour")
    const h = Number(hourRaw === "24" ? "0" : hourRaw)
    const m = Number(val("minute"))
    const s = Number(val("second"))
    const nowSec = Math.max(dow, 0) * 86400 + h * 3600 + m * 60 + s
    const sundayEnd = 86399
    let remaining = sundayEnd - nowSec
    if (remaining <= 0) remaining += 7 * 86400
    return remaining * 1000
  } catch {
    const day = now.getDay()
    const sundayEnd = new Date(now)
    sundayEnd.setHours(23, 59, 59, 999)
    const add = day === 0 ? 0 : 7 - day
    sundayEnd.setDate(now.getDate() + add)
    return Math.max(0, sundayEnd.getTime() - now.getTime())
  }
}

export function promoUrgencyLine(): string {
  return `Todas las colecciones al ${SALE_PERCENT}% esta semana`
}

export function promoHeroBadge(): string {
  return `−${SALE_PERCENT}% esta semana`
}

export function promoEndsSoonLine(): string {
  return "Acaba el domingo"
}
