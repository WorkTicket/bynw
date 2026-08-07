"use client"

import { useEffect } from "react"
import { isMobileCheckout, loadHotmartAssets } from "@/lib/hotmart"

/**
 * Prefetch Hotmart lightbox assets on desktop paid landers only.
 * Mobile uses full-page checkout — warming the Fancybox widget hurts LCP
 * and is unused on phones / Facebook in-app browsers.
 */
export default function AdsHotmartWarmup() {
  useEffect(() => {
    if (isMobileCheckout()) return

    const start = () => {
      void loadHotmartAssets().catch(() => {})
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 3500 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = window.setTimeout(start, 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
