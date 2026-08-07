import type { ReactNode, CSSProperties } from "react"

type Variant = "up" | "fade" | "scale"

type Props = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms (kept for API compat; no JS reveal). */
  delay?: number
  variant?: Variant
}

/**
 * Zero-JS reveal wrapper. Mobile/ads already forced visible via CSS;
 * keeping a client IntersectionObserver site-wide cost more than the
 * desktop motion was worth for PageSpeed.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const style =
    delay > 0
      ? ({ ["--reveal-delay" as string]: `${delay}ms` } as CSSProperties)
      : undefined

  return (
    <div
      data-variant={variant}
      className={`scroll-reveal is-visible${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  )
}
