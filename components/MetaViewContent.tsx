"use client"

import { useEffect, useRef } from "react"
import { trackMetaStandard } from "@/components/Analytics"
import { buildCommercePayload } from "@/lib/tracking"
import {
  CONSENT_UPDATED_EVENT,
  hasMarketingConsent,
  readConsent,
} from "@/lib/consent"

type Props = {
  contentId: string
  contentName: string
  price: string
}

/** Fires Meta ViewContent once per product mount after marketing consent. */
export default function MetaViewContent({ contentId, contentName, price }: Props) {
  const fired = useRef(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const payload = buildCommercePayload({
      id: contentId,
      name: contentName,
      price,
    })

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
  }, [contentId, contentName, price])

  return null
}
