import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Política de Cookies",
}

export default function CookiesPolicyPage() {
  return (
    <section className="relative overflow-hidden bg-rose-50 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-wine-200/10 blur-3xl" />
      </div>

      <div className="section relative z-10 max-w-3xl">
        <ScrollReveal>
          <div className="text-center">
            <span className="badge">Legal</span>
            <h1 className="mt-4 font-display text-5xl font-bold text-ink sm:text-6xl lg:text-7xl">
              Pol&iacute;tica de Cookies
            </h1>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 space-y-6 text-ink/60 leading-relaxed">
            <p>
              Esta Pol&iacute;tica de Cookies explica qu&eacute; son las cookies y c&oacute;mo las
              utilizamos en Manos Creativas Bynmw. Al utilizar nuestro sitio web,
              aceptas el uso de cookies de acuerdo con esta pol&iacute;tica.
            </p>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                &iquest;Qu&eacute; son las cookies?
              </h2>
              <p className="mt-2">
                Las cookies son peque&ntilde;os archivos de texto que se almacenan en tu
                dispositivo cuando visitas un sitio web. Se utilizan ampliamente para
                hacer que los sitios web funcionen de manera m&aacute;s eficiente y
                proporcionar informaci&oacute;n a los propietarios del sitio.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                C&oacute;mo utilizamos las cookies
              </h2>
              <p className="mt-2">
                Usamos cookies para que la web funcione bien y para entender
                qué páginas se visitan más. No recogemos datos personales sin
                tu permiso.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Tipos de cookies que utilizamos
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookies esenciales:</strong> Necesarias para el
                  funcionamiento b&aacute;sico del sitio.
                </li>
                <li>
                  <strong>Cookies de rendimiento:</strong> Nos ayudan a entender
                  c&oacute;mo los visitantes interact&uacute;an con el sitio.
                </li>
                <li>
                  <strong>Cookies de funcionalidad:</strong> Permiten recordar
                  tus preferencias.
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Control de cookies
              </h2>
              <p className="mt-2">
                Puedes controlar y/o eliminar las cookies seg&uacute;n tu voluntad.
                Puedes eliminar todas las cookies que ya est&aacute;n en tu
                dispositivo y configurar la mayor&iacute;a de los navegadores para
                evitar que se coloquen.
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
