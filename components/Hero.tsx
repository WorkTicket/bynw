import Image from "next/image"
import HeroCtas from "@/components/HeroCtas"
import { StarIcon } from "@/lib/icons"
import { SITE_RATING_DISPLAY } from "@/lib/testimonials-data"

export default function Hero() {
  return (
    <section className="hero-editorial relative flex flex-col overflow-x-clip md:-mt-[var(--site-header-offset)] md:min-h-[100svh]">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[3/2] md:absolute md:inset-0 md:aspect-auto">
        <div className="absolute inset-0 origin-[70%_6%] scale-[1.16] sm:origin-[72%_10%] sm:scale-[1.12] md:origin-[78%_22%] md:scale-[1.08]">
          <Image
            src="/images/hero-editorial.webp"
            alt="Amigurumi de princesa en crochet o ganchillo junto a un ramo de flores eternas tejidas"
            fill
            priority
            fetchPriority="high"
            unoptimized
            sizes="100vw"
            className="object-cover object-[70%_18%] sm:object-[72%_22%] md:object-[78%_28%]"
          />
        </div>

        <div className="hero-veil-photo pointer-events-none absolute inset-x-0 bottom-0 h-[28%] md:hidden" />
        <div className="hero-veil-split pointer-events-none absolute inset-0 hidden md:block" />
      </div>

      <div className="relative z-10 bg-white pb-[calc(var(--sticky-cta-stack)+1.25rem)] md:flex md:min-h-[100svh] md:flex-col md:justify-center md:bg-transparent md:pb-24 md:pt-[calc(var(--site-header-offset)+1.5rem)]">
        <div className="section pt-8 sm:pt-10 md:pt-0">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center md:mx-0 md:max-w-[28rem] md:items-start md:text-left lg:max-w-[34rem]">
            <span className="eyebrow">Patrones en PDF</span>

            <p className="mt-4 font-script text-[1.7rem] leading-none text-rose-500 sm:mt-5 sm:text-[2.05rem] lg:text-[2.35rem]">
              Manos Creativas Bynmw
            </p>

            <h1 className="mt-5 font-display text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:mt-6 sm:text-[2.7rem] lg:text-[3.15rem]">
              Patrones Digitales de{" "}
              <span className="gradient-text-candy italic">Crochet o Ganchillo</span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted sm:mt-6 sm:text-base lg:text-[1.05rem]">
              Colecciones con fotos paso a paso, instrucciones claras,
              descarga al momento y acceso de por vida.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="text-rose-400" size={13} />
                  ))}
                </span>
                <span className="text-[13px] font-semibold tracking-tight text-ink">
                  {SITE_RATING_DISPLAY}
                </span>
              </span>
              <span className="hidden h-3 w-px bg-rose-200/80 sm:block" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                Descarga inmediata · Acceso de por vida
              </span>
            </div>

            <HeroCtas />
          </div>
        </div>
      </div>
    </section>
  )
}
