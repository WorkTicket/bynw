import { Metadata } from "next"
import ScrollReveal from "@/components/ScrollReveal"
import ProductCard from "@/components/ProductCard"
import LeadMagnet from "@/components/LeadMagnet"
import { products } from "@/lib/products"
import { getLocalizedProduct } from "@/lib/pricing"
import { getCountry } from "@/lib/country"

const sectionHeading = "font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-snug"

const SHOP_URL = "https://bynmwcreative.com/shop"

export const metadata: Metadata = {
  title: "Colección Maestra de Patrones",
  description:
    "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas. Para todos los niveles. Envío inmediato a México y España.",
  alternates: {
    canonical: SHOP_URL,
    languages: {
      "es-MX": SHOP_URL,
      "es-ES": SHOP_URL,
      "x-default": SHOP_URL,
    },
  },
  openGraph: {
    title: "Colección Maestra | Manos Creativas Bynmw",
    description:
      "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas. Descarga inmediata en México y España.",
    url: SHOP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Colección Maestra | Manos Creativas Bynmw",
    description:
      "Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas.",
  },
}

const testimonials = [
  {
    name: "María García",
    location: "Madrid, España",
    text: "Los patrones son súper claros y fáciles de seguir. En una semana ya había terminado mi primer amigurumi. ¡Natalia responde todas las dudas por WhatsApp al instante!",
    rating: 5,
    image: "imagen-18.webp",
  },
  {
    name: "Laura Sánchez",
    location: "Barcelona, España",
    text: "Había intentado aprender crochet varias veces y siempre abandonaba. Con los videos tutoriales y las explicaciones, por fin entendí. Ya llevo 5 muñecos hechos.",
    rating: 5,
    image: "imagen-18-1.webp",
  },
  {
    name: "Carmen López",
    location: "Sevilla, España",
    text: "La colección de flores es espectacular. Las clientas me encargan ramos y no doy abasto. La mejor inversión que he hecho para mi emprendimiento.",
    rating: 5,
    image: "imagen-18-2.webp",
  },
  {
    name: "Ana Martínez",
    location: "Valencia, España",
    text: "Compré la colección de Princesas Disney para hacer el regalo de cumpleaños de mi hija. Quedó precioso. Los patrones son muy detallados y fáciles de entender.",
    rating: 5,
    image: "imagen-18-3.webp",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ShopPage() {
  const country = getCountry()

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-wine-100/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-50/40 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="badge">Colección Maestra</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-[1.1]">
                Patrones de Amigurumis y{" "}
                <span className="gradient-text italic">Flores en Crochet</span>
              </h1>
              <p className="mt-4 text-lg text-muted/70 max-w-2xl mx-auto leading-relaxed">
                Patrones en PDF de amigurumis, Princesas Disney y Flores Eternas en crochet.
                Tanto si empiezas como si ya llevas tiempo tejiendo.
              </p>
              <div className="section-divider mt-6" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-rose-100/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-wine-100/10 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge">Colecciones</span>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Elige tu colección{" "}
                <span className="gradient-text italic">favorita</span>
              </h2>
              <p className="mt-3 text-muted">
                Cada colección incluye patrones detallados en PDF con fotos paso a paso.
              </p>
              <div className="section-divider mt-6" />
            </div>
          </ScrollReveal>

          <div className="mt-10 sm:mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 150}>
                <ProductCard product={getLocalizedProduct(p, country)} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-rose-50/20 section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-rose-100/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-wine-50/30 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge">¿Por qué Nosotros?</span>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Todo lo que necesitas en un solo{" "}
                <span className="gradient-text italic">lugar</span>
              </h2>
              <div className="section-divider mt-6" />
            </div>
          </ScrollReveal>

          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Acceso Inmediato",
                desc: "Recibes todo al momento en tu correo electrónico tras la compra. Sin esperas ni envíos físicos.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                ),
              },
              {
                title: "Soporte por WhatsApp",
                desc: "Natalia te guía personalmente en cada paso. Resolvemos tus dudas en cuestión de minutos.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
              },
              {
                title: "Patrones cuidados",
                desc: "Diseños detallados con fotos en alta resolución, paso a paso y guía de abreviaturas incluida.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Bonos incluidos",
                desc: "Cada colección incluye bonos de regalo con patrones extra, guías y material adicional sin coste.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25a3 3 0 003-3v-1.5a3 3 0 00-3-3H3.375a3 3 0 00-3 3v1.5a3 3 0 003 3z" />
                  </svg>
                ),
              },
              {
                title: "Pago 100% Seguro",
                desc: "Pagos gestionados por Hotmart, plataforma segura y conocida. Tus datos quedan protegidos.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: "Descarga Vitalicia",
                desc: "Accede a tus patrones cuando quieras. Puedes descargarlos, imprimirlos y guardarlos para siempre.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
              },
            ].map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 80}>
                <div className="relative overflow-hidden rounded-2xl2 bg-white border border-wine-100/20 p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-wine-100 text-wine-600 shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-rose-50/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-wine-50/30 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="badge">Testimonios</span>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Lo que dicen nuestras{" "}
                <span className="gradient-text italic">clientas</span>
              </h2>
              <p className="mt-3 text-muted">
                +500 artesanas ya confían en nosotros.
              </p>
              <div className="section-divider mt-6" />
            </div>
          </ScrollReveal>

          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="premium-card relative overflow-hidden p-6">
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-wine-50/50 blur-3xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-wine-200 shadow-md">
                        <img
                          src={`/images/${t.image}`}
                          alt={t.name}
                          loading="lazy"
                          decoding="async"
                          width="56"
                          height="56"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <Stars count={t.rating} />
                      <p className="mt-2 text-sm text-ink/70 leading-relaxed italic">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink">{t.name}</span>
                        <span className="text-[10px] text-muted/30">•</span>
                        <span className="text-xs text-muted">{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 text-center">
              <a
                href="https://wa.me/573008504709"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Compartir mi experiencia
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 section-padding">
        <div className="section">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <div className="relative overflow-hidden rounded-2xl2 bg-white border border-rose-100/40 shadow-card">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-wine-500 to-rose-400" />
                <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] items-center gap-6 md:gap-8 p-6 md:p-10">
                  <div className="order-2 md:order-1 text-center md:text-left">
                    <span className="badge-pink">Soporte Directo</span>
                    <h2 className={`mt-3 ${sectionHeading}`}>
                      Natalia te guía personalmente por WhatsApp
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-muted leading-relaxed max-w-lg">
                      Soy Natalia, de Manos Creativas. Escríbeme directamente por WhatsApp y te guiaré personalmente en cada paso del proceso de compra.
                    </p>
                    <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                      <a
                        href="https://wa.me/573008504709"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp text-sm sm:text-base sm:px-6 sm:py-3.5 w-full sm:w-auto"
                      >
                        <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Escribir a Natalia
                      </a>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 rounded-full px-3 py-2 border border-rose-100 shrink-0">
                        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Respuesta en minutos
                      </div>
                    </div>
                  </div>

                  <div className="relative shrink-0 order-1 md:order-2">
                    <div className="absolute -inset-3 md:-inset-4 rounded-full bg-rose-100/40 blur-xl" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-rose-400 to-wine-500 opacity-20 blur-sm" />
                    <div className="relative h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-full ring-4 ring-rose-200 shadow-xl">
                      <img
                        src="/images/manoscreative.webp"
                        alt="Natalia - Fundadora"
                        loading="lazy"
                        decoding="async"
                        width="112"
                        height="112"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-lead-gradient-deep section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-wine-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-wine-300/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold tracking-wider text-white/70 backdrop-blur-sm border border-white/8">
                <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse shadow-lg shadow-rose-400/40" />
                GUÍA GRATUITA
              </div>

              <h2 className="mt-8 font-display text-[2.5rem] sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] tracking-tight">
                Descarga gratis el{" "}
                <span className="text-rose-300 italic">patrón de las Guerreras K-POP</span>
              </h2>

              <p className="mt-5 text-lg text-white/50 max-w-lg mx-auto leading-relaxed font-light">
                para comprobar la calidad de los patrones antes de comprar
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm">PDF descargable</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm">Incluye ilustraciones</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <svg className="h-3.5 w-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm">Descarga al instante</span>
                </div>
              </div>

              <div className="mx-auto mt-8 max-w-md">
                <LeadMagnet variant="compact" dark source="inline-section" submitLabel="Descargar patrón gratis" placeholder="tu@email.com" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-wine-gradient-soft section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-wine-200/20 blur-3xl" />
        </div>

        <div className="section relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-lg">
              <div className="glass-card p-6 sm:p-8 md:p-10">
                <div className="text-center">
                  <span className="badge">Contáctanos</span>
                  <h2 className={`mt-4 ${sectionHeading}`}>
                    ¿Tienes alguna pregunta?
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Estamos aquí para ayudarte. Te responderemos en menos de 24h.
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <a href="https://www.tiktok.com/@bynmw8" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-50 text-wine-500 transition-all duration-300 hover:bg-wine-500 hover:text-white hover:shadow-glow" aria-label="TikTok">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.58 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.44 0 .87.1 1.26.28V8.26a6.35 6.35 0 00-1.26-.13 6.34 6.34 0 000 12.68 6.34 6.34 0 006.34-6.34v-7.1a8.23 8.23 0 004.77 1.46v-3.5a4.87 4.87 0 01-3.01-1.14z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/bynmw12_" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-50 text-wine-500 transition-all duration-300 hover:bg-wine-500 hover:text-white hover:shadow-glow" aria-label="Instagram">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/1L3pLJdqvm/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-wine-50 text-wine-500 transition-all duration-300 hover:bg-wine-500 hover:text-white hover:shadow-glow" aria-label="Facebook">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>
                <p className="mt-6 text-center text-xs text-muted">
                  O escr&iacute;benos por <strong>WhatsApp</strong>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
