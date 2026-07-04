import Link from "next/link"
import { ScissorsIcon, FlowerIcon } from "@/lib/icons"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-rose-200/30 bg-gradient-to-b from-[#fef1f7] to-[#fee5ef]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-rose-300/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-pink-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.4)_0%,transparent_50%)]" />

        <ScissorsIcon className="absolute top-8 right-[10%] text-rose-300/20 animate-breathe hidden sm:block" size={28} style={{ animationDelay: "0.5s" }} />
        <FlowerIcon className="absolute top-12 left-[8%] text-rose-300/20 animate-sway hidden sm:block" size={24} style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="section relative">
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <span className="font-script text-lg text-rose-500 sm:text-xl">Decora · Diseña · Crea</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>
      </div>

      <div className="section relative pb-8 pt-2">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-rose-200 shadow-md">
                <img
                  src="/images/logo.png"
                  alt="Manos Creativas Bynmw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="block font-display text-lg font-semibold gradient-text-rose leading-tight">Manos Creativas</span>
                <span className="font-script text-sm text-rose-500">Bynmw</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted max-w-xs">
              Patrones de crochet en PDF: amigurumis, Princesas Disney y Flores Eternas.
              Con instrucciones claras y bonitos acabados. <span className="text-rose-400">♡</span>
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-ink flex items-center gap-2">
              <span className="text-rose-400">✦</span> Navegación
            </h3>
            <ul className="space-y-2.5">
              {[{ href: "/", label: "Inicio" }, { href: "/shop", label: "Colecciones" }, { href: "/testimonials", label: "Testimonios" }, { href: "/about", label: "Sobre Nosotros" }, { href: "/contact", label: "Contacto" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-muted transition-colors duration-200 hover:text-rose-600">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-ink flex items-center gap-2">
              <span className="text-rose-400">✦</span> Colecciones
            </h3>
            <ul className="space-y-2.5">
              {[{ href: "/shop/amigurumis-chenille", label: "Amigurumis" }, { href: "/shop/princesas-disney", label: "Princesas Disney" }, { href: "/shop/flores-eternas", label: "Flores Eternas" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-muted transition-colors duration-200 hover:text-rose-600">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-base font-semibold text-ink flex items-center gap-2">
              <span className="text-rose-400">✦</span> Conéctate
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="https://wa.me/573008504709" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-rose-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  +57 300 850 4709
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@bynmw8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-rose-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.58 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.44 0 .87.1 1.26.28V8.26a6.35 6.35 0 00-1.26-.13 6.34 6.34 0 000 12.68 6.34 6.34 0 006.34-6.34v-7.1a8.23 8.23 0 004.77 1.46v-3.5a4.87 4.87 0 01-3.01-1.14z"/></svg>
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/bynmw12_" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-rose-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1L3pLJdqvm/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-rose-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </li>
              <li>
                <a href="mailto:manoscreativasbynmw@gmail.com" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-rose-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  manoscreativasbynmw@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section relative pt-4 pb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          <svg className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        </div>
      </div>

      <div className="section relative pt-2 pb-6">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {["Pago seguro Hotmart", "Descarga al momento", "Garantía 7 días", "Soporte WhatsApp"].map((label) => (
            <div key={label} className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-white/60 px-4 py-2 text-[11px] font-semibold text-rose-700 backdrop-blur-sm">
              <svg className="h-3.5 w-3.5 text-rose-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t border-rose-200/20 pt-6 text-center">
          <p className="text-[11px] text-muted">&copy; {year} Manos Creativas Bynmw. <span className="text-rose-400">♡</span> Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <Link href="/privacy-policy" className="transition-colors hover:text-rose-600">Política de Privacidad</Link>
            <span className="text-rose-200">|</span>
            <Link href="/terms" className="transition-colors hover:text-rose-600">Términos y Condiciones</Link>
            <span className="text-rose-200">|</span>
            <Link href="/cookies-policy" className="transition-colors hover:text-rose-600">Cookies</Link>
            <span className="text-rose-200">|</span>
            <Link href="/refund-policy" className="transition-colors hover:text-rose-600">Reembolsos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
