import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"
import {
  getLegalAddress,
  getLegalIdentityLines,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_PHONE,
  LEGAL_CONTROLLER_NAME,
  LEGAL_COUNTRY,
  LEGAL_HOSTING,
  LEGAL_PAYMENT_PROCESSOR,
  LEGAL_TRADE_NAME,
} from "@/lib/business"

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Manos Creativas Bynmw. Cómo recopilamos, usamos y protegemos tus datos personales.",
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  const address = getLegalAddress()
  const identity = getLegalIdentityLines()

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
              En {LEGAL_TRADE_NAME} respetamos tu privacidad. Esta política
              explica qué datos recopilamos, cómo los usamos y qué derechos
              tienes al utilizar nuestro sitio web.
            </p>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                1. Responsable del tratamiento
              </h2>
              <p className="mt-2">
                El responsable del tratamiento es {LEGAL_CONTROLLER_NAME}, que
                opera bajo el nombre comercial {LEGAL_TRADE_NAME} ({LEGAL_COUNTRY}
                ).
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                {identity.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {!address ? (
                <p className="mt-3 text-sm text-muted">
                  Para solicitar el domicilio postal completo con fines legales,
                  escribe a{" "}
                  <a
                    href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                    className="text-rose-600 hover:underline"
                  >
                    {LEGAL_CONTACT_EMAIL}
                  </a>
                  .
                </p>
              ) : null}
              <p className="mt-2">
                WhatsApp: {LEGAL_CONTACT_PHONE}.
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
                  <strong>Compras:</strong> los datos de pago los gestiona{" "}
                  {LEGAL_PAYMENT_PROCESSOR}; no almacenamos datos bancarios en
                  nuestro sitio.
                </li>
                <li>
                  <strong>Reseñas:</strong> nombre, ubicación opcional, valoración,
                  texto y foto opcional que envíes para publicar en el sitio.
                </li>
                <li>
                  <strong>Navegación y publicidad (solo con consentimiento):</strong>{" "}
                  cookies de Google Analytics y Meta Pixel; parámetros UTM /{" "}
                  <code className="text-sm">fbclid</code> en sessionStorage para
                  atribuir compras en Hotmart; eventos de conversión enviados a
                  Meta vía Pixel y Conversions API.
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
                sitio y de los anuncios (con tu consentimiento), mejorar
                nuestros servicios y cumplir obligaciones derivadas de las
                compras.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                4. Base legal y conservación
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Consentimiento:</strong> formularios, boletín, reseñas y
                  cookies de analítica/publicidad.
                </li>
                <li>
                  <strong>Ejecución de contrato:</strong> entrega de productos
                  digitales y soporte de compra vía Hotmart.
                </li>
                <li>
                  <strong>Interés legítimo:</strong> seguridad del sitio,
                  prevención de abusos y operación técnica esencial (no incluye
                  publicidad comportamental).
                </li>
              </ul>
              <p className="mt-2">
                Conservamos los datos mientras sea necesario para la finalidad
                indicada o mientras no solicites su supresión, salvo plazos
                legales de facturación. Las cookies se conservan según los plazos
                descritos en la{" "}
                <a href="/cookies-policy" className="text-rose-600 hover:underline">
                  política de cookies
                </a>
                .
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                5. Tus derechos
              </h2>
              <p className="mt-2">
                Puedes acceder, rectificar, suprimir u oponerte al tratamiento de
                tus datos, así como solicitar la limitación o portabilidad,
                escribiéndonos a{" "}
                <a
                  href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                  className="text-rose-600 hover:underline"
                >
                  {LEGAL_CONTACT_EMAIL}
                </a>
                . También puedes retirar el consentimiento de cookies en
                cualquier momento y darte de baja del boletín desde el enlace de
                nuestros correos.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                6. Terceros y seguridad
              </h2>
              <p className="mt-2">
                Compartimos datos con proveedores que nos ayudan a operar el
                sitio: Mailchimp (boletín), {LEGAL_PAYMENT_PROCESSOR} (pagos y
                entrega), Google Analytics, Meta Platforms (pixel y Conversions
                API, solo con consentimiento) y {LEGAL_HOSTING} (alojamiento y
                CDN). Cada uno aplica sus propias políticas. Aplicamos medidas
                razonables para proteger tu información.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                7. Legislación aplicable
              </h2>
              <p className="mt-2">
                Esta política se interpreta conforme a la normativa aplicable de
                protección de datos y comercio electrónico en {LEGAL_COUNTRY} y,
                cuando corresponda, al Reglamento (UE) 2016/679 (RGPD) para
                visitantes en el Espacio Económico Europeo.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
