'use client';

import { useEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox';

const ASSET_ROOT = '/optimized/Crochet-Shop-Website-Images';

function belongsTo(label, category, kind) {
  const value = label.toLowerCase();
  if (category === 'Ver todo') return true;

  if (kind === 'princesas') {
    if (category === 'Princesas') return true;
    if (category === 'Vestidos') return /tiana|bella|anna|jasmine|cenicienta/.test(value);
    if (category === 'Peinados') return /alicia|ariel|mérida|moana|mulan|jasmine/.test(value);
    if (category === 'Parejas') return /pareja/.test(value);
    if (category === 'Detalles') return /ariel|mérida|moana|mulan/.test(value);
  }

  if (category === 'Princesas') return /princesa|sirena|arquera|rapunzel|blancanieves|cenicienta|alicia/.test(value);
  if (category === 'Muñecas') return /muñeca|amigas|hada/.test(value);
  if (category === 'Flores') return /flor|ramo|plantas/.test(value);
  if (category === 'Navidad') return /navidad|santa|cascanueces|nacimiento|jengibre/.test(value);
  if (category === 'Halloween') return /bruja|calabaza/.test(value);
  if (category === 'Profesiones') return /ingenieras|bombero|profesional/.test(value);
  if (category === 'Santos') return /virgen|santo|ángel/.test(value);
  if (category === 'Amigurumis') return /unicornio|vacas|burrito|animal/.test(value);
  if (category === 'Más diseños') return false;
  return true;
}

export default function ProductCarousel({ files, folder, type = 'product', categories, kind, title, subtitle }) {
  const track = useRef(null);
  const [active, setActive] = useState('Ver todo');
  const [range, setRange] = useState({ start: 1, end: 1 });

  const visibleFiles = type === 'product'
    ? files.filter(file => active === 'Ver todo' || (Array.isArray(file) && file[3] === active) || belongsTo(Array.isArray(file) ? file[1] : file, active, kind))
    : files;

  useEffect(() => {
    if (type !== 'delivery') return undefined;
    const interval = window.setInterval(() => {
      const element = track.current;
      if (!element) return;
      const card = element.querySelector('.cp-carousel-card');
      const step = (card?.getBoundingClientRect().width || element.clientWidth) + 16;
      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 8;
      element.scrollTo({ left: atEnd ? 0 : element.scrollLeft + step, behavior: 'smooth' });
    }, 20000);
    return () => window.clearInterval(interval);
  }, [type, visibleFiles.length]);

  useEffect(() => {
    const element = track.current;
    if (!element) return undefined;

    function updateRange() {
      const card = element.querySelector('.cp-carousel-card');
      if (!card) {
        setRange({ start: 0, end: 0 });
        return;
      }
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      const visibleCount = Math.max(1, Math.floor((element.clientWidth + gap + 1) / step));
      const firstIndex = Math.min(visibleFiles.length - 1, Math.max(0, Math.round(element.scrollLeft / step)));
      const next = { start: firstIndex + 1, end: Math.min(visibleFiles.length, firstIndex + visibleCount) };
      setRange(current => current.start === next.start && current.end === next.end ? current : next);
    }

    updateRange();
    element.addEventListener('scroll', updateRange, { passive: true });
    const observer = new ResizeObserver(updateRange);
    observer.observe(element);
    return () => {
      element.removeEventListener('scroll', updateRange);
      observer.disconnect();
    };
  }, [visibleFiles.length]);

  function selectCategory(category) {
    if (category === 'Regalos extra') {
      document.querySelector('.cp-gifts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setActive(category);
    requestAnimationFrame(() => track.current?.scrollTo({ left: 0, behavior: 'smooth' }));
  }

  function move(direction) {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector('.cp-carousel-card');
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = (card?.getBoundingClientRect().width || element.clientWidth) + gap;
    const visibleCount = Math.max(1, Math.floor((element.clientWidth + gap + 1) / step));
    element.scrollBy({ left: direction * step * visibleCount, behavior: 'smooth' });
  }

  const isSmallCollection = type === 'product' && visibleFiles.length <= 2;

  return <div className={`cp-carousel cp-carousel-${type} ${isSmallCollection ? 'cp-carousel-few' : ''}`}>
    {categories && <div className="cp-category-row" role="group" aria-label="Filtrar diseños">
      {['Ver todo', ...categories].map(category => <button key={category} type="button" className={active === category ? 'active' : ''} aria-pressed={active === category} onClick={() => selectCategory(category)}>{category}</button>)}
    </div>}
    <div className="cp-carousel-controls">
      <span className="cp-carousel-control-copy"><strong>{title || 'Desliza para explorar'}</strong>{subtitle && <small>{subtitle}</small>}</span>
      <div className="cp-carousel-actions">
        <span className="cp-carousel-count" aria-live="polite"><b>{range.start}{range.end > range.start ? `–${range.end}` : ''}</b><small>de {visibleFiles.length}</small></span>
        <button type="button" onClick={() => move(-1)} aria-label="Ver elementos anteriores">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Ver más elementos">→</button>
      </div>
    </div>
    <div className="cp-carousel-track" ref={track}>
      {visibleFiles.map((file) => {
        const [name, label, customFolder] = Array.isArray(file) ? file : [file, 'Biblioteca digital'];
        const src = customFolder ? `/${customFolder}/${name}` : `${ASSET_ROOT}/${folder}/${name}`;
        const visualOnly = type === 'delivery' || type === 'gift' || type === 'quality';
        return <Lightbox key={name} src={src} caption={`${label} · Imagen real de la colección`} className={`cp-asset-card cp-carousel-card ${visualOnly ? 'cp-asset-visual' : ''}`}>
          <span className="cp-asset-image"><img src={src} alt={label} loading="lazy" /></span>
          {visualOnly
            ? <span className="cp-asset-overlay">{type === 'gift' ? 'Ver regalo' : 'Ver en detalle'} <b aria-hidden="true">↗</b></span>
            : <span className="cp-asset-label"><span>{label}</span><small>Ver diseño <b aria-hidden="true">↗</b></small></span>}
        </Lightbox>;
      })}
    </div>
  </div>;
}
