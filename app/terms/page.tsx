import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de Manos Creativas Bynmw. Políticas de uso del sitio y compra de patrones de crochet en PDF.",
  path: "/terms",
})

export default function TermsPage() {
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
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                2. Productos digitales
              </h2>
              <p className="mt-2">
                Todos los productos ofrecidos en Manos Creativas Bynmw son
                archivos digitales en formato PDF. Una vez realizada la compra,
                recibirás un enlace de descarga por correo electrónico a través
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
                aplicables cuando corresponda. Los pagos se procesan a través de
                Hotmart, una plataforma segura de pagos. No almacenamos
                información de tarjetas de crédito ni datos bancarios en nuestro
                sitio.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                4. Propiedad intelectual
              </h2>
              <p className="mt-2">
                Todo el contenido de este sitio web, incluyendo pero no limitado
                a patrones, imágenes, textos y logotipos, es propiedad
                exclusiva de Manos Creativas Bynmw y está protegido por las
                leyes de propiedad intelectual. Las referencias a personajes o
                marcas de terceros se usan únicamente con fines descriptivos de
                los patrones artesanales.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                5. Limitación de responsabilidad
              </h2>
              <p className="mt-2">
                Manos Creativas Bynmw no se hace responsable de los resultados
                obtenidos al utilizar nuestros patrones. La técnica de crochet
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
                <a href="mailto:bynw808@gmail.com" className="text-rose-600 hover:underline">
                  bynw808@gmail.com
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
