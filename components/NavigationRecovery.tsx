"use client"

import { useEffect } from "react"

export const RELOAD_KEY = "bynmw-nav-error-reload"
export const RECOVERABLE_RE =
  /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Loading CSS chunk|Minified React error|Hydration|hydration|Text content does not match|Application error|client-side exception/i

export function isCheckoutLocation(): boolean {
  try {
    return window.location.pathname.startsWith("/checkout")
  } catch {
    return false
  }
}

/**
 * One recovery reload. Checkout stays on /checkout — never dump a buyer to /.
 * Returns true when navigation started; false when the error UI should show.
 */
export function reloadOnce(): boolean {
  const checkout = isCheckoutLocation()
  try {
    if (sessionStorage.getItem(RELOAD_KEY) === "1") {
      sessionStorage.removeItem(RELOAD_KEY)
      if (checkout) return false
      window.location.replace("/")
      return true
    }
    sessionStorage.setItem(RELOAD_KEY, "1")
  } catch {
    if (checkout) {
      window.location.reload()
      return true
    }
    window.location.replace("/")
    return true
  }
  window.location.reload()
  return true
}

function isRecoverableMessage(msg: string) {
  return RECOVERABLE_RE.test(msg)
}

/**
 * Clears reload guards after a healthy mount and catches chunk/hydration
 * failures before React error boundaries flash the error screen.
 */
export default function NavigationRecovery() {
  useEffect(() => {
    try {
      sessionStorage.removeItem(RELOAD_KEY)
    } catch {
      // Private Safari can block sessionStorage.
    }

    const onError = (event: ErrorEvent) => {
      const msg = `${event.message || ""} ${event.error?.message || ""} ${event.error?.name || ""}`
      if (!isRecoverableMessage(msg)) return
      event.preventDefault()
      reloadOnce()
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const msg =
        typeof reason === "string"
          ? reason
          : `${reason?.name || ""} ${reason?.message || ""}`
      if (!isRecoverableMessage(msg)) return
      event.preventDefault()
      reloadOnce()
    }

    window.addEventListener("error", onError)
    window.addEventListener("unhandledrejection", onRejection)
    return () => {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onRejection)
    }
  }, [])

  return null
}
