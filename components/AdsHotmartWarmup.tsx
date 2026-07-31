"use client"

import { useEffect } from "react"
import { loadHotmartAssets } from "@/lib/hotmart"

/** Prefetch Hotmart checkout assets on paid landers so the first tap opens faster. */
export default function AdsHotmartWarmup() {
  useEffect(() => {
    const start = () => {
      void loadHotmartAssets().catch(() => {})
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }

    const timer = window.setTimeout(start, 400)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
