import HotmartBuyButton from "@/components/HotmartBuyButton"
import PaymentLogos from "@/components/PaymentLogos"
import PetiteOrnament from "@/components/PetiteOrnament"
import ScrollReveal from "@/components/ScrollReveal"

type BuyProps = {
  href: string
  contentId: string
  contentName: string
  price: string
}

type Props = {
  shortTitle: string
  price: string
  buyProps: BuyProps
  discount?: number
}

const trust = [
  { label: "Acceso inmediato", detail: "PDF al correo" },
  { label: "Garantía 7 días", detail: "Sin riesgo" },
  { label: "Pago seguro", detail: "Socio Hotmart" },
]

export default function ProductFinalCTA({
  shortTitle,
  price,
  buyProps,
  discount = 0,
}: Props) {
  return (
    <section className="section-premium-dark section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 50% 0%, rgba(232, 180, 184, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 12% 85%, rgba(240, 214, 210, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 35% 30% at 88% 70%, rgba(201, 107, 120, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <div className="section relative">
        <ScrollReveal variant="scale">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-script text-[2rem] leading-[1.1] text-rose-400 sm:text-[2.35rem]">
              Manos Creativas Bynmw
            </p>

            <PetiteOrnament className="mt-5" tone="mid" />

            <h2 className="mt-6 font-display text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-7 sm:text-[2.75rem] lg:text-[3.05rem]">
              ¿Lista para{" "}
              <span className="gradient-text-rose italic">empezar</span>?
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/55 sm:mt-6 sm:text-base">
              {shortTitle}
            </p>
            <p className="mx-auto mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {price}
              {discount >= 40 ? (
                <span className="ml-2 align-middle text-base font-medium text-rose-600 sm:text-lg">
                  −{discount}%
                </span>
              ) : null}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Acceso inmediato a la colección y a los bonos incluidos.
            </p>

            <div className="mt-9 sm:mt-10">
              <HotmartBuyButton
                {...buyProps}
                size="lg"
                className="mx-auto max-w-sm"
              >
                Comprar ahora
              </HotmartBuyButton>
            </div>

            <ul className="mx-auto mt-9 flex max-w-lg flex-wrap items-stretch justify-center gap-x-0 gap-y-4 sm:mt-10 sm:flex-nowrap">
              {trust.map((item, i) => (
                <li
                  key={item.label}
                  className="relative flex min-w-[7.5rem] flex-1 flex-col items-center px-3 sm:min-w-0"
                >
                  {i > 0 && (
                    <span
                      className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-rose-300/50 to-transparent sm:block"
                      aria-hidden
                    />
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-600">
                    {item.label}
                  </span>
                  <span className="mt-1 text-xs text-muted">{item.detail}</span>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-3 border-t border-rose-200/40 pt-7 sm:mt-9">
              <PaymentLogos className="h-[1.35rem] opacity-80" />
              <p className="text-[11px] tracking-wide text-muted/70">
                Pago 100% seguro · Socio oficial Hotmart
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
