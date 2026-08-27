"use client"

import { useEffect } from "react"

const RELOAD_KEY = "bynmw-nav-error-reload"

/**
 * Clears one-shot error-reload guards after a healthy page mount, and
 * recovers from stale JS chunks without showing the error screen.
 */
export default function NavigationRecovery() {
  useEffect(() => {
    try {
      sessionStorage.removeItem(RELOAD_KEY)
    } catch {
      // Private Safari can block sessionStorage.
    }

    const reloadOnce = () => {
      try {
        if (sessionStorage.getItem(RELOAD_KEY) === "1") return
        sessionStorage.setItem(RELOAD_KEY, "1")
      } catch {
        // Still attempt reload if storage is blocked.
      }
      window.location.reload()
    }

    const onError = (event: ErrorEvent) => {
      const msg = `${event.message || ""} ${event.error?.message || ""} ${event.error?.name || ""}`
      if (
        /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Loading CSS chunk/i.test(
          msg
        )
      ) {
        event.preventDefault()
        reloadOnce()
      }
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const msg =
        typeof reason === "string"
          ? reason
          : `${reason?.name || ""} ${reason?.message || ""}`
      if (
        /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Loading CSS chunk/i.test(
          msg
        )
      ) {
        event.preventDefault()
        reloadOnce()
      }
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
