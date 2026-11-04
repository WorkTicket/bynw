import Link from 'next/link';
import { Brand } from '../../components/Header';
import { pageMetadata } from '../../lib/site';
import '../../app/globals.css';

export const metadata = pageMetadata({ title: 'Bienvenida al club creativo', description: 'Confirma tu suscripción al club creativo de Manos Creativas.', path: '/gracias/', noIndex: true });

export default function Page() { return <main className="lead-thanks"><div className="lead-thanks-card"><Link href="/"><Brand /></Link><span className="lead-thanks-icon">✓</span><span className="kicker">YA ESTÁS DENTRO</span><h1>Bienvenida al<br /><span>club creativo.</span></h1><p>Hemos recibido tu solicitud. Revisa tu bandeja de entrada para confirmar tu suscripción y no te olvides de mirar en promociones o spam.</p><Link className="button" href="/">Volver a Manos Creativas <span>↗</span></Link></div></main>; }
