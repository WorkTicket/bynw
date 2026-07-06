import { MessageCircleIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

export default function WhatsAppSupport() {
  return (
    <section className="section-alt section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <MessageCircleIcon className="absolute top-8 left-[8%] text-rose-300/20 animate-breathe hidden sm:block" size={34} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <div className="cute-card-static relative overflow-hidden rounded-3xl2 bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-300 via-pink-500 to-rose-300" />
              <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] items-center gap-6 md:gap-8 p-6 md:p-10">
                <div className="order-2 md:order-1 text-center md:text-left">
                  <span className="badge mb-3">Soporte Directo</span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-ink tracking-tight">
                    ¿Necesitas ayuda con tu pedido?
                  </h2>
                  <p className="mt-2 md:mt-3 text-sm md:text-base text-muted leading-relaxed max-w-lg">
                    Soy Natalia, de Manos Creativas. Escríbeme por WhatsApp y te ayudo con la compra o con cualquier duda.
                  </p>
                  <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                    <a href="https://wa.me/573008504709" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2 text-sm sm:text-base sm:px-6 sm:py-3.5">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Escribir a Natalia
                    </a>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 rounded-full px-3 py-2 border border-rose-200 shrink-0">
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Respuesta en minutos
                    </div>
                  </div>
                </div>

                <div className="relative shrink-0 order-1 md:order-2">
                  <div className="absolute -inset-3 md:-inset-4 rounded-full bg-rose-100/40 blur-xl" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 opacity-20 blur-sm" />
                  <div className="relative h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-full ring-4 ring-rose-200 shadow-xl">
                    <img src="/images/manoscreative.webp" alt="Natalia - Fundadora" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
