import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

const TERMS_URL = "https://bynmwcreative.com/terms"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de Manos Creativas Bynmw. Conoce nuestras políticas de uso del sitio web y compra de patrones de crochet en PDF.",
  alternates: {
    canonical: TERMS_URL,
    languages: {
      "es-MX": TERMS_URL,
      "es-ES": TERMS_URL,
      "x-default": TERMS_URL,
    },
  },
  openGraph: {
    title: "Términos y Condiciones | Manos Creativas Bynmw",
    description:
      "Términos y condiciones de uso del sitio web y compra de patrones de crochet.",
    url: TERMS_URL,
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function TermsPage() {
  return (
    <section className="relative overflow-hidden bg-rose-50 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-wine-200/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-wine-100/10 blur-3xl" />
      </div>

      <div className="section relative z-10 max-w-3xl">
        <ScrollReveal>
          <div className="text-center">
            <span className="badge">Legal</span>
            <h1 className="mt-4 font-display text-5xl font-bold text-ink sm:text-6xl lg:text-7xl">
              T&eacute;rminos y Condiciones
            </h1>
            <p className="mt-3 text-sm text-ink/40">&Uacute;ltima actualizaci&oacute;n: Julio 2026</p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 space-y-6 text-ink/60 leading-relaxed">
            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                1. Aceptaci&oacute;n de los t&eacute;rminos
              </h2>
              <p className="mt-2">
                Al acceder y utilizar este sitio web, aceptas cumplir con estos
                t&eacute;rminos y condiciones. Si no est&aacute;s de acuerdo con alguna
                parte de estos t&eacute;rminos, no debes utilizar nuestro sitio.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                2. Productos digitales
              </h2>
              <p className="mt-2">
                Todos los productos ofrecidos en Manos Creativas Bynmw son
                archivos digitales en formato PDF. Una vez realizada la compra,
                recibir&aacute;s un enlace de descarga por correo electr&oacute;nico.
              </p>
              <p className="mt-2">
                Los patrones digitales est&aacute;n protegidos por derechos de autor.
                No est&aacute; permitida la redistribuci&oacute;n, reventa o
                reproducci&oacute;n masiva de los contenidos.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                3. Precios y pagos
              </h2>
              <p className="mt-2">
                Los precios se muestran en euros (&euro;) e incluyen los impuestos
                aplicables. Los pagos se procesan a trav&eacute;s de Hotmart, una
                plataforma segura de pagos. No almacenamos informaci&oacute;n de
                tarjetas de cr&eacute;dito ni datos bancarios.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                4. Propiedad intelectual
              </h2>
              <p className="mt-2">
                Todo el contenido de este sitio web, incluyendo pero no limitado
                a patrones, im&aacute;genes, textos y logotipos, es propiedad
                exclusiva de Manos Creativas Bynmw y est&aacute; protegido por las
                leyes de propiedad intelectual.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                5. Limitaci&oacute;n de responsabilidad
              </h2>
              <p className="mt-2">
                Manos Creativas Bynmw no se hace responsable de los resultados
                obtenidos al utilizar nuestros patrones. La t&eacute;cnica de crochet
                depende de la habilidad individual de cada artesana.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                6. Modificaciones
              </h2>
              <p className="mt-2">
                Nos reservamos el derecho de modificar estos t&eacute;rminos en
                cualquier momento. Los cambios entrar&aacute;n en vigor inmediatamente
                despu&eacute;s de su publicaci&oacute;n en el sitio.
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-bold text-ink">7. Contacto</h2>
              <p className="mt-2">
                Para cualquier consulta sobre estos t&eacute;rminos, puedes
                contactarnos a trav&eacute;s de WhatsApp al{" "}
                <a
                  href="https://wa.me/573008504709"
                  className="text-wine-600 hover:underline"
                >
                  +57 300 850 4709
                </a>
                .
              </p>
            </div>

            <div className="rounded-2xl2 border border-wine-200 bg-wine-50 p-5 text-sm text-wine-800">
              <strong>Nota legal:</strong> Estos t&eacute;rminos son un punto de
              partida y deben ser revisados por un abogado antes del
              lanzamiento oficial del sitio.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
