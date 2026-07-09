"use client"

import { useState, useEffect, useRef } from "react"
import { EyeIcon } from "@/lib/icons"

const BASE_VIEWERS = [3, 5, 7, 2, 6, 4, 9, 8, 4, 6]

function seedFromId(id: string, list: number[]): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = ((hash << 5) - hash) + id.charCodeAt(i)
  return list[Math.abs(hash) % list.length]
}

export default function LiveViewerCount({ productId }: { productId: string }) {
  const base = useRef(seedFromId(productId, BASE_VIEWERS))
  const [count, setCount] = useState(base.current)

  useEffect(() => {
    const interval = 3000 + (base.current * 1000)
    const cap = base.current + 20
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= cap) return prev
        return prev + 1
      })
    }, interval)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg animate-pulse">
      <EyeIcon className="text-rose-300" size={11} />
      {count} personas viendo esto
    </div>
  )
}
