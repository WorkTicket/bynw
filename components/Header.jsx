'use client';
import { useState } from 'react';
import Link from 'next/link';
export function Brand({ light = false, footer = false }) {
  const logo = footer ? '/manos-creativas-footer.webp' : '/manos-creativas-navbar.webp';
  const size = footer ? 512 : 256;
  return <Link href="/" className={`brand ${light ? 'brand-light' : ''} ${footer ? 'brand-footer' : ''}`} aria-label="Manos Creativas Bynmw, inicio"><img src={logo} width={size} height={size} alt="" /></Link>;
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Inicio', '/'], ['Colecciones', '/#colecciones'], ['Testimonios', '/testimonios/'], ['Sobre nosotras', '/sobre-nosotras/'], ['Contacto', '/contacto/']];
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><div className="offer-bar"><strong>PATRONES EN PDF</strong><span>Descarga al momento</span><span className="offer-star">✦</span><span>Acceso de por vida</span></div><header className="site-header"><div className="container nav-row"><Brand /><nav className="desktop-nav" aria-label="Navegación principal">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><Link className="button button-small header-cta" href="/#colecciones">VER COLECCIONES <span>↗</span></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? '×' : '☰'}</button></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Menú móvil">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}</nav>}</header></>;
}
