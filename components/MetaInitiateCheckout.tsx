"use client"

import { useEffect, useRef } from "react"
import { trackMetaStandard } from "@/components/Analytics"
import { buildCommercePayload } from "@/lib/tracking"
import {
  CONSENT_UPDATED_EVENT,
  hasMarketingConsent,
  readConsent,
} from "@/lib/consent"

const FIRED_KEY = "initiate_checkout_fired"

type Props = {
  contentId: string
  contentName: string
  price: string
}

/** Fires Meta InitiateCheckout once per product per tab after marketing consent. */
export default function MetaInitiateCheckout({
  contentId,
  contentName,
  price,
}: Props) {
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

      try {
        if (sessionStorage.getItem(`${FIRED_KEY}:${contentId}`)) {
          fired.current = true
          return
        }
      } catch {
        // sessionStorage blocked
      }

      fired.current = true
      cleanupRef.current = trackMetaStandard("InitiateCheckout", payload)
      try {
        sessionStorage.setItem(`${FIRED_KEY}:${contentId}`, "1")
      } catch {
        // ignore
      }
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
