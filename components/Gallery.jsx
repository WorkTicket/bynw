'use client';
import { useState } from 'react';
import { projects } from '../lib/projects';
import Lightbox from './Lightbox';
export default function Gallery({ ids }) {
  const [filter, setFilter] = useState('Todos');
  const list = ids ? projects.filter(p => ids.includes(p.id)) : projects.filter(p => ![64, 69, 70, 75].includes(p.id));
  const shown = list.filter(p => filter === 'Todos' || p.category === filter);
  return <>{!ids && <div className="gallery-filters" role="group" aria-label="Filtrar proyectos">{['Todos', 'Princesas', 'Flores', 'Amigurumis'].map(name => <button key={name} onClick={() => setFilter(name)} aria-pressed={filter === name} className={filter === name ? 'active' : ''}>{name}</button>)}</div>}<div className="project-grid">{shown.map(p => <Lightbox key={p.id} src={`/optimized/assets/preview-${p.id}.webp`} caption={`${p.name} · Ejemplo de proyecto terminado`} className="project-tile"><span className="project-image"><img src={`/optimized/assets/preview-${p.id}.webp`} alt={p.name} loading="lazy" decoding="async" /></span><span className="project-caption">{p.name}<b>＋</b></span></Lightbox>)}</div></>;
}
