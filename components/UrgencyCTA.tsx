import Link from "next/link"
import PetiteOrnament from "@/components/PetiteOrnament"

export default function UrgencyCTA() {
  return (
    <section className="section-premium-dark section-padding">
      <div className="section relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-[2rem] leading-none text-rose-400 sm:text-[2.25rem]">
            Tu colección te espera
          </p>

          <PetiteOrnament className="mt-5" tone="mid" />

          <h2 className="mt-6 font-display text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:mt-7 sm:text-5xl lg:text-[3.35rem]">
            Elige hoy.{" "}
            <span className="gradient-text-rose italic">Teje esta semana</span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-ink/55 sm:text-lg">
            Descarga al momento, acceso de por vida y garantía de 7 días.
            Empieza tu próximo proyecto sin riesgo.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-11">
            <Link
              href="/shop/princesas-disney"
              className="btn-primary inline-flex min-h-[3.15rem] px-10 text-sm sm:px-14 sm:py-5"
            >
              Comprar Princesas
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-ink/50 transition-colors hover:text-rose-600"
            >
              Ver todas las colecciones
            </Link>
          </div>

          <p className="mt-7 text-[11px] tracking-[0.08em] text-ink/40">
            Garantía de 7 días
            <span className="meta-sep" aria-hidden="true">
              ✦
            </span>
            Soporte por WhatsApp
          </p>
        </div>
      </div>
    </section>
  )
}
