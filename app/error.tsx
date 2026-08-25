"use client"

import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          <PrimaryCTA type="button" onClick={reset}>
            Reintentar
          </PrimaryCTA>
          <SecondaryCTA href="/">Volver al inicio</SecondaryCTA>
        </div>
      </div>
    </section>
  )
}
