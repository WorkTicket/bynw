"use client"

import { useState, useEffect, useCallback } from "react"
import { LayersIcon } from "@/lib/icons"

type Props = {
  images: string[]
  interval?: number
  className?: string
  noAutoplay?: boolean
  aspect?: string
  alt?: string
}

export default function ImageCarousel({ images, interval = 2000, className = "", noAutoplay, aspect = "aspect-[4/3]", alt = "Imagen del producto" }: Props) {
  const [idx, setIdx] = useState(0)
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (noAutoplay) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [next, interval, noAutoplay])

  if (images.length === 0) return null

  return (
    <div className={`group relative shadow-soft ${className}`}>
      <div className={`${aspect} overflow-hidden rounded-2xl2 bg-rose-50/40 ring-1 ring-rose-200/30`}>
        <img
          src={`/images/${images[idx]}`}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain transition-all duration-700 ease-out"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink/60 shadow-lg backdrop-blur-sm opacity-60 sm:opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-rose-600 hover:scale-110 active:scale-95"
            aria-label="Anterior"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink/60 shadow-lg backdrop-blur-sm opacity-60 sm:opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-rose-600 hover:scale-110 active:scale-95"
            aria-label="Siguiente"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-5 bg-rose-400"
                    : "w-1.5 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-3 right-3 rounded-full bg-rose-900/60 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <LayersIcon className="inline-block mr-1 text-rose-300 align-[-2px]" size={10} />
            {idx + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
