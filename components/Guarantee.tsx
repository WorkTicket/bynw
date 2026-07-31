import ScrollReveal from "@/components/ScrollReveal"

function GuaranteeSeal() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-36 w-36 sm:h-44 sm:w-44"
      role="img"
      aria-label="Garantía de 7 días sin riesgo"
    >
      <defs>
        <linearGradient id="guarantee-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8a0a8" />
          <stop offset="50%" stopColor="#c95d6e" />
          <stop offset="100%" stopColor="#e8a0a8" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="120" r="112" fill="#fff9f8" />
      <circle
        cx="120"
        cy="120"
        r="108"
        fill="none"
        stroke="url(#guarantee-ring)"
        strokeWidth="2.25"
      />
      <circle
        cx="120"
        cy="120"
        r="98"
        fill="none"
        stroke="#f5b8be"
        strokeWidth="1"
        opacity="0.85"
      />

      <text
        x="120"
        y="52"
        textAnchor="middle"
        fill="#9a4a58"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="0.32em"
      >
        GARANTÍA
      </text>
      <text
        x="120"
        y="198"
        textAnchor="middle"
        fill="#9a4a58"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.26em"
      >
        SIN RIESGO
      </text>

      <g fill="#d4848f" opacity="0.9">
        <path
          transform="translate(42,120)"
          d="M0-5 L1.4-1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4-1.4 Z"
        />
        <path
          transform="translate(198,120)"
          d="M0-5 L1.4-1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4-1.4 Z"
        />
      </g>

      <text
        x="120"
        y="128"
        textAnchor="middle"
        fill="#7a3342"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="72"
        fontWeight="600"
      >
        7
      </text>
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fill="#c95d6e"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.35em"
      >
        DÍAS
      </text>
    </svg>
  )
}

export default function Guarantee() {
  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
            <div className="mx-auto md:mx-0">
              <GuaranteeSeal />
            </div>
            <div className="text-center md:text-left">
              <span className="eyebrow">Garantía</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.85rem]">
                7 días de garantía.{" "}
                <span className="gradient-text-rose italic">Compra sin riesgo</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:mx-0 mx-auto sm:text-lg">
                Si los patrones no te convencen, te devolvemos el dinero en los 7
                días siguientes a la compra.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start sm:gap-x-8">
                {["Compra protegida", "Reembolso 7 días", "Pago Hotmart"].map(
                  (label, i) => (
                    <span key={label} className="flex items-center gap-x-6 sm:gap-x-8">
                      {i > 0 && (
                        <span className="hidden text-[8px] text-rose-300/80 sm:inline" aria-hidden>
                          ✦
                        </span>
                      )}
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {label}
                      </span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
