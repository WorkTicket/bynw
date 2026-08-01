import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_TRADE_NAME,
} from "@/lib/business"

export const metadata: Metadata = createPageMetadata({
  title: "Política de Cookies",
  description:
    "Política de cookies de Manos Creativas Bynmw. Cookies que usamos y cómo gestionarlas.",
  path: "/cookies-policy",
})

export default function CookiesPolicyPage() {
  return (
    <section className="page-hero pb-20">
      <div className="section relative z-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Política de Cookies
            </h1>
            <p className="mt-3 text-sm text-muted">Última actualización: Julio 2026</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="prose-policy mt-12">
            <p>
              Esta Política de Cookies explica qué cookies y tecnologías similares
              usa {LEGAL_TRADE_NAME}. Las cookies no esenciales (analítica y
              publicidad) solo se activan si das tu consentimiento explícito
              mediante el banner de cookies. Puedes cambiar tu elección en
              cualquier momento con el botón «Cookies» de la esquina inferior.
            </p>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                ¿Qué son las cookies?
              </h2>
              <p className="mt-2">
                Las cookies son pequeños archivos de texto que se almacenan en tu
                dispositivo cuando visitas un sitio web. Se utilizan para hacer
                que el sitio funcione, recordar preferencias y —solo con tu
                permiso— medir visitas y optimizar anuncios.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Cookies y tecnologías que utilizamos
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Necesarias:</strong> preferencia de consentimiento
                  (`cookie_consent_v1` en localStorage, conservación ~12 meses) y
                  funcionamiento básico del sitio. No requieren consentimiento.
                </li>
                <li>
                  <strong>Analítica — Google Analytics (GA4):</strong> mide
                  visitas, páginas vistas y eventos. Solo con consentimiento de
                  analítica. Conservación típica de cookies GA: hasta 24 meses
                  (según configuración de Google).
                </li>
                <li>
                  <strong>Publicidad — Meta Pixel (Facebook):</strong> mide
                  PageView, ViewContent, InitiateCheckout, Lead, Contact y
                  Purchase (también vía Hotmart y Conversions API) para optimizar
                  anuncios. Solo con consentimiento de publicidad. Cookies Meta
                  habituales: hasta 90 días (`_fbp` / `_fbc`).
                </li>
                <li>
                  <strong>Sesión de atribución:</strong> parámetros UTM y{" "}
                  <code className="text-sm">fbclid</code> en sessionStorage
                  (caduca al cerrar la pestaña) para atribuir el origen del
                  tráfico al checkout de Hotmart. No es una cookie de terceros.
                </li>
              </ul>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Cómo gestionar tu consentimiento
              </h2>
              <p className="mt-2">
                Usa el banner al llegar al sitio (Aceptar todas / Rechazar /
                Preferencias) o el botón «Cookies» en cualquier momento. También
                puedes bloquear cookies de terceros desde tu navegador. Si
                rechazas analítica o publicidad, esas herramientas no se cargan.
                Más información en{" "}
                <a href="/privacy-policy" className="text-rose-600 hover:underline">
                  nuestra política de privacidad
                </a>
                . Contacto:{" "}
                <a
                  href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                  className="text-rose-600 hover:underline"
                >
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
