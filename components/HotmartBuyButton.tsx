'use client'

import { useEffect, useRef } from 'react'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

declare global {
  interface Window {
    jQuery?: (element: HTMLElement) => {
      fancybox: (options: Record<string, unknown>) => void
    }
  }
}

function isMobileCheckout() {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth <= 600 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
  )
}

function bindHotmartCheckout(anchor: HTMLAnchorElement) {
  const $ = window.jQuery
  if (!$) return false

  $(anchor).fancybox({
    type: 'iframe',
    toolbar: false,
    smallBtn: true,
    iframe: {
      css: { width: '600px' },
      attr: { allowpaymentrequest: 'true' },
    },
  })

  return true
}

export default function HotmartBuyButton({ href, children, className }: Props) {
  const anchorRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor) return

    const tryBind = () => bindHotmartCheckout(anchor)
    if (tryBind()) return

    const interval = window.setInterval(() => {
      if (tryBind()) window.clearInterval(interval)
    }, 200)

    const timeout = window.setTimeout(() => window.clearInterval(interval), 15000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [href])

  return (
    <span className={`group relative inline-flex w-full ${className ?? ''}`}>
      <span
        className="buy-btn-pulse-ring absolute inset-0 rounded-full bg-rose-400/45 animate-ping pointer-events-none motion-reduce:hidden group-hover:hidden"
        aria-hidden
      />
      <a
        ref={anchorRef}
        href={href}
        className="hotmart-fb hotmart__button-checkout btn-collection-buy relative z-10 w-full text-sm sm:text-base py-4 sm:py-5"
        onClick={(e) => {
          if (!isMobileCheckout()) e.preventDefault()
        }}
      >
        {children}
      </a>
    </span>
  )
}
