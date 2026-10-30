'use client';
import { useState } from 'react';
import Link from 'next/link';
export function Brand({ light = false, footer = false }) {
  const logo = footer ? '/optimized/assets/brand-footer-160.webp' : '/optimized/assets/brand-navbar-160.webp';
  return <Link href="/" className={`brand ${light ? 'brand-light' : ''} ${footer ? 'brand-footer' : ''}`} aria-label="Manos Creativas Bynmw, inicio"><img src={logo} srcSet={!footer ? '/optimized/assets/brand-navbar-80.webp 80w, /optimized/assets/brand-navbar-160.webp 160w' : undefined} sizes={!footer ? '56px' : undefined} width={160} height={160} alt="" {...(footer ? { loading: 'lazy', decoding: 'async' } : { decoding: 'async' })} />{!footer && <span className="brand-wordmark"><strong>Manos Creativas</strong><small>Bynmw</small></span>}</Link>;
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Inicio', '/'], ['Colecciones', '/#colecciones'], ['Testimonios', '/testimonios/'], ['Sobre nosotras', '/sobre-nosotras/'], ['Contacto', '/contacto/']];
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><div className="offer-bar"><strong>PATRONES EN PDF</strong><span>Descarga al momento</span><span className="offer-star">✦</span><span>Acceso de por vida</span></div><header className="site-header"><div className="container nav-row"><Brand /><nav className="desktop-nav" aria-label="Navegación principal">{links.map(([label, href]) => <Link key={href} href={href} prefetch={false}>{label}</Link>)}</nav><Link className="button button-small header-cta" href="/#colecciones" prefetch={false}>VER COLECCIONES <span>↗</span></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? '×' : '☰'}</button></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Menú móvil">{links.map(([label, href]) => <Link key={href} href={href} prefetch={false} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}</nav>}</header></>;
}
