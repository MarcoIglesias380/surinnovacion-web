"use client";

import {
  ExternalLink,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ShaderBackground } from "@/components/ui/shader-background";

const phoneHref = "https://wa.me/56992891678";

const posts = [
  {
    title: "IA en empresas: de experimento a herramienta diaria",
    category: "IA aplicada",
    date: "6 ago. 2026",
    excerpt: "OpenAI muestra como la IA ya esta pasando del laboratorio a tareas reales de trabajo. Para una empresa, la pregunta deja de ser si probar IA y pasa a ser donde aplicarla con criterio.",
    href: "https://openai.com/index/how-the-world-is-putting-chatgpt-to-work/",
    source: "OpenAI",
    visual: "Trabajo aumentado con IA",
    summary: [
      "La IA se esta incorporando a tareas concretas: investigar, escribir, analizar informacion y apoyar decisiones.",
      "El valor aparece cuando se conecta con procesos reales, no cuando se usa como experimento aislado.",
      "Para una empresa, el siguiente paso es identificar areas repetitivas o lentas donde la IA pueda aportar criterio y velocidad."
    ],
    note: "Resumen editorial de SurInnovacion basado en la fuente original. Para leer el articulo completo, abre la fuente."
  },
  {
    title: "Seguridad y agentes: el nuevo estandar operativo",
    category: "Ciberseguridad IA",
    date: "30 jul. 2026",
    excerpt: "Anthropic publico investigaciones sobre incidentes reales en evaluaciones de ciberseguridad. Automatizar tareas sensibles exige controles, trazabilidad y revision humana.",
    href: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals",
    source: "Anthropic",
    visual: "Agentes con control humano",
    summary: [
      "Los agentes de IA pueden ejecutar tareas complejas, por eso necesitan limites, registros y supervision.",
      "La automatizacion en areas sensibles debe considerar seguridad desde el diseno, no como parche posterior.",
      "La oportunidad para empresas esta en avanzar con IA, pero con controles claros y responsables."
    ],
    note: "Resumen editorial de SurInnovacion basado en la fuente original. Para leer el articulo completo, abre la fuente."
  },
  {
    title: "Modelos, costos y decisiones inteligentes",
    category: "Estrategia tecnologica",
    date: "13 jul. 2026",
    excerpt: "El AI Gateway Production Index de Vercel refuerza una idea clave: elegir modelos segun costo, volumen y riesgo puede ser tan importante como elegir la herramienta.",
    href: "https://vercel.com/blog/ai-gateway-production-index-july-2026",
    source: "Vercel",
    visual: "Modelos segun costo y riesgo",
    summary: [
      "No todos los casos necesitan el mismo modelo: costo, latencia y calidad deben evaluarse segun el uso.",
      "Un proyecto serio de IA necesita observabilidad para entender consumo, errores y comportamiento real.",
      "La estrategia tecnologica consiste en elegir bien la arquitectura, no solo conectar una API."
    ],
    note: "Resumen editorial de SurInnovacion basado en la fuente original. Para leer el articulo completo, abre la fuente."
  }
];

type Post = (typeof posts)[number];

type ContactFormState = {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
};

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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const lastSourceButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeSourcePanel = () => {
    setSelectedPost(null);
    window.setTimeout(() => lastSourceButtonRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSourcePanel();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost]);

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
              <button
                type="button"
                onClick={(event) => {
                  lastSourceButtonRef.current = event.currentTarget;
                  setSelectedPost(post);
                }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ion"
              >
                Leer mas
                <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedPost ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/78 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="source-dialog-title"
          onClick={closeSourcePanel}
        >
          <div
            className="relative max-h-[min(860px,92svh)] w-full max-w-5xl overflow-y-auto rounded-lg border border-white/14 bg-[#050816]/96 shadow-[0_34px_120px_rgba(0,0,0,0.48)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeSourcePanel}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white transition hover:border-cyan-200/40 hover:bg-white/[0.1]"
              aria-label="Cerrar lectura de fuente"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] overflow-hidden bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_80%_68%,rgba(124,58,237,0.28),transparent_38%),linear-gradient(145deg,#07111f,#0a1026_58%,#150a2c)] p-8">
                <div className="absolute inset-0 data-grid opacity-25" />
                <Image
                  src="/brand/isotipo2.png"
                  alt=""
                  width={220}
                  height={220}
                  className="absolute -bottom-8 -right-8 opacity-[0.18] blur-[0.2px]"
                  aria-hidden="true"
                  unoptimized
                />
                <div className="relative flex min-h-[320px] flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-ion/82">{selectedPost.source}</p>
                    <h3 className="mt-5 max-w-sm font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {selectedPost.visual}
                    </h3>
                  </div>
                  <p className="max-w-sm text-sm leading-7 text-frost/66">
                    Vista editorial para revisar la idea central sin salir inmediatamente del sitio.
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-9">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-frost/46">
                  <span>{selectedPost.category}</span>
                  <span className="h-1 w-1 rounded-full bg-frost/35" />
                  <span>{selectedPost.date}</span>
                </div>
                <h2 id="source-dialog-title" className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {selectedPost.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-frost/72 md:text-base md:leading-8">
                  {selectedPost.excerpt}
                </p>

                <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-ion/74">
                  Por que importa para tu empresa
                </h3>
                <div className="mt-4 space-y-3">
                  {selectedPost.summary.map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm leading-7 text-frost/76">
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs leading-6 text-frost/48">{selectedPost.note}</p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={selectedPost.href} target="_blank" rel="noreferrer" className="liquid-button flex-1">
                    Abrir fuente original
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button type="button" onClick={closeSourcePanel} className="glass-secondary-button flex-1">
                    Volver al blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function ContactSection() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    whatsapp: "",
    message: ""
  });
  const [formError, setFormError] = useState("");

  const updateField = (field: keyof ContactFormState, value: string) => {
    if (formError) {
      setFormError("");
    }
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name.trim() || !formState.message.trim()) {
      setFormError("Completa tu nombre y un mensaje breve para preparar la solicitud.");
      return;
    }

    setFormError("");

    const lines = [
      "Hola, quiero solicitar una asesoria gratis con SurInnovacion.",
      formState.name.trim() ? `Nombre: ${formState.name.trim()}` : "",
      formState.email.trim() ? `Correo: ${formState.email.trim()}` : "",
      formState.whatsapp.trim() ? `WhatsApp: ${formState.whatsapp.trim()}` : "",
      formState.message.trim() ? `Mensaje: ${formState.message.trim()}` : ""
    ].filter(Boolean);

    window.open(`${phoneHref}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

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
            <h3 className="font-display text-2xl font-semibold text-white">Solicitar asesoria gratis</h3>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              className="contact-input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={formState.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
            <input
              className="contact-input"
              type="email"
              name="email"
              placeholder="Correo"
              value={formState.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
            <input
              className="contact-input"
              type="tel"
              name="whatsapp"
              placeholder="Tu WhatsApp"
              value={formState.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
            />
            <textarea
              className="contact-input min-h-32 resize-none"
              name="message"
              placeholder="Mensaje breve"
              value={formState.message}
              onChange={(event) => updateField("message", event.target.value)}
            />
            {formError ? (
              <p className="rounded-lg border border-cyan-200/18 bg-white/[0.05] px-4 py-3 text-sm text-frost/76" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="liquid-button flex-1">
                Enviar solicitud por WhatsApp
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
