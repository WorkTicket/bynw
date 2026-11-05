'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = window.localStorage.getItem('mc-cookie-consent');
    // Only show banner on first visit (no consent stored yet)
    setVisible(consent === null);
  }, []);
  function accept() {
    window.localStorage.setItem('mc-cookie-consent', 'accepted');
    setVisible(false);
    window.dispatchEvent(new Event('mc-consent-accepted'));
  }
  if (!visible) return null;
  return <aside className="cookie-consent" role="dialog" aria-label="Preferencias de cookies"><div><strong>Tu privacidad importa</strong><p>Usamos cookies analíticas y de marketing, incluido Meta Pixel, solo con tu permiso. Puedes consultar la <a href="/cookies/">política de cookies</a>.</p></div><button onClick={accept}>Aceptar cookies</button><button className="cookie-reject" onClick={() => { window.localStorage.setItem('mc-cookie-consent', 'rejected'); setVisible(false); }}>Solo necesarias</button></aside>;
}
