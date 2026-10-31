'use client';

import { useEffect } from 'react';

// Facebook and Instagram use several UA formats across iOS and Android.
const META_BROWSER = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|Messenger/i;

export default function MetaBrowserOptimizer() {
  useEffect(() => {
    if (!META_BROWSER.test(navigator.userAgent)) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const viewport = window.visualViewport;
    let frame = 0;
    const updateViewport = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--meta-viewport-height', `${Math.round(viewport?.height || window.innerHeight)}px`);
        root.style.setProperty('--meta-viewport-width', `${Math.round(viewport?.width || window.innerWidth)}px`);
      });
    };

    root.classList.add('meta-in-app-browser');
    body.classList.add('meta-in-app-browser');
    updateViewport();
    viewport?.addEventListener('resize', updateViewport, { passive: true });
    viewport?.addEventListener('scroll', updateViewport, { passive: true });
    window.addEventListener('resize', updateViewport, { passive: true });
    window.addEventListener('orientationchange', updateViewport, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('meta-in-app-browser');
      body.classList.remove('meta-in-app-browser');
      root.style.removeProperty('--meta-viewport-height');
      root.style.removeProperty('--meta-viewport-width');
      viewport?.removeEventListener('resize', updateViewport);
      viewport?.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return null;
}
