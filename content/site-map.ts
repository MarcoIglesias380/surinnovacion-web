export type SiteSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stage: "base" | "visual" | "content" | "conversion";
  bullets: string[];
};

export const navItems = [
  { label: "Impacto", href: "#impacto-visual" },
  { label: "Nosotros", href: "#marco" },
  { label: "Blog Tech", href: "#blog" },
  { label: "Contacto", href: "#contacto" }
];

export const siteSections: SiteSection[] = [
  {
    id: "hero",
    eyebrow: "SurInnovacion Lab",
    title: "El futuro de tu empresa se construye con Inteligencia Artificial",
    description:
      "Integramos IA, automatizacion y tecnologia de vanguardia para transformar procesos, escalar negocios y convertir ideas en soluciones reales.",
    stage: "visual",
    bullets: ["Hero principal", "Autoridad de Marco Iglesias", "CTA doble", "Visual IA vivo"]
  },
  {
    id: "confianza",
    eyebrow: "Desde Puerto Montt, Chile",
    title: "Proyectos reales que ya estan en marcha",
    description:
      "Proyectos publicos creados o impulsados por SurInnovacion para vender mejor, mostrar una marca, ordenar procesos y crear experiencias digitales utiles.",
    stage: "base",
    bullets: ["EventDash POS", "Eventos IA", "Columba Boutique", "Marco Iglesias", "Distribuidora Oriente", "Marca Visible"]
  },
  {
    id: "problema-solucion",
    eyebrow: "Estrategia comercial",
    title: "La innovacion ya no es opcional",
    description:
      "Contraste claro entre procesos manuales y soluciones practicas con IA, automatizacion y diseno digital avanzado.",
    stage: "content",
    bullets: ["Procesos manuales", "Atencion lenta", "Asistentes IA", "Sistemas conectados"]
  },
  {
    id: "impacto-visual",
    eyebrow: "Impacto visual",
    title: "Ideas que se transforman en tecnologia real",
    description:
      "Seccion editorial limpia para reforzar la transformacion de ideas en tecnologia funcional.",
    stage: "visual",
    bullets: ["Idea", "IA aplicada", "Producto digital"]
  },
  {
    id: "marco",
    eyebrow: "Fundador",
    title: "Marco Iglesias",
    description:
      "Master en IA, divulgador de inteligencia artificial y fundador de SurInnovacion.",
    stage: "content",
    bullets: ["Perfil profesional", "Foto o avatar", "Origen sur de Chile", "Boton conocer mas"]
  },
  {
    id: "blog",
    eyebrow: "Divulgacion IA",
    title: "Blog Tech y divulgacion IA",
    description:
      "Cards con noticias actuales y fuentes externas verificables mientras no existan articulos internos.",
    stage: "content",
    bullets: ["OpenAI", "Anthropic", "Vercel", "IA aplicada"]
  },
  {
    id: "contacto",
    eyebrow: "CTA final",
    title: "Haz que la IA trabaje para ti",
    description:
      "Formulario simple y acceso a WhatsApp para solicitar diagnostico gratuito.",
    stage: "conversion",
    bullets: ["Nombre", "Correo", "WhatsApp", "Mensaje breve"]
  }
];
