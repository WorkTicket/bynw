'use client';

import { useEffect } from 'react';

const META_BROWSER = /FBAN|FBAV|FB_IAB|Instagram|Messenger/i;

export default function MetaBrowserOptimizer() {
  useEffect(() => {
    if (!META_BROWSER.test(navigator.userAgent)) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const viewport = window.visualViewport;
    const updateViewport = () => {
      root.style.setProperty('--meta-viewport-height', `${Math.round(viewport?.height || window.innerHeight)}px`);
    };

    body.classList.add('meta-in-app-browser');
    updateViewport();
    viewport?.addEventListener('resize', updateViewport, { passive: true });
    window.addEventListener('orientationchange', updateViewport, { passive: true });

    return () => {
      body.classList.remove('meta-in-app-browser');
      root.style.removeProperty('--meta-viewport-height');
      viewport?.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return null;
}
