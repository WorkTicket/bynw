const stats = [
  { value: "+500", label: "Clientas felices" },
  { value: "3", label: "Colecciones" },
  { value: "4.9★", label: "Valoración media" },
  { value: "24h", label: "Soporte WhatsApp" },
]

export default function TrustBar() {
  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 px-5 sm:px-6 lg:px-8">
      <div className="section">
        <div className="trust-bar mx-auto grid grid-cols-2 gap-px overflow-hidden rounded-2xl2 border border-rose-100/60 bg-rose-100/40 shadow-premium sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-white/95 px-4 py-5 text-center backdrop-blur-sm sm:py-6"
            >
              <span className="font-display text-2xl font-semibold tracking-tight gradient-text-rose sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-[11px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
