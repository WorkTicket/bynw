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

/** Fire InitiateCheckout once per product per tab after marketing consent. */
export function fireInitiateCheckout(opts: {
  id: string
  name?: string
  price: string
}): (() => void) | undefined {
  try {
    if (typeof window === "undefined") return
    if (!hasMarketingConsent(readConsent())) return

    try {
      if (sessionStorage.getItem(`${FIRED_KEY}:${opts.id}`)) return
    } catch {
      // sessionStorage blocked — still try to send
    }

    const payload = buildCommercePayload({
      id: opts.id,
      name: opts.name,
      price: opts.price,
    })
    const cleanup = trackMetaStandard("InitiateCheckout", payload)
    try {
      sessionStorage.setItem(`${FIRED_KEY}:${opts.id}`, "1")
    } catch {
      // ignore
    }
    return cleanup
  } catch {
    return undefined
  }
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
    const tryFire = () => {
      if (fired.current) return
      const cleanup = fireInitiateCheckout({
        id: contentId,
        name: contentName,
        price,
      })
      if (!hasMarketingConsent(readConsent())) return
      fired.current = true
      if (cleanup) cleanupRef.current = cleanup
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
