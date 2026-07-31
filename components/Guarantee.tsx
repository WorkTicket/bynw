import ScrollReveal from "@/components/ScrollReveal"

/**
 * Boutique guarantee medallion.
 * Structure: scalloped rim → pearl type band → blush center.
 * Arc copy uses sans for small-size clarity; display numeral for presence.
 */
function GuaranteeSeal() {
  return (
    <div className="guarantee-seal">
      <svg
        viewBox="0 0 280 280"
        className="h-40 w-40 sm:h-[11.75rem] sm:w-[11.75rem]"
        role="img"
        aria-label="Garantía de 7 días sin riesgo"
      >
        <defs>
          <linearGradient id="gs-rim" x1="18%" y1="10%" x2="82%" y2="90%">
            <stop offset="0%" stopColor="#e8b4b8" />
            <stop offset="48%" stopColor="#d4727e" />
            <stop offset="100%" stopColor="#b84a5e" />
          </linearGradient>
          <radialGradient id="gs-band" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fffaf8" />
            <stop offset="100%" stopColor="#f0d6d2" />
          </radialGradient>
          <radialGradient id="gs-core" cx="40%" cy="34%" r="66%">
            <stop offset="0%" stopColor="#fffdfc" />
            <stop offset="55%" stopColor="#faf3f1" />
            <stop offset="100%" stopColor="#e8b4b8" />
          </radialGradient>
          <linearGradient id="gs-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <path
            id="gs-scallop"
            d="M140.00,20.50 L145.78,22.25 L151.17,26.55 L156.16,31.08 L161.17,33.58 L166.75,33.19 L173.09,30.91 L179.72,29.00 L185.73,29.60 L190.40,33.43 L193.74,39.46 L196.61,45.55 L200.28,49.79 L205.59,51.56 L212.32,51.88 L219.17,52.65 L224.50,55.50 L227.35,60.83 L228.12,67.68 L228.44,74.41 L230.21,79.72 L234.45,83.39 L240.54,86.26 L246.57,89.60 L250.40,94.27 L251.00,100.28 L249.09,106.91 L246.81,113.25 L246.42,118.83 L248.92,123.84 L253.45,128.83 L257.75,134.22 L259.50,140.00 L257.75,145.78 L253.45,151.17 L248.92,156.16 L246.42,161.17 L246.81,166.75 L249.09,173.09 L251.00,179.72 L250.40,185.73 L246.57,190.40 L240.54,193.74 L234.45,196.61 L230.21,200.28 L228.44,205.59 L228.12,212.32 L227.35,219.17 L224.50,224.50 L219.17,227.35 L212.32,228.12 L205.59,228.44 L200.28,230.21 L196.61,234.45 L193.74,240.54 L190.40,246.57 L185.73,250.40 L179.72,251.00 L173.09,249.09 L166.75,246.81 L161.17,246.42 L156.16,248.92 L151.17,253.45 L145.78,257.75 L140.00,259.50 L134.22,257.75 L128.83,253.45 L123.84,248.92 L118.83,246.42 L113.25,246.81 L106.91,249.09 L100.28,251.00 L94.27,250.40 L89.60,246.57 L86.26,240.54 L83.39,234.45 L79.72,230.21 L74.41,228.44 L67.68,228.12 L60.83,227.35 L55.50,224.50 L52.65,219.17 L51.88,212.32 L51.56,205.59 L49.79,200.28 L45.55,196.61 L39.46,193.74 L33.43,190.40 L29.60,185.73 L29.00,179.72 L30.91,173.09 L33.19,166.75 L33.58,161.17 L31.08,156.16 L26.55,151.17 L22.25,145.78 L20.50,140.00 L22.25,134.22 L26.55,128.83 L31.08,123.84 L33.58,118.83 L33.19,113.25 L30.91,106.91 L29.00,100.28 L29.60,94.27 L33.43,89.60 L39.46,86.26 L45.55,83.39 L49.79,79.72 L51.56,74.41 L51.88,67.68 L52.65,60.83 L55.50,55.50 L60.83,52.65 L67.68,51.88 L74.41,51.56 L79.72,49.79 L83.39,45.55 L86.26,39.46 L89.60,33.43 L94.27,29.60 L100.28,29.00 L106.91,30.91 L113.25,33.19 L118.83,33.58 L123.84,31.08 L128.83,26.55 L134.22,22.25 L140.00,20.50 Z"
          />

          {/* Type sits on these arcs — roomy radii for legibility */}
          <path id="gs-arc-top" d="M 58 140 A 82 82 0 0 1 222 140" fill="none" />
          <path id="gs-arc-bot" d="M 58 140 A 82 82 0 0 0 222 140" fill="none" />
        </defs>

        {/* Cast shadow */}
        <ellipse cx="140" cy="256" rx="70" ry="7" fill="#b84a5e" opacity="0.1" />

        {/* Scalloped rose rim */}
        <use href="#gs-scallop" fill="url(#gs-rim)" />
        {/* Soft inner bevel on scallops */}
        <use
          href="#gs-scallop"
          fill="none"
          stroke="#fffaf8"
          strokeOpacity="0.35"
          strokeWidth="2"
          transform="translate(140 140) scale(0.955) translate(-140 -140)"
        />

        {/* Pearl type band (high-contrast stage for lettering) */}
        <circle cx="140" cy="140" r="100" fill="url(#gs-band)" />
        <circle
          cx="140"
          cy="140"
          r="100"
          fill="none"
          stroke="#d9a0a6"
          strokeWidth="1.25"
        />

        {/* Blush center medallion */}
        <circle cx="140" cy="140" r="64" fill="url(#gs-core)" />
        <circle
          cx="140"
          cy="140"
          r="64"
          fill="none"
          stroke="#d4727e"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <circle
          cx="140"
          cy="140"
          r="58"
          fill="none"
          stroke="#e8b4b8"
          strokeWidth="0.85"
          opacity="0.7"
        />

        {/* Soft top light */}
        <ellipse cx="124" cy="96" rx="36" ry="20" fill="url(#gs-sheen)" />

        {/* Arc labels — Outfit, generous size & tracking */}
        <text
          fill="#5c2a36"
          fontFamily="var(--font-sans), Outfit, system-ui, sans-serif"
          fontSize="13.5"
          fontWeight="700"
          letterSpacing="0.22em"
        >
          <textPath href="#gs-arc-top" startOffset="50%" textAnchor="middle">
            GARANTÍA
          </textPath>
        </text>
        <text
          fill="#5c2a36"
          fontFamily="var(--font-sans), Outfit, system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="0.18em"
        >
          <textPath href="#gs-arc-bot" startOffset="50%" textAnchor="middle">
            SIN RIESGO
          </textPath>
        </text>

        {/* Petite heart separators at 3 & 9 o'clock */}
        <g fill="#d4727e" opacity="0.9">
          <path
            transform="translate(48,140) scale(0.85)"
            d="M0-3.2 C-2.8-5.8-7-3.2-7 0.4 C-7 3.2-2.2 6.4 0 8.2 C2.2 6.4 7 3.2 7 0.4 C7-3.2 2.8-5.8 0-3.2Z"
          />
          <path
            transform="translate(232,140) scale(0.85)"
            d="M0-3.2 C-2.8-5.8-7-3.2-7 0.4 C-7 3.2-2.2 6.4 0 8.2 C2.2 6.4 7 3.2 7 0.4 C7-3.2 2.8-5.8 0-3.2Z"
          />
        </g>

        {/* Center numeral */}
        <text
          x="140"
          y="152"
          textAnchor="middle"
          fill="#5c2a36"
          fontFamily="var(--font-display), 'Bodoni Moda', Georgia, serif"
          fontSize="72"
          fontWeight="600"
        >
          7
        </text>
        <text
          x="140"
          y="174"
          textAnchor="middle"
          fill="#b84a5e"
          fontFamily="var(--font-sans), Outfit, system-ui, sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.36em"
        >
          DÍAS
        </text>

        {/* Tiny underline flourish under DÍAS */}
        <path
          d="M118 182 Q140 188 162 182"
          fill="none"
          stroke="#d9a0a6"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

export default function Guarantee() {
  return (
    <section className="section-white section-padding">
      <div className="section">
        <ScrollReveal>
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
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
