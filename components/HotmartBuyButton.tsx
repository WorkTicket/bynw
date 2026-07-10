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
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * 360
          const rad = (angle * Math.PI) / 180
          const x = 50 + 30 * Math.cos(rad)
          const y = 50 + 30 * Math.sin(rad)
          return (
            <span
              key={i}
              className="heart-burst absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400/70" viewBox="0 0 32 32" fill="currentColor">
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
        className="hotmart-fb hotmart__button-checkout btn-collection-buy relative z-10 w-full text-xs sm:text-sm py-3 sm:py-3.5 tracking-wider"
        onClick={(e) => {
          if (!isMobileCheckout()) e.preventDefault()
        }}
      >
        {children}
      </a>
    </span>
  )
}
