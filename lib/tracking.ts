import { parsePriceValue } from "@/lib/pricing"

/** Meta / GA commerce helpers shared by Pixel tracking. */

export function getPriceCurrency(_price: string): "EUR" {
  return "EUR"
}

export type CommercePayload = {
  content_ids: string[]
  content_type: "product"
  content_name?: string
  value: number
  currency: "EUR"
}

export function buildCommercePayload(opts: {
  id: string
  name?: string
  price: string
}): CommercePayload {
  return {
    content_ids: [opts.id],
    content_type: "product",
    content_name: opts.name,
    value: parsePriceValue(opts.price),
    currency: "EUR",
  }
}
