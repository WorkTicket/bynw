"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { trackMetaStandard } from "@/components/Analytics"
import {
  hasMarketingConsent,
  readConsent,
  CONSENT_UPDATED_EVENT,
} from "@/lib/consent"

const FIRED_KEY = "purchase_pixel_fired"

/**
 * Browser Purchase for Hotmart thank-you redirects that append transaction params.
 * Uses Hotmart transaction as event_id so Meta dedupes with CAPI webhook.
 *
 * Hotmart redirect example:
 * https://bynmwcreative.com/gracias?transaction={{transaction}}&value={{price}}&currency=EUR&content_name={{product_name}}
 */
export default function PurchaseComplete() {
  const searchParams = useSearchParams()
  const fired = useRef(false)

  useEffect(() => {
    const tryFire = () => {
      if (fired.current) return
      if (!hasMarketingConsent(readConsent())) return

      const transaction =
        searchParams.get("transaction") ||
        searchParams.get("txn") ||
        searchParams.get("order_id") ||
        ""
      const valueRaw =
        searchParams.get("value") ||
        searchParams.get("price") ||
        searchParams.get("amount") ||
        ""
      const currency = (
        searchParams.get("currency") ||
        searchParams.get("currency_code") ||
        "EUR"
      ).toUpperCase()
      const contentName = searchParams.get("content_name") || undefined
      const contentId =
        searchParams.get("content_ids") ||
        searchParams.get("product_id") ||
        undefined

      // Without a transaction id we cannot safely dedupe with CAPI — skip.
      if (!transaction) return

      try {
        if (sessionStorage.getItem(`${FIRED_KEY}:${transaction}`)) {
          fired.current = true
          return
        }
      } catch {
        // sessionStorage blocked
      }

      const value = valueRaw ? Number(valueRaw) : undefined
      const params: Record<string, unknown> = {
        currency,
        content_type: "product",
        eventID: transaction,
      }
      if (typeof value === "number" && !Number.isNaN(value)) params.value = value
      if (contentName) params.content_name = contentName
      if (contentId) params.content_ids = [contentId]

      fired.current = true
      trackMetaStandard("Purchase", params)
      try {
        sessionStorage.setItem(`${FIRED_KEY}:${transaction}`, "1")
      } catch {
        // ignore
      }
    }

    tryFire()
    window.addEventListener(CONSENT_UPDATED_EVENT, tryFire)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, tryFire)
  }, [searchParams])

  return null
}
