'use client';

import { useState } from 'react';

export default function LeadCapture({ compact = false }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    const form = event.currentTarget;
    const data = { name: form.name.value.trim(), email: form.email.value.trim(), consent: form.consent.checked, source: window.location.pathname };
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No hemos podido guardar tus datos.');
      window.location.href = '/gracias/';
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return <form className={`lead-form ${compact ? 'lead-form-compact' : ''}`} onSubmit={submit}>
    <div className="lead-form-fields"><label><span>Tu nombre</span><input name="name" type="text" autoComplete="given-name" placeholder="¿Cómo te llamas?" required /></label><label><span>Tu email</span><input name="email" type="email" autoComplete="email" placeholder="tu@email.com" required /></label><button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'ENVIANDO…' : 'QUIERO UNIRME'}<span>↗</span></button></div>
    <label className="lead-consent"><input name="consent" type="checkbox" required /><span>Acepto recibir inspiración, novedades y ofertas de Manos Creativas. Puedo darme de baja cuando quiera. Consulta la <a href="/privacidad/">política de privacidad</a>.</span></label>
    {status === 'error' && <p className="lead-error" role="alert">{message}</p>}
  </form>;
}
