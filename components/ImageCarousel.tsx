"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { LayersIcon } from "@/lib/icons"

type Props = {
  images: string[]
  interval?: number
  className?: string
  noAutoplay?: boolean
  /** Tailwind aspect class (e.g. aspect-video). Defaults to aspect-square. */
  aspect?: string
  alt?: string
  /** First slide is above the fold (product LCP). */
  priority?: boolean
}

export default function ImageCarousel({
  images,
  interval = 4000,
  className = "",
  noAutoplay,
  aspect,
  alt = "Imagen del producto",
  priority = false,
}: Props) {
  const slides = Array.isArray(images) ? images.filter(Boolean) : []
  const [idx, setIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const [autoplayReady, setAutoplayReady] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const next = useCallback(
    () => setIdx((i) => (slides.length ? (i + 1) % slides.length : 0)),
    [slides.length]
  )
  const prev = useCallback(
    () =>
      setIdx((i) =>
        slides.length ? (i - 1 + slides.length) % slides.length : 0
      ),
    [slides.length]
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: "120px 0px", threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible")
    onVis()
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  // Defer autoplay until after LCP / idle so the first frame stays stable.
  useEffect(() => {
    if (noAutoplay || slides.length < 2) return
    let idleId: number | undefined
    let timer: number | undefined
    const start = () => setAutoplayReady(true)
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 3500 })
    } else {
      timer = window.setTimeout(start, 2500)
    }
    return () => {
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId)
      }
      if (timer != null) window.clearTimeout(timer)
    }
  }, [noAutoplay, slides.length])

  useEffect(() => {
    if (!autoplayReady || !inView || !tabVisible || slides.length < 2) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [next, interval, autoplayReady, inView, tabVisible, slides.length])

  if (slides.length === 0) return null

  const frame = aspect ?? "aspect-square"

  return (
    <div ref={rootRef} className={`group relative ${className}`}>
      <div className={`corner-accents relative overflow-hidden rounded-2xl bg-rose-50/30 ring-1 ring-rose-100/60 ${frame}`}>
        {/* Keep all slides mounted so LCP image is never torn down on advance */}
        {slides.map((src, i) => {
          const active = i === idx
          const isLcp = priority && i === 0
          return (
            <img
              key={`${src}-${i}`}
              src={`/images/${src}`}
              alt={active ? alt : ""}
              fetchPriority={isLcp ? "high" : "auto"}
              loading={isLcp ? "eager" : "lazy"}
              decoding={isLcp ? "sync" : "async"}
              aria-hidden={!active}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
          )
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink/70 shadow-soft opacity-70 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-rose-600"
            aria-label="Anterior"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink/70 shadow-soft opacity-70 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-rose-600"
            aria-label="Siguiente"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-5 bg-rose-500"
                    : "w-1.5 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-3 right-3 rounded-lg bg-rose-500/85 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
            <LayersIcon className="inline-block mr-1 text-rose-100 align-[-2px]" size={10} />
            {idx + 1} / {slides.length}
          </div>
        </>
      )}
    </div>
  )
}
