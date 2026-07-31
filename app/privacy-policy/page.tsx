import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Manos Creativas Bynmw. Cómo recopilamos, usamos y protegemos tus datos personales.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <section className="page-hero pb-20">
      <div className="section relative z-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Política de Privacidad
            </h1>
            <p className="mt-3 text-sm text-muted">Última actualización: Julio 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="prose-policy mt-12">
            <p>
              En Manos Creativas Bynmw respetamos tu privacidad. Esta política
              explica qué datos recopilamos, cómo los usamos y qué
              derechos tienes al utilizar nuestro sitio web.
            </p>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                1. Responsable del tratamiento
              </h2>
              <p className="mt-2">
                El responsable del tratamiento de tus datos es Manos Creativas Bynmw.
                Puedes contactarnos en{" "}
                <a href="mailto:bynw808@gmail.com" className="text-rose-600 hover:underline">
                  bynw808@gmail.com
                </a>{" "}
                o por WhatsApp al +57 300 850 4709.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                2. Datos que recopilamos
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Descarga de regalo gratuito:</strong> nombre y correo
                  electrónico (formulario de lead / Mailchimp).
                </li>
                <li>
                  <strong>Compras:</strong> los datos de pago los gestiona Hotmart de
                  forma segura; no almacenamos datos bancarios en nuestro sitio.
                </li>
                <li>
                  <strong>Reseñas:</strong> nombre, ubicación opcional, valoración,
                  texto y foto opcional que envíes para publicar en el sitio.
                </li>
                <li>
                  <strong>Navegación y publicidad:</strong> cookies y tecnologías
                  similares de Google Analytics y Meta (Facebook) Pixel para
                  medir visitas y optimizar anuncios; parámetros UTM /{" "}
                  <code className="text-sm">fbclid</code> en la sesión del
                  navegador para atribuir compras en Hotmart.
                </li>
              </ul>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                3. Finalidad del tratamiento
              </h2>
              <p className="mt-2">
                Utilizamos tus datos para enviarte el patrón gratuito, gestionar
                el boletín, publicar reseñas que envíes, medir el rendimiento del
                sitio y de los anuncios, personalizar precios según país, mejorar
                nuestros servicios y cumplir obligaciones legales derivadas de las
                compras.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                4. Base legal y conservación
              </h2>
              <p className="mt-2">
                Tratamos tus datos con tu consentimiento al enviar un formulario,
                suscribirte o publicar una reseña; por interés legítimo para
                operar el sitio, prevenir abusos y medir audiencias; y para
                cumplir contratos de compra a través de Hotmart. Conservamos los
                datos mientras sea necesario para la finalidad indicada o mientras
                no solicites su supresión.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                5. Tus derechos
              </h2>
              <p className="mt-2">
                Puedes acceder, rectificar, suprimir u oponerte al tratamiento de tus
                datos, así como solicitar la limitación o portabilidad
                escribiéndonos a{" "}
                <a href="mailto:bynw808@gmail.com" className="text-rose-600 hover:underline">
                  bynw808@gmail.com
                </a>
                . También puedes darte de baja del boletín en cualquier
                momento desde el enlace incluido en nuestros correos electrónicos.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                6. Terceros y seguridad
              </h2>
              <p className="mt-2">
                Compartimos datos con proveedores que nos ayudan a operar el
                sitio: Mailchimp (boletín), Hotmart (pagos y entrega), Google
                Analytics, Meta Platforms (pixel publicitario) y Cloudflare
                (alojamiento y CDN). Cada uno aplica sus propias políticas de
                privacidad. Aplicamos medidas razonables para proteger tu
                información.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
