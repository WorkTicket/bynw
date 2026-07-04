"use client"

import { useState } from "react"
import { MailIcon } from "@/lib/icons"
import ScrollReveal from "@/components/ScrollReveal"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form = new FormData(e.currentTarget)
    const honeypot = form.get("website") as string
    if (honeypot) { setStatus("success"); return }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"),
          phone: form.get("phone"), message: form.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      e.currentTarget.reset()
    } catch { setStatus("error") }
  }

  return (
    <section className="section-white section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <MailIcon className="absolute top-8 left-[8%] text-rose-200/20 animate-breathe hidden sm:block" size={32} style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="section relative">
        <ScrollReveal>
          <div className="mx-auto max-w-lg">
            <div className="cute-card-static p-6 sm:p-8 md:p-10">
            <div className="text-center">
              <span className="badge mb-3">Contacto</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Estamos aquí para ayudarte. Te responderemos en menos de 24h. <span className="text-rose-400">♡</span>
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <a href="https://www.tiktok.com/@bynmw8" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-rose-glow" aria-label="TikTok">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.58 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.44 0 .87.1 1.26.28V8.26a6.35 6.35 0 00-1.26-.13 6.34 6.34 0 000 12.68 6.34 6.34 0 006.34-6.34v-7.1a8.23 8.23 0 004.77 1.46v-3.5a4.87 4.87 0 01-3.01-1.14z"/></svg>
                </a>
                <a href="https://www.instagram.com/bynmw12_" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-rose-glow" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/share/1L3pLJdqvm/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-rose-glow" aria-label="Facebook">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input name="website" tabIndex={-1} autoComplete="off" />
              </div>
              {["name", "email", "phone"].map((f) => (
                <div key={f}>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    {f === "name" ? "Nombre *" : f === "email" ? "Correo *" : "Teléfono (opcional)"}
                  </label>
                  <input
                    name={f}
                    type={f === "email" ? "email" : "text"}
                    placeholder={f === "name" ? "Tu nombre" : f === "email" ? "tu@email.com" : "+57 300 000 0000"}
                    required={f !== "phone"}
                    className="premium-input"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">Mensaje</label>
                <textarea name="message" placeholder="Escribe tu mensaje aquí..." rows={4} className="premium-input resize-none" />
              </div>

              <button type="submit" className="btn-primary w-full text-base tracking-wider py-4" disabled={status === "loading"}>
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Enviando...
                  </span>
                ) : "Enviar mensaje ♡"}
              </button>

              {status === "success" && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-center animate-fade-in-up">
                  <p className="text-sm font-medium text-rose-700">¡Gracias! Te responderemos pronto. ♡</p>
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center animate-fade-in-up">
                  <p className="text-sm font-medium text-red-700">Algo salió mal. Inténtalo de nuevo.</p>
                </div>
              )}
            </form>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
