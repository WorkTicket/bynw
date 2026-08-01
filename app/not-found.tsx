import type { Metadata } from "next"
import PrimaryCTA from "@/components/PrimaryCTA"
import SecondaryCTA from "@/components/SecondaryCTA"

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <section className="page-hero flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="relative z-10 max-w-lg">
        <p className="font-script text-2xl text-rose-500">Manos Creativas Bynmw</p>
        <p className="mt-6 font-display text-8xl font-semibold text-ink/10">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          La página que buscas no existe o ha sido movida. Puedes volver al inicio
          o explorar nuestras colecciones de patrones.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <PrimaryCTA href="/">Volver al inicio</PrimaryCTA>
          <SecondaryCTA href="/shop">Ver colecciones</SecondaryCTA>
        </div>
      </div>
    </section>
  )
}
