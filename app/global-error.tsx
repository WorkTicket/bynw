"use client"

import { useEffect } from "react"

const RELOAD_KEY = "bynmw-nav-error-reload"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return
      sessionStorage.setItem(RELOAD_KEY, "1")
      window.location.reload()
    } catch {
      // ignore
    }
  }, [error])

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf8",
          color: "#3a2428",
          fontFamily:
            "Outfit, system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <p style={{ color: "#e11d48", fontSize: "1.25rem", margin: 0 }}>
            Manos Creativas Bynmw
          </p>
          <h1
            style={{
              margin: "1.25rem 0 0",
              fontSize: "1.75rem",
              fontWeight: 600,
            }}
          >
            Algo no ha ido bien
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.6, color: "#7a6468" }}>
            Ha ocurrido un error al cargar la página. Puedes intentarlo de
            nuevo o volver al inicio.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem(RELOAD_KEY)
                } catch {
                  // ignore
                }
                try {
                  window.location.reload()
                } catch {
                  reset()
                }
              }}
              style={{
                border: 0,
                borderRadius: "999px",
                background: "#e11d48",
                color: "#fff",
                padding: "0.8rem 1.4rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reintentar
            </button>
            <a
              href="/"
              style={{
                borderRadius: "999px",
                border: "1px solid #e8b4b8",
                color: "#3a2428",
                padding: "0.8rem 1.4rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
