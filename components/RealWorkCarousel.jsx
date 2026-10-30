'use client';

import { useRef } from 'react';
import { reviews } from '../lib/reviews';

const displayOrder = [
  'seed-01-ines-ruiz',
  'seed-18-sofia-blanco',
  'seed-52-celia-romano',
  'seed-34-paula-delgado',
  'seed-12-aitana-lopez',
  'seed-48-marta-quintero',
  'seed-10-silvia-ramos',
  'seed-28-veronica-soler',
  'seed-27-sara-benitez',
  'seed-07-patricia-gil',
  'seed-51-lola-marquez',
  'seed-16-paula-campos',
  'seed-09-marina-ortega',
  'seed-23-miriam-leon',
];

const cityById = {
  'seed-01-ines-ruiz': 'Madrid',
  'seed-18-sofia-blanco': 'A Coruña',
  'seed-52-celia-romano': 'Valencia',
  'seed-34-paula-delgado': 'Ávila',
  'seed-12-aitana-lopez': 'Pamplona',
  'seed-48-marta-quintero': 'Mérida',
  'seed-10-silvia-ramos': 'Granada',
  'seed-28-veronica-soler': 'Burgos',
  'seed-27-sara-benitez': 'Cádiz',
  'seed-07-patricia-gil': 'Bilbao',
  'seed-51-lola-marquez': 'Málaga',
  'seed-16-paula-campos': 'Salamanca',
  'seed-09-marina-ortega': 'Alicante',
  'seed-23-miriam-leon': 'Jaén',
};

const work = displayOrder.map(id => {
  const review = reviews.find(item => item.id === id);
  return { ...review, city: cityById[id] };
});

export default function RealWorkCarousel() {
  const track = useRef(null);

  function move(direction) {
    const distance = Math.max(280, track.current?.clientWidth || 0);
    track.current?.scrollBy({ left: direction * distance, behavior: 'smooth' });
  }

  return <section className="section real-work-section" aria-labelledby="real-work-title">
    <div className="container">
      <div className="real-work-heading">
        <div><span className="kicker"><span>✦</span> Trabajos reales</span><h2 id="real-work-title">Hecho con nuestros<br /><span>patrones</span></h2><p>Fotos que nos envían artesanas después de tejer. Cada una con su propio toque.</p></div>
        <div className="carousel-controls" aria-label="Controles de trabajos reales">
          <button type="button" onClick={() => move(-1)} aria-label="Ver fotos anteriores">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Ver más fotos">→</button>
        </div>
      </div>
      <div className="real-work-carousel">
        <ul className="real-work-track" ref={track}>
          {work.map(item => <li className="real-work-card" key={item.id}>
            <figure>
              <img src={item.image} alt={`Trabajo terminado de ${item.name}`} loading="lazy" />
              <figcaption><b>{item.name}</b><small>{item.city}</small></figcaption>
            </figure>
          </li>)}
        </ul>
      </div>
      <p className="carousel-hint"><span>14 trabajos reales</span><b>Desliza para descubrirlos →</b></p>
    </div>
  </section>;
}
