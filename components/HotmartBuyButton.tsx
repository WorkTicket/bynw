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

function loadHotmartCSS() {
  if (document.querySelector('link[href*="hotmart-fb"]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css'
  document.head.appendChild(link)
}

function loadHotmartJS(): Promise<void> {
  if (window.jQuery) return Promise.resolve()
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://static.hotmart.com/checkout/widget.min.js'
    script.async = true
    script.onload = () => resolve()
    document.body.appendChild(script)
  })
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
    loadHotmartCSS()
    loadHotmartJS().then(() => {
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
    })
  }, [href])

  return (
    <span className={`group relative inline-flex w-full ${className ?? ''}`}>
      <span className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * 360 - 90
          const rad = (angle * Math.PI) / 180
          const x = 50 + 35 * Math.cos(rad)
          const y = 50 + 35 * Math.sin(rad)
          return (
            <span
              key={i}
              className="heart-burst absolute flex items-center justify-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: "1px",
                height: "1px",
                animationDelay: `${i * 0.65}s`,
              }}
            >
              <svg className="w-3 h-3 text-rose-400/80" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 28S4 20 4 12a5 5 0 018-3.5A5 5 0 0128 12c0 8-12 16-12 16z" />
              </svg>
            </span>
          )
        })}
      </span>
      <a
        ref={anchorRef}
        href={href}
        data-track-hotmart-click={href}
        className="hotmart-fb hotmart__button-checkout btn-collection-buy relative z-10 w-full text-[10px] py-2 sm:text-xs sm:py-2.5 tracking-wider"
        onClick={(e) => {
          if (!isMobileCheckout()) e.preventDefault()
        }}
      >
        {children}
      </a>
    </span>
  )
}
