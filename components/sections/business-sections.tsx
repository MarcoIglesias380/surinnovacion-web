import {
  ArrowRight,
  CalendarCheck,
  Send,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { ShaderBackground } from "@/components/ui/shader-background";

const phoneHref = "https://wa.me/56992891678";

const posts = [
  {
    title: "IA en empresas: de experimento a herramienta diaria",
    category: "IA aplicada",
    date: "6 ago. 2026",
    excerpt: "OpenAI muestra como la IA ya esta pasando del laboratorio a tareas reales de trabajo. Para una empresa, la pregunta deja de ser si probar IA y pasa a ser donde aplicarla con criterio.",
    href: "https://openai.com/index/how-the-world-is-putting-chatgpt-to-work/"
  },
  {
    title: "Seguridad y agentes: el nuevo estandar operativo",
    category: "Ciberseguridad IA",
    date: "30 jul. 2026",
    excerpt: "Anthropic publico investigaciones sobre incidentes reales en evaluaciones de ciberseguridad. Automatizar tareas sensibles exige controles, trazabilidad y revision humana.",
    href: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals"
  },
  {
    title: "Modelos, costos y decisiones inteligentes",
    category: "Estrategia tecnologica",
    date: "13 jul. 2026",
    excerpt: "El AI Gateway Production Index de Vercel refuerza una idea clave: elegir modelos segun costo, volumen y riesgo puede ser tan importante como elegir la herramienta.",
    href: "https://vercel.com/blog/ai-gateway-production-index-july-2026"
  }
];

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs uppercase tracking-[0.2em] text-ion/82 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-ion shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-frost/66 md:text-lg">{description}</p>
    </div>
  );
}

export function FounderSection() {
  return (
    <section id="marco" className="founder-bay-section relative min-h-[700px] overflow-hidden border-y border-white/10 px-5 py-24 md:min-h-[820px] md:py-32">
      <Image
        src="/sections/fundador-bahia-marco-v3.png"
        alt="Marco Iglesias mirando la bahia desde el sur de Chile"
        fill
        sizes="100vw"
        className="founder-bay-image object-cover"
        priority={false}
      />
      <div className="founder-bay-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[calc(700px-12rem)] max-w-[1180px] items-end md:min-h-[calc(820px-16rem)]">
        <div className="founder-bay-copy max-w-[520px]">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
            Marco Iglesias
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-frost/82 md:text-base">
            Master en Inteligencia Artificial, Divulgador de la IA y fundador de SurInnovacion.
          </p>
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section id="blog" className="relative border-y border-white/10 px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-[1180px]">
        <SectionIntro
          eyebrow="Divulgacion IA"
          title="Blog Tech y divulgacion IA"
          description="Ideas, aprendizajes, herramientas y reflexiones para entender como la inteligencia artificial esta cambiando los negocios y la creatividad."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="blog-card group">
              <div className="mb-7 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-frost/44">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight text-white">{post.title}</h3>
              <p className="mt-5 text-sm leading-7 text-frost/62">{post.excerpt}</p>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ion"
              >
                Leer fuente
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className="relative min-h-[calc(100svh-88px)] overflow-hidden px-5 py-24 md:py-32">
      <ShaderBackground className="opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(2,6,23,0.12),rgba(2,6,23,0.56)_58%,#020617_100%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.08)_42%,#020617_96%)]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-280px)] max-w-[1180px] items-center justify-center">
        <div className="contact-form-panel contact-form-panel--transparent w-full max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-200/18 bg-white/[0.07] text-ion">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-semibold text-white">Solicitar diagnostico gratuito</h3>
          </div>
          <form className="grid gap-4">
            <input className="contact-input" type="text" name="name" placeholder="Nombre" />
            <input className="contact-input" type="email" name="email" placeholder="Correo" />
            <input className="contact-input" type="tel" name="whatsapp" placeholder="Tu WhatsApp" />
            <textarea className="contact-input min-h-32 resize-none" name="message" placeholder="Mensaje breve" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={phoneHref} target="_blank" rel="noreferrer" className="liquid-button flex-1">
                Hablar por WhatsApp
                <Send className="h-4 w-4" aria-hidden="true" />
              </a>
              <button type="button" className="glass-secondary-button flex-1">
                Preparar solicitud
                <CalendarCheck className="h-4 w-4 text-ion" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
