"use client"

import {
  fbcFromFbclid,
  newMetaEventId,
  readBrowserCookie,
} from "@/lib/meta-ids"
import { readAdAttribution } from "@/lib/ad-attribution"

export { newMetaEventId }

export function readMetaClickIds(): { fbp?: string; fbc?: string } {
  const fbp = readBrowserCookie("_fbp")
  const cookieFbc = readBrowserCookie("_fbc")
  if (cookieFbc) return { fbp, fbc: cookieFbc }

  const fbclid =
    new URLSearchParams(window.location.search).get("fbclid")?.trim() ||
    readAdAttribution().fbclid
  if (fbclid) return { fbp, fbc: fbcFromFbclid(fbclid) }
  return { fbp }
}

const CAPI_BROWSER_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Contact",
])

export function shouldSendBrowserCapi(eventName: string): boolean {
  return CAPI_BROWSER_EVENTS.has(eventName)
}

/** Pixel + CAPI share event_id. Purchase stays webhook-only; Lead stays subscribe-only. */
export function sendBrowserCapiEvent(opts: {
  event_name: string
  event_id: string
  custom_data?: Record<string, unknown>
}): void {
  if (typeof window === "undefined") return
  if (!shouldSendBrowserCapi(opts.event_name)) return

  const { fbp, fbc } = readMetaClickIds()
  const payload = {
    event_name: opts.event_name,
    event_id: opts.event_id,
    event_source_url: window.location.href,
    custom_data: opts.custom_data,
    fbp,
    fbc,
  }

  try {
    void fetch("/api/meta/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
  } catch {
    // Pixel still fires; CAPI is best-effort.
  }
}
