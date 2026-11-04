const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

function validEmail(value) { return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254; }

async function saveLead(request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Solicitud no válida.' }, 400); }
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!name || !validEmail(email) || body.consent !== true) return json({ error: 'Completa tu nombre, un email válido y acepta el consentimiento.' }, 400);
  if (!env.DB) return json({ error: 'La captación todavía no está configurada.' }, 503);
  const now = new Date().toISOString();
  await env.DB.prepare('INSERT INTO leads (email, name, source, consent_at, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = excluded.name, source = excluded.source, consent_at = excluded.consent_at, updated_at = excluded.updated_at').bind(email, name, String(body.source || '/').slice(0, 200), now, now).run();
  if (env.RESEND_API_KEY && env.LEAD_FROM_EMAIL) {
    await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.LEAD_FROM_EMAIL, to: email, subject: 'Bienvenida al club creativo · Manos Creativas', html: `<p>Hola ${name},</p><p>Gracias por unirte al club creativo de Manos Creativas. Pronto recibirás inspiración, ideas y novedades para tus próximos proyectos.</p><p>Un abrazo,<br />Natalia</p>` }) });
  }
  return json({ ok: true });
}

export default { async fetch(request, env) { const url = new URL(request.url); if (url.pathname === '/api/leads') { if (request.method === 'OPTIONS') return new Response(null, { status: 204 }); if (request.method !== 'POST') return json({ error: 'Método no permitido.' }, 405); try { return await saveLead(request, env); } catch (error) { console.error(error); return json({ error: 'No hemos podido guardar tus datos. Inténtalo de nuevo.' }, 500); } } return env.ASSETS.fetch(request); } };
