import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTROLLER_NAME,
  LEGAL_COUNTRY,
  LEGAL_PAYMENT_PROCESSOR,
  LEGAL_TRADE_NAME,
  getLegalAddress,
} from "@/lib/business"
import { formatPromoEndLabel, isPromoActive } from "@/lib/offer"

export const metadata: Metadata = createPageMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de Manos Creativas Bynmw. Políticas de uso del sitio y compra de patrones de crochet o ganchillo en PDF.",
  path: "/terms",
})

export default function TermsPage() {
  const address = getLegalAddress()
  const promoActive = isPromoActive()
  const promoEnd = formatPromoEndLabel()

  return (
    <section className="page-hero pb-20">
      <div className="section relative z-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Términos y Condiciones
            </h1>
            <p className="mt-3 text-sm text-muted">Última actualización: Julio 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="prose-policy mt-12">
            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                1. Aceptación de los términos
              </h2>
              <p className="mt-2">
                Al acceder y utilizar este sitio web, aceptas cumplir con estos
                términos y condiciones. Si no estás de acuerdo con alguna
                parte de estos términos, no debes utilizar nuestro sitio.
                El responsable comercial es {LEGAL_CONTROLLER_NAME}, que opera
                como {LEGAL_TRADE_NAME} ({LEGAL_COUNTRY}
                {address ? `; ${address}` : ""}).
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                2. Productos digitales
              </h2>
              <p className="mt-2">
                Todos los productos ofrecidos en {LEGAL_TRADE_NAME} son
                archivos digitales en formato PDF. Una vez realizada la compra,
                recibirás un enlace de descarga por correo electrónico (e-mail) a través
                de Hotmart.
              </p>
              <p className="mt-2">
                Los patrones digitales están protegidos por derechos de autor.
                No está permitida la redistribución, reventa o
                reproducción masiva de los contenidos. Puedes tejer y vender
                las piezas terminadas que elabores a partir de los patrones.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                3. Precios y pagos
              </h2>
              <p className="mt-2">
                Los precios se muestran en euros (€) e incluyen los impuestos
                aplicables cuando corresponda. El precio tachado es el precio de
                referencia del catálogo antes de la promoción vigente
                {promoActive
                  ? ` (válida hasta el ${promoEnd}, hora de Madrid)`
                  : ""}
                . Los pagos se procesan a través de {LEGAL_PAYMENT_PROCESSOR}.
                No almacenamos información de tarjetas de crédito ni datos
                bancarios en nuestro sitio.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                4. Propiedad intelectual
              </h2>
              <p className="mt-2">
                Todo el contenido de este sitio web, incluyendo pero no limitado
                a patrones, imágenes, textos y logotipos, es propiedad
                exclusiva de {LEGAL_TRADE_NAME} y está protegido por las
                leyes de propiedad intelectual. Los nombres de las colecciones
                son descriptivos genéricos (por ejemplo, «princesas de cuento»,
                «flores eternas»). No reivindicamos afiliación, patrocinio ni
                licencia de marcas de terceros.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                5. Limitación de responsabilidad
              </h2>
              <p className="mt-2">
                {LEGAL_TRADE_NAME} no se hace responsable de los resultados
                obtenidos al utilizar nuestros patrones. La técnica de crochet o ganchillo
                depende de la habilidad individual de cada artesana. El acceso
                a los archivos digitales es de por vida una vez confirmada la
                compra, sujeto a la disponibilidad del servicio de Hotmart.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                6. Modificaciones
              </h2>
              <p className="mt-2">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Los cambios entrarán en vigor inmediatamente
                después de su publicación en el sitio.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">7. Contacto</h2>
              <p className="mt-2">
                Para cualquier consulta sobre estos términos, puedes
                contactarnos a través de WhatsApp al{" "}
                <a
                  href="https://wa.me/573008504709"
                  className="text-rose-600 hover:underline"
                >
                  +57 300 850 4709
                </a>{" "}
                o por correo a{" "}
                <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-rose-600 hover:underline">
                  {LEGAL_CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
