"use client"

import { useEffect } from "react"
import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"

const RELOAD_KEY = "bynmw-nav-error-reload"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Soft-nav / stale-chunk failures: one hard reload of the same URL.
    // Any client render crash during routing recovers without losing the customer.
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return
      sessionStorage.setItem(RELOAD_KEY, "1")
      window.location.reload()
    } catch {
      // Private Safari can block sessionStorage — fall through to UI.
    }
  }, [error])

  return (
    <section className="page-hero flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="relative z-10 max-w-lg">
        <p className="font-script text-2xl text-rose-500">Manos Creativas Bynmw</p>
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Algo no ha ido bien
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Ha ocurrido un error al cargar la página. Puedes intentarlo de nuevo o
          volver al inicio.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <PrimaryCTA
            type="button"
            onClick={() => {
              try {
                sessionStorage.removeItem(RELOAD_KEY)
              } catch {
                // ignore
              }
              try {
                window.location.reload()
              } catch {
                reset()
              }
            }}
          >
            Reintentar
          </PrimaryCTA>
          <SecondaryCTA href="/">Volver al inicio</SecondaryCTA>
        </div>
      </div>
    </section>
  )
}
