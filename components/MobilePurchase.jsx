'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function Arrow() {
  return <span className="mobile-purchase-arrow" aria-hidden="true">↗</span>;
}

export default function MobilePurchase({ collection, whatsappHref }) {
  const [pastHero, setPastHero] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('main > section:first-child');
    const footer = document.querySelector('footer.footer');
    let frame = 0;

    const update = () => {
      frame = 0;
      setPastHero(!hero || hero.getBoundingClientRect().bottom <= 0);
      setNearFooter(Boolean(footer && footer.getBoundingClientRect().top <= window.innerHeight + 120));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pastHero && !nearFooter;
  const contact = whatsappHref || '/contacto/';

  return <div className={`mobile-purchase ${visible ? 'mobile-purchase-visible' : ''}`} aria-hidden={!visible}>
    <a className="mobile-whatsapp" href={contact} aria-label="Hablar con Natalia por WhatsApp" tabIndex={visible ? 0 : -1}>
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1C18.7 23.7 24 18.4 24 11.9c0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.1.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.4-.3-.7-.4Z" /></svg>
      <span>WHATSAPP</span>
    </a>
    {collection
      ? <a className="button buy-button" href={collection.checkout} rel="noopener noreferrer sponsored" tabIndex={visible ? 0 : -1}>COMPRAR · {collection.price} €<Arrow /></a>
      : <Link className="button" href="/#colecciones" tabIndex={visible ? 0 : -1}>ELIGE TU COLECCIÓN<Arrow /></Link>}
  </div>;
}
