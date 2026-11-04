import Link from 'next/link';
import { Brand } from '../../components/Header';
import LeadCapture from '../../components/LeadCapture';
import { pageMetadata } from '../../lib/site';
import '../../app/globals.css';

export const metadata = pageMetadata({ title: 'Club creativo gratuito', description: 'Únete al club creativo de Manos Creativas y recibe inspiración, ideas y novedades de crochet.', path: '/recursos-gratis/' });

export default function Page() { return <main className="lead-landing"><div className="lead-nav"><Link href="/"><Brand /></Link><Link href="/" className="lead-back">Volver a la tienda</Link></div><section className="lead-hero"><div className="lead-copy"><span className="kicker">CLUB CREATIVO · GRATUITO</span><h1>Más ideas.<br /><span>Más momentos para crear.</span></h1><p>Una carta mensual para tejedoras que disfrutan crear con sus manos: inspiración, ideas de proyectos y novedades de Manos Creativas, sin ruido.</p><LeadCapture /><small className="lead-assurance">✓ Gratis · ✓ Sin spam · ✓ Puedes darte de baja en cualquier momento</small></div><div className="lead-art"><div className="lead-art-card"><span>PARA TU PRÓXIMO PROYECTO</span><strong>Decora<br />Diseña<br /><em>Crea</em></strong><i>✦</i></div><div className="lead-art-orbit" /></div></section><section className="lead-benefits"><div><b>01</b><h2>Inspiración que sí apetece abrir</h2><p>Ideas seleccionadas para que siempre tengas un proyecto bonito esperándote.</p></div><div><b>02</b><h2>Consejos claros y útiles</h2><p>Pequeños trucos de crochet explicados sin complicaciones.</p></div><div><b>03</b><h2>Novedades primero</h2><p>Conoce nuevas colecciones y contenidos antes que nadie.</p></div></section></main>; }
