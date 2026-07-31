export const faqs = [
  {
    q: "¿Necesito experiencia previa en crochet o ganchillo?",
    a: "No hace falta. Cada colección trae vídeos para principiantes donde repasamos abreviaturas y puntadas básicas. Con eso ya puedes seguir los patrones.",
  },
  {
    q: "¿Cómo recibo los patrones después de comprar?",
    a: "En cuanto se confirme el pago te llega un correo electrónico (e-mail) con el enlace para descargar todos los PDF. El acceso no caduca.",
  },
  {
    q: "¿Qué métodos de pago aceptáis?",
    a: "Los pagos pasan por Hotmart. Puedes pagar con tarjeta, PayPal, Klarna y otros métodos según tu país.",
  },
  {
    q: "¿Puedo imprimir los patrones?",
    a: "Sí, están en PDF listos para imprimir. También puedes consultarlos en el móvil, la tablet o el ordenador.",
  },
  {
    q: "¿Hay garantía de satisfacción?",
    a: "Sí. Tienes 7 días para pedir la devolución si los patrones no encajan contigo.",
  },
  {
    q: "¿Tenéis soporte si tengo dudas?",
    a: "Sí. Natalia responde por WhatsApp en menos de 24h si te atascas con algún patrón o técnica.",
  },
] as const

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}
