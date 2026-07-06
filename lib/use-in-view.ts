import { useRef, useState, useEffect, type RefObject } from "react"

type UseInViewOptions = {
  once?: boolean
  margin?: string
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { once = false, margin = "0px" } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) {
            observerRef.current?.unobserve(el)
            observerRef.current?.disconnect()
          }
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin }
    )

    observerRef.current.observe(el)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [ref, once, margin])

  return inView
}
