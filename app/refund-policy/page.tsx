import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

const REFUND_URL = "https://bynmwcreative.com/refund-policy"

export const metadata: Metadata = {
  title: "Política de Reembolso",
  description:
    "Política de reembolso de Manos Creativas Bynmw. Garantía de 7 días en todas nuestras colecciones de patrones de crochet en PDF.",
  alternates: {
    canonical: REFUND_URL,
    languages: {
      "es-MX": REFUND_URL,
      "es-ES": REFUND_URL,
      "x-default": REFUND_URL,
    },
  },
  openGraph: {
    title: "Política de Reembolso | Manos Creativas Bynmw",
    description:
      "Garantía de 7 días en todas nuestras colecciones de patrones de crochet.",
    url: REFUND_URL,
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function RefundPolicyPage() {
  return (
    <section className="relative overflow-hidden bg-rose-50 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-rose-100/20 blur-3xl" />
      </div>

      <div className="section relative z-10 max-w-3xl">
        <ScrollReveal>
          <div className="text-center">
            <span className="badge">Legal</span>
            <h1 className="mt-4 font-display text-5xl font-bold text-ink sm:text-6xl lg:text-7xl">
              Pol&iacute;tica de Reembolso
            </h1>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 space-y-6 text-ink/60 leading-relaxed">
            <div className="rounded-2xl2 border border-rose-200 bg-rose-50 p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-rose-800">
                Garant&iacute;a de 7 D&iacute;as
              </h2>
              <p className="mt-2 text-rose-700">
                En Manos Creativas Bynmw queremos que te vaya bien con la compra.
                Si los patrones no te convencen, tienes{" "}
                <strong>7 d&iacute;as</strong>
                {" "}desde la fecha de compra para pedir la devoluci&oacute;n completa.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Condiciones del reembolso
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  El reembolso se solicitar&aacute; dentro de los 7 d&iacute;as
                  posteriores a la compra.
                </li>
                <li>
                  Al ser productos digitales, el reembolso se procesar&aacute; una vez
                  confirmada la solicitud a trav&eacute;s de Hotmart.
                </li>
                <li>
                  El importe se devolver&aacute; a trav&eacute;s del mismo m&eacute;todo de pago
                  utilizado en la compra.
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                C&oacute;mo solicitar un reembolso
              </h2>
              <p className="mt-2">
                Para solicitar un reembolso, escr&iacute;benos a trav&eacute;s de WhatsApp al
                <a
                  href="https://wa.me/573008504709"
                  className="text-wine-600 hover:underline"
                >
                  {" "}
                  +57 300 850 4709
                </a>{" "}
                indicando tu nombre y el motivo de la solicitud. Te guiaremos en
                el proceso.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Procesamiento del reembolso
              </h2>
              <p className="mt-2">
                Una vez aprobada la solicitud, el reembolso se procesar&aacute; en un
                plazo de 5 a 10 d&iacute;as h&aacute;biles, dependiendo del m&eacute;todo de pago
                y de la entidad bancaria.
              </p>
            </div>

            <div className="rounded-2xl2 border border-wine-200 bg-wine-50 p-5 text-sm text-wine-800">
              <strong>Nota legal:</strong> Esta pol&iacute;tica es un punto de
              partida y debe ser revisada por un abogado antes del lanzamiento
              oficial del sitio.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
