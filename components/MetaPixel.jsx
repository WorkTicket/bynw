'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const PIXEL_ID = '1937320463558405';
const SRC = 'https://connect.facebook.net/en_US/fbevents.js';
const PURCHASES = {
  '/compra-confirmada/princesas/': { value: 9.90, name: 'Patrones de Princesas de Cuento', id: 'princesas' },
  '/compra-confirmada/premium/': { value: 24.96, name: 'Colección Premium · 1.000+ patrones', id: 'premium' },
};

export function installPixel() {
  if (window.fbq) return window.fbq;
  const fbq = function (...args) {
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  const script = document.createElement('script');
  script.async = true;
  script.src = SRC;
  document.head.appendChild(script);
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
  return fbq;
}

export function trackMetaEvent(eventName, parameters) {
  if (typeof window === 'undefined' || window.localStorage.getItem('mc-cookie-consent') !== 'accepted') return;
  const fbq = installPixel();
  fbq?.('track', eventName, parameters);
}

export function trackViewContent(route, item) {
  if (typeof window === 'undefined' || window.localStorage.getItem('mc-cookie-consent') !== 'accepted') return;
  const fbq = installPixel();
  fbq?.('track', 'ViewContent', {
    value: item?.value ?? undefined,
    currency: 'EUR',
    content_name: item?.name ?? undefined,
    content_ids: item?.id ? [item.id] : undefined,
    content_type: 'product',
  });
}

export default function MetaPixel() {
  const pathname = usePathname();
  const route = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') + '/';
  const firstPage = useRef(true);
  const purchaseFired = useRef(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('mc-cookie-consent') !== 'accepted') return;
    installPixel();
    setReady(true);
  }, [pathname]);

  useEffect(() => {
    if (!ready) return;
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname, ready]);

  useEffect(() => {
    const purchase = PURCHASES[route];
    if (!ready || !purchase || purchaseFired.current.has(route)) return;
    let alreadyTracked = false;
    try {
      alreadyTracked = window.sessionStorage.getItem(`meta-purchase:${route}`) === '1';
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
    if (alreadyTracked) {
      purchaseFired.current.add(route);
      return;
    }
    purchaseFired.current.add(route);
    try { window.sessionStorage.setItem(`meta-purchase:${route}`, '1'); } catch { /* no-op */ }
    window.fbq?.('track', 'Purchase', {
      value: purchase.value,
      currency: 'EUR',
      content_name: purchase.name,
      content_ids: [purchase.id],
      content_type: 'product',
    });
  }, [pathname, ready]);

  useEffect(() => {
    if (!ready) return;
    const viewContentItem = PURCHASES[route];
    if (!viewContentItem) return;
    window.fbq?.('track', 'ViewContent', {
      value: viewContentItem.value,
      currency: 'EUR',
      content_name: viewContentItem.name,
      content_ids: [viewContentItem.id],
      content_type: 'product',
    });
  }, [pathname, ready]);
}
