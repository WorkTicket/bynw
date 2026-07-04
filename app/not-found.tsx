import Link from "next/link"

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-rose-50 px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-wine-100/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="font-display text-8xl font-semibold gradient-text">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          P&aacute;gina no encontrada
        </h1>
        <p className="mt-3 text-muted leading-relaxed">
          La p&aacute;gina que buscas no existe o ha sido movida. Puedes volver al
          inicio o explorar nuestras colecciones de patrones.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary px-8 py-4">
            Volver al inicio
          </Link>
          <Link href="/shop" className="btn-secondary px-8 py-4">
            Ver colecciones
          </Link>
        </div>
      </div>
    </section>
  )
}
