import type { Product } from "@/lib/products"

export type RegionalPricing = {
  price: string
  originalPrice: string
  buyUrl: string
  buyText: string
}

export const mxPricing: Record<string, RegionalPricing> = {
  "princesas-disney": {
    price: "MX$173",
    originalPrice: "MX$1,200",
    buyUrl: "https://pay.hotmart.com/L104751068L?checkoutMode=2&off=rry933ur",
    buyText: "Comprar ahora",
  },
  "flores-eternas": {
    price: "MX$173",
    originalPrice: "MX$1,200",
    buyUrl: "https://pay.hotmart.com/O106393812M?checkoutMode=2&off=0uezc18f",
    buyText: "Comprar ahora",
  },
  "amigurumis-chenille": {
    price: "MX$191",
    originalPrice: "MX$1,200",
    buyUrl: "https://pay.hotmart.com/A104843589W?checkoutMode=2&off=a9plv7ym",
    buyText: "Comprar ahora",
  },
}

export function getLocalizedProduct(product: Product, country: string | null | undefined): Product {
  if (country === "MX" && mxPricing[product.id]) {
    return { ...product, ...mxPricing[product.id] }
  }
  return product
}

export function parsePriceValue(price: string): number {
  const cleaned = price.replace(/[^0-9,.]/g, "").replace(",", ".")
  return parseFloat(cleaned) || 0
}

export function getPriceFrom(product: Product, country: string | null | undefined): string {
  if (country === "MX") {
    const lowestMx = Math.min(
      ...Object.values(mxPricing).map((p) => parsePriceValue(p.price))
    )
    return `MX$${lowestMx}`
  }
  const lowestEur = Math.min(
    ...product.id ? [] : []
  )
  return "8€"
}

export const MEXICO_HERO_PRICE = "MX$173"
export const DEFAULT_HERO_PRICE = "8€"
