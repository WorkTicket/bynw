import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"

const ABOUT_URL = "https://bynmwcreative.com/about"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia de Manos Creativas Bynmw y nuestra pasión por el crochet. Patrones en PDF para México y España.",
  alternates: {
    canonical: ABOUT_URL,
    languages: {
      "es-MX": ABOUT_URL,
      "es-ES": ABOUT_URL,
      "x-default": ABOUT_URL,
    },
  },
  openGraph: {
    title: "Nosotros | Manos Creativas Bynmw",
    description:
      "Conoce nuestra historia y misión. Patrones de crochet para tejedoras en México y España.",
    url: ABOUT_URL,
  },
  twitter: {
    card: "summary",
    title: "Nosotros | Manos Creativas Bynmw",
    description:
      "Conoce nuestra historia y pasión por el crochet.",
  },
}

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-rose-50 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-wine-100/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-wine-200/20 blur-3xl" />
      </div>

      <div className="section relative z-10 max-w-5xl">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge">Nosotros</span>
            <h1 className="mt-4 font-display text-6xl font-bold text-ink sm:text-7xl lg:text-8xl">
              Sobre Manos{" "}
              <span className="gradient-text">Creativas</span>
            </h1>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="mt-14">
          <ScrollReveal>
            <div className="glass-card overflow-hidden p-0">
              <div className="grid items-center gap-10 lg:grid-cols-2 p-8 md:p-12">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    Nuestra Historia
                  </h2>
                  <p className="mt-4 text-ink/60 leading-relaxed">
                    Manos Creativas Bynmw nace de la pasión de Natalia por el
                    crochet y de querer compartir patrones claros con tejedoras
                    de cualquier parte. Cada colección está pensada para que
                    puedas seguir los pasos con calma, tanto si empiezas como si
                    ya tienes experiencia.
                  </p>
                  <p className="mt-4 text-ink/60 leading-relaxed">
                    Lo que empezó como un hobby se ha convertido en una comunidad
                    de artesanas que usan nuestros patrones para crear, aprender
                    y, en muchos casos, montar su propio negocio.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -inset-3 rounded-3xl2 bg-wine-gradient opacity-5 blur-xl" />
                  <div className="relative overflow-hidden rounded-2xl2 shadow-2xl">
                    <div className="aspect-[4/3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/imagen-1.webp"
                        alt="Manos Creativas Bynmw"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-2xl2 bg-wine-800 p-10 md:p-14 text-center text-white shadow-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  Nuestra Misi&oacute;n
                </h2>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white/30" />
                <p className="mt-8 text-lg text-white/90 leading-relaxed max-w-3xl mx-auto italic">
                  &ldquo;Ayudar a tejedoras de cualquier parte a crear con patrones
                  claros y recursos prácticos, ya sea para vender, regalar o
                  disfrutar en casa.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-ink text-center">
              &iquest;Por qu&eacute;{" "}
              <span className="gradient-text">elegirnos</span>?
            </h2>
            <div className="section-divider mx-auto mt-4" />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: "📚",
                  title: "Patrones propios",
                  desc: "Diseños propios que no verás en otro sitio.",
                },
                {
                  icon: "⚡",
                  title: "Acceso Inmediato",
                  desc: "Descarga tus patrones en PDF al instante después de la compra.",
                },
                {
                  icon: "💬",
                  title: "Soporte Personalizado",
                  desc: "Natalia te guía por WhatsApp en cada paso del proceso.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 100}>
                  <div className="glass-card p-7 text-center group hover:-translate-y-1">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl2 bg-wine-gradient text-2xl text-white shadow-soft transition-all duration-300 group-hover:shadow-glow group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h3 className="mt-5 font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink/50">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
