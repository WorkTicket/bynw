'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { collections } from '../lib/store';

const PIXEL_ID = '1937320463558405';
const SRC = 'https://connect.facebook.net/en_US/fbevents.js';

// Build one product payload per collection so every event (ViewContent,
// InitiateCheckout and Purchase) uses the same id, name and price.
const PRODUCT_EVENTS = Object.values(collections).reduce((events, item) => {
  const payload = {
    value: Number(String(item.price).replace(',', '.')),
    currency: 'EUR',
    content_name: item.name,
    content_ids: [item.id],
    content_type: 'product',
  };
  events.viewContent[`/${item.slug}/`] = payload;
  events.purchase[`/compra-confirmada/${item.id}/`] = payload;
  return events;
}, { viewContent: {}, purchase: {} });

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

export default function MetaPixel() {
  const pathname = usePathname();
  const route = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') + '/';
  const firstPage = useRef(true);
  const purchaseFired = useRef(new Set());
  const lastViewContentRoute = useRef(null);
  const [ready, setReady] = useState(false);

  // Initialize on mount if consent was already granted.
  useEffect(() => {
    if (window.localStorage.getItem('mc-cookie-consent') !== 'accepted') return;
    installPixel();
    setReady(true);
  }, [pathname]);

  // If consent is granted later in the session (no reload), initialize immediately.
  useEffect(() => {
    const onAccept = () => {
      if (window.localStorage.getItem('mc-cookie-consent') !== 'accepted') return;
      installPixel();
      setReady(true);
    };
    window.addEventListener('mc-consent-accepted', onAccept);
    return () => window.removeEventListener('mc-consent-accepted', onAccept);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname, ready]);

  useEffect(() => {
    const purchase = PRODUCT_EVENTS.purchase[route];
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
    window.fbq?.('track', 'Purchase', purchase);
  }, [route, ready]);

  useEffect(() => {
    const item = PRODUCT_EVENTS.viewContent[route];
    if (!ready || !item) {
      lastViewContentRoute.current = null;
      return;
    }
    if (lastViewContentRoute.current === route) return;
    lastViewContentRoute.current = route;
    window.fbq?.('track', 'ViewContent', item);
  }, [route, ready]);

  return null;
}
