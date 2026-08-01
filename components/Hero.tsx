import Image from "next/image"
import Link from "next/link"
import PrimaryCTA from "@/components/PrimaryCTA"

export default function Hero() {
  return (
    <section className="hero-editorial relative min-h-[min(92svh,52rem)] overflow-x-clip bg-[#fffaf8] sm:min-h-[min(94svh,54rem)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 hero-image-drift">
          <div className="absolute inset-0 origin-[72%_42%] scale-[1.16] -translate-y-[9%] sm:origin-[74%_40%] sm:scale-[1.12] sm:-translate-y-[6%] lg:origin-center lg:scale-[1.04] lg:translate-y-0">
            <Image
              src="/images/hero-editorial.webp"
              alt="Amigurumi de princesa en crochet o ganchillo junto a un ramo de flores eternas tejidas"
              fill
              priority
              unoptimized
              decoding="sync"
              sizes="(max-width: 1023px) 1920px, 100vw"
              className="object-cover object-[72%_52%] sm:object-[74%_48%] lg:object-[78%_center]"
            />
          </div>
        </div>

        {/* Mobile: denser pearl veil behind copy for readability */}
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background: `
              linear-gradient(
                to top,
                #fffaf8 0%,
                #fffaf8 32%,
                rgba(255,250,248,0.97) 48%,
                rgba(255,250,248,0.82) 60%,
                rgba(255,250,248,0.45) 72%,
                transparent 88%
              ),
              linear-gradient(to bottom, rgba(255,250,248,0.92) 0%, transparent 24%)
            `,
          }}
        />

        {/* Desktop: solid pearl behind copy → fade into image */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background: `
              linear-gradient(
                92deg,
                #fffaf8 0%,
                #fffaf8 32%,
                rgba(255,250,248,0.97) 40%,
                rgba(255,250,248,0.82) 50%,
                rgba(255,250,248,0.4) 62%,
                rgba(255,250,248,0.1) 74%,
                transparent 86%
              )
            `,
          }}
        />
      </div>

      {/* Soft floating petals — atmosphere only */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block" aria-hidden="true">
        <span className="absolute left-[42%] top-[22%] h-2 w-2 rounded-full bg-rose-300/40 animate-petal-float" />
        <span
          className="absolute left-[48%] top-[58%] h-1.5 w-1.5 rounded-full bg-rose-400/30 animate-petal-float"
          style={{ animationDelay: "1.4s" }}
        />
        <span
          className="absolute left-[38%] top-[72%] h-2.5 w-2.5 rounded-full bg-rose-200/60 animate-petal-float"
          style={{ animationDelay: "2.6s" }}
        />
      </div>

      <div className="section relative z-10 flex min-h-[min(92svh,52rem)] flex-col justify-end pb-14 pt-10 sm:min-h-[min(94svh,54rem)] sm:justify-center sm:pb-24 sm:pt-20 lg:pb-28">
        <div className="max-w-xl animate-fade-in-up lg:max-w-[36rem]">
          <p className="font-script text-[2.45rem] leading-[1.05] text-rose-600 sm:text-[3.05rem] lg:text-[3.45rem] lg:text-rose-500">
            Manos Creativas Bynmw
          </p>

          <h1 className="mt-5 font-display text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-7 sm:text-[2.85rem] lg:text-[3.25rem] xl:text-[3.45rem]">
            Patrones Digitales de{" "}
            <span className="gradient-text-candy italic">Crochet o Ganchillo</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ink/70 sm:mt-6 sm:text-base lg:text-lg lg:text-muted">
            Colecciones de patrones con fotos paso a paso. Instrucciones claras,
            Descarga al momento, acceso de por vida.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:gap-6">
            <PrimaryCTA href="/#colecciones" size="lg">
              Ver colecciones
            </PrimaryCTA>
            <Link
              href="/shop"
              className="group inline-flex min-h-[2.75rem] items-center justify-center gap-2 px-1 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-rose-600 sm:justify-start lg:text-ink/60"
            >
              Explorar la tienda
              <svg
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
