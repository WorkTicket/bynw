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

export function promoUrgencyLine(): string {
  return "Precio promocional · descarga al momento"
}
