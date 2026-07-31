import { products, type Product } from "@/lib/products"

export function parsePriceValue(price: string): number {
  const cleaned = price.replace(/[^\d.,]/g, "")
  if (!cleaned) return 0
  // Thousand separators: 1,200 or 1.200
  if (/^\d{1,3}([.,]\d{3})+$/.test(cleaned)) {
    return parseFloat(cleaned.replace(/[.,]/g, "")) || 0
  }
  // Decimal comma: 11,50
  if (cleaned.includes(",") && !cleaned.includes(".")) {
    return parseFloat(cleaned.replace(",", ".")) || 0
  }
  return parseFloat(cleaned) || 0
}

/** Lowest catalog "from" price for marketing CTAs (EUR / Spain). */
export function getCatalogFromPrice(): string {
  return products.reduce((best, cur) =>
    parsePriceValue(cur.price) < parsePriceValue(best.price) ? cur : best
  ).price
}

/** @deprecated Spain-only — returns the product unchanged. Kept for call-site compatibility. */
export function getLocalizedProduct(product: Product): Product {
  return product
}
