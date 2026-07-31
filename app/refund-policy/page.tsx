import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Política de Reembolso",
  description:
    "Política de reembolso de Manos Creativas Bynmw. Garantía de 7 días en colecciones de patrones de crochet o ganchillo en PDF.",
  path: "/refund-policy",
})

export default function RefundPolicyPage() {
  return (
    <section className="page-hero pb-20">
      <div className="section relative z-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Política de Reembolso
            </h1>
            <p className="mt-3 text-sm text-muted">Última actualización: Julio 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="prose-policy mt-12">
            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Garantía de 7 días
              </h2>
              <p className="mt-2">
                En Manos Creativas Bynmw queremos que te vaya bien con la compra.
                Si los patrones no te convencen, tienes{" "}
                <strong>7 días</strong> desde la fecha de compra para pedir la
                devolución completa.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Condiciones del reembolso
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  El reembolso se solicitará dentro de los 7 días
                  posteriores a la compra.
                </li>
                <li>
                  Al ser productos digitales, el reembolso se procesará una vez
                  confirmada la solicitud a través de Hotmart.
                </li>
                <li>
                  El importe se devolverá a través del mismo método de pago
                  utilizado en la compra.
                </li>
              </ul>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Cómo solicitar un reembolso
              </h2>
              <p className="mt-2">
                Para solicitar un reembolso, escríbenos a través de WhatsApp al
                <a
                  href="https://wa.me/573008504709"
                  className="text-rose-600 hover:underline"
                >
                  {" "}
                  +57 300 850 4709
                </a>{" "}
                indicando tu nombre, el correo usado en la compra y el motivo de
                la solicitud. Te guiaremos en el proceso.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Procesamiento del reembolso
              </h2>
              <p className="mt-2">
                Una vez aprobada la solicitud, el reembolso se procesará en un
                plazo de 5 a 10 días hábiles, dependiendo del método de pago
                y de la entidad bancaria.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
