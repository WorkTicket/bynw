/** Decorative crochet-atelier ornament for section headers & dividers. */

type Props = {
  className?: string
  /** Soft rose tint intensity */
  tone?: "soft" | "mid"
}

export default function PetiteOrnament({ className = "", tone = "soft" }: Props) {
  const color = tone === "mid" ? "text-rose-400/70" : "text-rose-300/65"

  return (
    <div
      className={`flex items-center justify-center gap-3 ${color} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-current sm:w-12" />
      <svg
        viewBox="0 0 28 28"
        width="18"
        height="18"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M14 24 C7 18 3 13 3 8.5 C3 5 5.5 2.5 9 2.5 C11.5 2.5 13.5 4.5 14 5.5 C14.5 4.5 16.5 2.5 19 2.5 C22.5 2.5 25 5 25 8.5 C25 13 21 18 14 24Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="11" r="1.2" fill="currentColor" opacity="0.45" />
      </svg>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-current sm:w-12" />
    </div>
  )
}
