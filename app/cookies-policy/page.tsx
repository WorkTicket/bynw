import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import { createPageMetadata } from "@/lib/seo"

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
              Esta Política de Cookies explica qué son las cookies y cómo las
              utilizamos en Manos Creativas Bynmw. Al continuar navegando,
              aceptas el uso de cookies de acuerdo con esta política.
            </p>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                ¿Qué son las cookies?
              </h2>
              <p className="mt-2">
                Las cookies son pequeños archivos de texto que se almacenan en tu
                dispositivo cuando visitas un sitio web. Se utilizan ampliamente para
                hacer que los sitios web funcionen de manera más eficiente y
                proporcionar información a los propietarios del sitio.
              </p>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Cookies que utilizamos
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Analítica — Google Analytics (GA4):</strong> mide
                  visitas, páginas vistas y eventos (por ejemplo, clics en compra).
                </li>
                <li>
                  <strong>Publicidad — Meta Pixel (Facebook):</strong> mide
                  PageView, ViewContent, InitiateCheckout, Lead y Contact para
                  optimizar anuncios. Hotmart también puede usar el mismo pixel
                  para el evento Purchase tras el pago.
                </li>
                <li>
                  <strong>Almacenamiento de sesión:</strong> parámetros UTM y{" "}
                  <code className="text-sm">fbclid</code> en sessionStorage para
                  atribuir el origen del tráfico al checkout de Hotmart.
                </li>
              </ul>
            </div>

            <div className="border-t border-rose-100/50 pt-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                Control de cookies
              </h2>
              <p className="mt-2">
                Puedes controlar o eliminar las cookies desde la configuración de
                tu navegador. Si bloqueas cookies de terceros, algunas funciones
                de medición y publicidad dejarán de funcionar correctamente. Más
                información en{" "}
                <a href="/privacy-policy" className="text-rose-600 hover:underline">
                  nuestra política de privacidad
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
