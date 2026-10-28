export const email = 'bynw808@gmail.com';
export const collections = {
  princesas: {
    slug: 'coleccion-princesas', name: 'Patrones de Princesas de Cuento', short: 'Princesas',
    eyebrow: 'PERSONAJES QUE COBRAN VIDA', price: '9,90',
    checkout: 'https://pay.hotmart.com/L104751068L?checkoutMode=2&off=8o21yf1f',
    preview: '/optimized/assets/bundle-princesas.webp', previewWidth: 1122, previewHeight: 1402,
    description: 'Más de 200 patrones de princesas de cuento en PDF, con instrucciones claras y fotos en cada paso. Ideal para principiantes que quieren muñecas con vestidos, peinados y detalles limpios.',
    benefits: ['Patrones digitales en español', 'Vestidos, peinados y detalles especiales', 'Regalos digitales incluidos sin coste adicional'],
    samples: [85, 86, 88], projects: [0, 1, 4, 65, 64, 69, 70, 75],
  },
  premium: {
    slug: 'coleccion-premium', name: 'Premium · 1.000+ patrones', short: 'Premium',
    eyebrow: 'TU PRÓXIMA IDEA ESTÁ AQUÍ', price: '14,87',
    checkout: 'https://pay.hotmart.com/M107585787E?checkoutMode=2&off=adgh77y6',
    preview: '/optimized/assets/bundle-1000.webp', previewWidth: 1145, previewHeight: 1374,
    description: 'La Colección Premium es un compendio digital diseñado para artesanas que buscan elevar la calidad de sus creaciones en crochet. Con más de 1.000 patrones únicos, este material técnico proporciona instrucciones detalladas para la elaboración de personajes icónicos, garantizando acabados de alta gama y resultados consistentes.',
    benefits: ['Más de 1.000 patrones digitales', 'Una gran variedad de estilos y proyectos', 'Archivos organizados en carpetas de Google Drive'],
    samples: [43, 49, 50], projects: [5, 6, 7, 18, 30, 31, 32, 33],
  },
};
export const projects = [
  { id: 0, name: 'Princesa sirena', category: 'Princesas' },
  { id: 1, name: 'Mérida', category: 'Princesas' },
  { id: 4, name: 'Cenicienta', category: 'Princesas' },
  { id: 65, name: 'Alicia', category: 'Princesas' },
  { id: 64, name: 'Tiana', category: 'Princesas' },
  { id: 69, name: 'Moana', category: 'Princesas' },
  { id: 70, name: 'Anna', category: 'Princesas' },
  { id: 75, name: 'Jasmine', category: 'Princesas' },
  { id: 30, name: 'Girasoles', category: 'Flores' },
  { id: 31, name: 'Margaritas', category: 'Flores' },
  { id: 32, name: 'Rosas', category: 'Flores' },
  { id: 33, name: 'Flores violetas', category: 'Flores' },
  { id: 5, name: 'Unicornio', category: 'Amigurumis' },
  { id: 6, name: 'Vaquitas', category: 'Amigurumis' },
  { id: 7, name: 'Plantas', category: 'Amigurumis' },
  { id: 18, name: 'Profesiones', category: 'Amigurumis' },
];
export { reviews } from './reviews';
export const bonuses = [
  [53, 'Guía de abreviaturas'], [54, 'Amigurumis: muñecos y juguetes'],
  [55, 'Rosa Virgen'], [56, 'Rosa Rapunzel'], [57, 'Flores amigurumi'],
  [58, 'Animalitos amigurumis'], [59, 'Burrito azul'], [60, 'Crochet amigurumi · Volumen 2'],
  [61, 'Guía de puntos'], [62, 'Ideas para celebrar'], [63, 'Muñeca flor reversible'],
];
export const faqs = [
  ['¿Recibiré un muñeco o un paquete en casa?', 'No. Compras patrones digitales en PDF para tejer tus propias creaciones. No se realiza ningún envío físico.'],
  ['¿Cómo recibo los patrones?', 'Tras la confirmación del pago, recibirás un correo con el acceso. Los archivos están organizados en carpetas de Google Drive para que puedas consultarlos y descargarlos.'],
  ['¿Puedo verlos en el móvil o imprimirlos?', 'Sí. Puedes guardar los PDF, consultarlos en el móvil, la tablet o el ordenador e imprimirlos si te resulta más cómodo.'],
  ['¿Necesito saber tejer?', 'Conviene conocer los puntos básicos de crochet. La dificultad varía según el proyecto; mira las muestras reales antes de elegir tu colección.'],
  ['¿Qué garantía tiene mi compra?', 'Tu compra tiene una garantía de 7 días. Si los patrones no te convencen, te devolvemos el dinero. Escribe a bynw808@gmail.com para recibir ayuda con tu pedido.'],
  ['He comprado y no encuentro el correo, ¿qué hago?', 'Busca el correo de confirmación de Hotmart y comprueba spam y promociones. Usa el mismo email con el que compraste. Si necesitas ayuda, escribe a Natalia a bynw808@gmail.com.'],
];

export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
export const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;
