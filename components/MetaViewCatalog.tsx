"use client"

import { useEffect, useMemo, useRef } from "react"
import { trackMetaStandard } from "@/components/Analytics"
import { parsePriceValue } from "@/lib/pricing"
import {
  CONSENT_UPDATED_EVENT,
  hasMarketingConsent,
  readConsent,
} from "@/lib/consent"

type Item = {
  id: string
  name: string
  price: string
}

type Props = {
  items: Item[]
}

/** Catalog ViewContent so Meta can remarket the collection set, not only PDP views. */
export default function MetaViewCatalog({ items }: Props) {
  const fired = useRef(false)
  const cleanupRef = useRef<(() => void) | null>(null)
  const catalogKey = useMemo(
    () => items.map((item) => item.id).join(","),
    [items]
  )

  useEffect(() => {
    const value = items.reduce((sum, item) => sum + parsePriceValue(item.price), 0)
    const payload = {
      content_ids: catalogKey.split(",").filter(Boolean),
      content_type: "product_group",
      content_name: "Colecciones de crochet",
      value,
      currency: "EUR",
      num_items: items.length,
    }

    const tryFire = () => {
      if (fired.current) return
      if (!hasMarketingConsent(readConsent())) return
      fired.current = true
      cleanupRef.current = trackMetaStandard("ViewContent", payload)
    }

    tryFire()
    window.addEventListener(CONSENT_UPDATED_EVENT, tryFire)
    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, tryFire)
      cleanupRef.current?.()
    }
  }, [catalogKey, items])

  return null
}
