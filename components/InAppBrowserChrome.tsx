"use client"

import { useEffect } from "react"
import {
  applyInAppDomFlags,
  isFacebookInAppFromDom,
  isInAppBrowser,
  lockInAppViewport,
} from "@/lib/in-app-browser"

const VV_BOTTOM = "--iab-vv-bottom"
const VV_TOP = "--iab-vv-top"

function chromeMinPx(root: HTMLElement): number {
  const kind = root.dataset.iab
  if (kind === "ig") return 48
  if (kind === "tt") return 24
  return 8
}

function syncVisualViewportInsets() {
  const root = document.documentElement
  const min = chromeMinPx(root)
  const vv = window.visualViewport
  if (!vv) {
    root.style.setProperty(VV_BOTTOM, "0px")
    root.style.setProperty(VV_TOP, "0px")
    root.style.setProperty("--iab-bottom-chrome", `${min}px`)
    return
  }
  const raw = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop))
  const top = Math.max(0, Math.round(vv.offsetTop))
  // Instagram often reports a huge overlap (keyboard / wrong innerHeight).
  // Cap to real in-app chrome so the page does not grow a giant empty gap.
  const bottom = Math.min(raw, 80)
  root.style.setProperty(VV_BOTTOM, `${bottom}px`)
  root.style.setProperty(VV_TOP, `${Math.min(top, 80)}px`)
  root.style.setProperty("--iab-bottom-chrome", `${Math.max(min, bottom)}px`)
}

/**
 * Facebook/Instagram (and other) in-app browsers overlay their own chrome
 * and often report 0 safe-area insets. visualViewport is the real visible box.
 * WhatsApp links with target=_blank often open a blank tab in those WebViews.
 */
export default function InAppBrowserChrome() {
  useEffect(() => {
    applyInAppDomFlags()
    const root = document.documentElement
    if (document.querySelector("[data-checkout-lander]")) {
      root.dataset.lander = "checkout"
      root.dataset.announcement = "hidden"
    } else if (document.querySelector("[data-ads-lander]")) {
      root.dataset.lander = "ads"
      root.dataset.announcement = "hidden"
    }
    if (!isFacebookInAppFromDom() && !isInAppBrowser()) return
    lockInAppViewport()

    syncVisualViewportInsets()

    const vv = window.visualViewport
    vv?.addEventListener("resize", syncVisualViewportInsets)
    vv?.addEventListener("scroll", syncVisualViewportInsets)
    window.addEventListener("resize", syncVisualViewportInsets)
    window.addEventListener("orientationchange", syncVisualViewportInsets)

    const onWhatsAppClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const el = (event.target as Element | null)?.closest?.("a[href]")
      if (!(el instanceof HTMLAnchorElement)) return
      const href = el.getAttribute("href") || ""
      if (!/wa\.me\/|whatsapp\.com\//i.test(href)) return
      if (!el.target || el.target === "_self") return
      event.preventDefault()
      window.location.assign(el.href)
    }

    document.addEventListener("click", onWhatsAppClick, true)

    return () => {
      vv?.removeEventListener("resize", syncVisualViewportInsets)
      vv?.removeEventListener("scroll", syncVisualViewportInsets)
      window.removeEventListener("resize", syncVisualViewportInsets)
      window.removeEventListener("orientationchange", syncVisualViewportInsets)
      document.removeEventListener("click", onWhatsAppClick, true)
    }
  }, [])

  return null
}
