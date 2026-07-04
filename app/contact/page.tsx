import { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import ScrollReveal from "@/components/ScrollReveal"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con Manos Creativas Bynmw. Estamos aquí para ayudarte.",
  openGraph: {
    title: "Contacto | Manos Creativas Bynmw",
    description: "Ponte en contacto con nosotros.",
  },
}

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-rose-50 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-wine-200/20 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-wine-100/20 blur-3xl" />
      </div>

      <div className="section relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="badge">Contacto</span>
            <h1 className="mt-4 font-display text-6xl font-bold text-ink sm:text-7xl lg:text-8xl">
              Cont&aacute;ctanos
            </h1>
            <p className="mt-4 text-lg text-ink/50">
              &iquest;Tienes alguna pregunta? Estamos aqu&iacute; para ayudarte.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-ink">
                Informaci&oacute;n de Contacto
              </h2>

              <div className="glass-card p-6 transition-all duration-300 hover:shadow-card-hover">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-gradient-to-br from-rose-400 to-wine-500 text-white shadow-lg shadow-rose-500/20">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">WhatsApp</h3>
                    <a
                      href="https://wa.me/573008504709"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-wine-600 hover:underline"
                    >
                      +57 300 850 4709
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 transition-all duration-300 hover:shadow-card-hover">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-gradient-to-br from-rose-400 to-wine-500 text-white shadow-lg shadow-rose-500/20">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Redes Sociales</h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm">
                      <a
                        href="https://www.tiktok.com/@bynmw8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/50 hover:text-wine-600 transition-colors"
                      >
                        TikTok
                      </a>
                      <a
                        href="https://www.instagram.com/bynmw12_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/50 hover:text-wine-600 transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/share/1L3pLJdqvm/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink/50 hover:text-wine-600 transition-colors"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 transition-all duration-300 hover:shadow-card-hover">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-rose-100/50 blur-md" />
                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-rose-200 shadow-xl">
                      <img
                        src="/images/manoscreative.jpg"
                        alt="Natalia - Manos Creativas"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Atenci&oacute;n</h3>
                    <p className="text-sm text-ink/50">
                      Respondemos mensajes de WhatsApp en horario laboral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
