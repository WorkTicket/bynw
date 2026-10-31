'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const PIXEL_ID = '1937320463558405';
const SRC = 'https://connect.facebook.net/en_US/fbevents.js';
const LOAD_DELAY = 8000;
const PURCHASES = {
  '/compra-confirmada/princesas/': { value: 9.90, name: 'Patrones de Princesas de Cuento', id: 'princesas' },
  '/compra-confirmada/premium/': { value: 14.87, name: 'Colección Premium · 1.000+ patrones', id: 'premium' },
};

function installPixel() {
  if (window.fbq) return;
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
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstPage = useRef(true);
  const purchaseFired = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer;
    let loaded = false;
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

    const load = () => {
      if (loaded) return;
      loaded = true;
      events.forEach(event => window.removeEventListener(event, load));
      window.clearTimeout(timer);
      installPixel();
      setReady(true);
    };

    events.forEach(event => window.addEventListener(event, load, { once: true, passive: true }));
    // Keep analytics light during the initial render; load on real engagement or shortly after.
    timer = window.setTimeout(load, LOAD_DELAY);

    return () => {
      events.forEach(event => window.removeEventListener(event, load));
      window.clearTimeout(timer);
    };
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
    const purchase = PURCHASES[pathname];
    if (!ready || !purchase || purchaseFired.current) return;
    purchaseFired.current = true;
    window.fbq?.('track', 'Purchase', {
      value: purchase.value,
      currency: 'EUR',
      content_name: purchase.name,
      content_ids: [purchase.id],
      content_type: 'product',
    });
  }, [pathname, ready]);

  return <noscript><img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} alt="" /></noscript>;
}
