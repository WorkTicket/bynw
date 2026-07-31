"use client"

import { useInView } from "@/lib/use-in-view"
import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react"

type Variant = "up" | "fade" | "scale"

type Props = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms (kept short for snappy feel). */
  delay?: number
  variant?: Variant
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const visible = reducedMotion || inView
  const style =
    delay > 0
      ? ({ ["--reveal-delay" as string]: `${delay}ms` } as CSSProperties)
      : undefined

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={`scroll-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  )
}
