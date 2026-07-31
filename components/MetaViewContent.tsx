"use client"

import { useEffect, useRef } from "react"
import { trackMetaStandard } from "@/components/Analytics"
import { buildCommercePayload } from "@/lib/tracking"

type Props = {
  contentId: string
  contentName: string
  price: string
}

/** Fires Meta ViewContent once per product mount (PDP / ads lander). Retries until fbq is ready. */
export default function MetaViewContent({ contentId, contentName, price }: Props) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    return trackMetaStandard(
      "ViewContent",
      buildCommercePayload({
        id: contentId,
        name: contentName,
        price,
      })
    )
  }, [contentId, contentName, price])

  return null
}
