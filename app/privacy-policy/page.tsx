import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Política de Privacidad",
}

export default function PrivacyPolicyPage() {
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
              Pol&iacute;tica de Privacidad
            </h1>
            <p className="mt-3 text-sm text-ink/40">&Uacute;ltima actualizaci&oacute;n: Julio 2026</p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 space-y-6 text-ink/60 leading-relaxed">
            <p>
              En Manos Creativas Bynmw respetamos tu privacidad. Esta pol&iacute;tica
              explica qu&eacute; datos recopilamos, c&oacute;mo los usamos y qu&eacute;
              derechos tienes al utilizar nuestro sitio web.
            </p>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
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

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                2. Datos que recopilamos
              </h2>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Descarga de regalo gratuito:</strong> nombre y correo
                  electr&oacute;nico.
                </li>
                <li>
                  <strong>Compras:</strong> los datos de pago los gestiona Hotmart de
                  forma segura; no almacenamos datos bancarios en nuestro sitio.
                </li>
                <li>
                  <strong>Navegaci&oacute;n:</strong> datos t&eacute;cnicos b&aacute;sicos
                  como cookies y estad&iacute;sticas de uso.
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                3. Finalidad del tratamiento
              </h2>
              <p className="mt-2">
                Utilizamos tus datos para responder consultas, enviarte el patr&oacute;n
                gratuito, gestionar suscripciones al bolet&iacute;n, mejorar nuestros
                servicios y cumplir obligaciones legales derivadas de las compras.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                4. Base legal y conservaci&oacute;n
              </h2>
              <p className="mt-2">
                Tratamos tus datos con tu consentimiento al enviar un formulario o
                suscribirte, y por inter&eacute;s leg&iacute;timo para atender solicitudes
                y mejorar la web. Conservamos los datos mientras sea necesario para la
                finalidad indicada o mientras no solicites su supresi&oacute;n.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                5. Tus derechos
              </h2>
              <p className="mt-2">
                Puedes acceder, rectificar, suprimir u oponerte al tratamiento de tus
                datos, as&iacute; como solicitar la limitaci&oacute;n o portabilidad
                escribi&eacute;ndonos a{" "}
                <a href="mailto:bynw808@gmail.com" className="text-rose-600 hover:underline">
                  bynw808@gmail.com
                </a>
                . Tambi&eacute;n puedes darte de baja del bolet&iacute;n en cualquier
                momento desde el enlace incluido en nuestros correos electr&oacute;nicos.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                6. Terceros y seguridad
              </h2>
              <p className="mt-2">
                Podemos compartir datos con proveedores que nos ayudan a operar el
                sitio (por ejemplo, Mailchimp para el bolet&iacute;n y Hotmart para
                pagos), siempre bajo sus propias pol&iacute;ticas de privacidad.
                Aplicamos medidas razonables para proteger tu informaci&oacute;n.
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
