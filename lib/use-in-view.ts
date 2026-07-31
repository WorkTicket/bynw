import { useRef, useState, useEffect, type RefObject } from "react"

type UseInViewOptions = {
  once?: boolean
  /** CSS margin for IntersectionObserver rootMargin */
  margin?: string
  /** 0–1; higher = more of the element must be visible before triggering */
  threshold?: number | number[]
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { once = false, margin = "0px", threshold = 0.12 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    // Already in viewport on mount (e.g. short pages) — still report true
    // after a frame so CSS transitions can run from the hidden state.
    const reveal = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInView(true))
      })
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          reveal()
          if (once) {
            observerRef.current?.unobserve(el)
            observerRef.current?.disconnect()
          }
        } else if (!once) {
          setInView(false)
        }
      },
      { root: null, rootMargin: margin, threshold }
    )

    observerRef.current.observe(el)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [ref, once, margin, threshold])

  return inView
}
