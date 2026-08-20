import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const showcaseProjects = [
  {
    title: "EventDash POS",
    description: "Sistema pensado para organizar ventas, pagos y operacion en eventos de forma clara, rapida y controlada.",
    urlLabel: "eventdash-pos-mqlc.vercel.app",
    href: "https://eventdash-pos-mqlc.vercel.app/admin",
    cta: "Ver proyecto",
    imageSrc: "/projects/ed-post-ventas.webp",
    imageAlt: "Panel principal de EventDash POS"
  },
  {
    title: "Eventos IA",
    description: "Plataforma creada para acompanar experiencias en vivo, con una interfaz visual que ayuda a ordenar y dinamizar la actividad.",
    urlLabel: "eventos-ia-surinnovacion.vercel.app",
    href: "https://eventos-ia-surinnovacion.vercel.app/admin",
    cta: "Ver proyecto",
    imageSrc: "/projects/eventos-ia-bingo.webp",
    imageAlt: "Consola de control del proyecto Eventos IA"
  },
  {
    title: "Columba Boutique",
    description: "Sitio web creado para mostrar productos, reforzar la identidad de la marca y acercar la tienda a mas personas.",
    urlLabel: "columbaboutique.com",
    href: "https://www.columbaboutique.com/",
    cta: "Ver proyecto",
    imageSrc: "/projects/columba-web-catalogo.webp",
    imageAlt: "Portada del sitio Columba Boutique"
  },
  {
    title: "Marco Iglesias",
    description: "Landing profesional disenada para presentar servicios, experiencia y una propuesta personal de forma clara y directa.",
    urlLabel: "marcoiglesias.cl",
    href: "https://marcoiglesias.cl/",
    cta: "Ver proyecto",
    imageSrc: "/projects/landing-web.webp",
    imageAlt: "Portada del sitio Marco Iglesias"
  },
  {
    title: "Distribuidora Oriente",
    description: "Catalogo digital que permite mostrar productos de manera ordenada, simple y facil de recorrer.",
    urlLabel: "catalogo-distribuidora-oriente.vercel.app",
    href: "https://catalogo-distribuidora-oriente.vercel.app/",
    cta: "Ver proyecto",
    imageSrc: "/projects/catalogo-ecommerce.webp",
    imageAlt: "Portada del catalogo de Distribuidora Oriente"
  },
  {
    title: "Marca Visible",
    description: "Experiencia digital creada para comunicar una propuesta de valor con mas fuerza, estilo y recordacion.",
    urlLabel: "marca-visible.vercel.app",
    href: "https://marca-visible.vercel.app/",
    cta: "Ver proyecto",
    imageSrc: "/projects/landing-marca-personal.webp",
    imageAlt: "Portada del proyecto Marca Visible"
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

export function TrustSection() {
  return (
    <section id="confianza" className="relative overflow-hidden border-y border-white/10 px-5 py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_86%_28%,rgba(124,58,237,0.16),transparent_32%),linear-gradient(90deg,rgba(34,211,238,0.05),rgba(124,58,237,0.08),rgba(234,242,255,0.04))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ion/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Confianza tecnologica"
          title="Proyectos reales que ya estan en marcha"
          description="Aqui puedes ver algunos de los proyectos que hemos creado o impulsado. Cada uno responde a una necesidad distinta: vender mejor, mostrar una marca, ordenar procesos o crear experiencias digitales mas claras y utiles."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseProjects.map((project, index) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_18px_70px_rgba(2,6,23,0.2)] backdrop-blur-xl transition hover:border-cyan-200/28 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(34,211,238,0.11),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.045),transparent_42%)] opacity-70 transition group-hover:opacity-100" />
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir ${project.title} en una pestana nueva`}
                className="relative block overflow-hidden border-b border-cyan-100/12 bg-[#061126]/42 p-[1px]"
              >
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/55 to-transparent" />
                <div className="pointer-events-none absolute inset-y-4 left-0 w-px bg-gradient-to-b from-transparent via-cyan-100/34 to-transparent" />
                <div className="pointer-events-none absolute inset-y-4 right-0 w-px bg-gradient-to-b from-transparent via-violet-200/28 to-transparent" />
                <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-[#020617] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_28px_rgba(34,211,238,0.08)]">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="scale-[1.045] object-cover transition duration-500 group-hover:scale-[1.075]"
                  />
                  <div className="absolute inset-0 rounded-[5px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_16%),linear-gradient(0deg,rgba(2,6,23,0.82),rgba(2,6,23,0.18)_46%,rgba(2,6,23,0.03))]" />
                  <div className="pointer-events-none absolute inset-0 rounded-[5px] ring-1 ring-inset ring-cyan-100/24" />
                  <div className="pointer-events-none absolute inset-[1px] rounded-[4px] ring-1 ring-inset ring-white/8" />
                  <div className="absolute left-4 top-4 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/12 bg-[#020617]/70 px-3 font-display text-sm font-semibold text-frost/78 backdrop-blur-xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </a>

              <div className="relative flex flex-col gap-4 p-5 md:p-6">
                <div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-2 text-left transition hover:text-ion"
                  >
                    <h3 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
                      {project.title}
                    </h3>
                  </a>
                  <p className="mt-2 break-words text-xs text-frost/42">{project.urlLabel}</p>
                </div>

                <p className="text-sm leading-7 text-frost/74">{project.description}</p>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${project.title} en una pestana nueva`}
                  className="glass-secondary-button mt-auto w-full px-4 py-3 sm:w-auto"
                >
                  {project.cta}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemSolutionSection() {
  return (
    <section id="problema-solucion" className="relative min-h-[calc(100svh-96px)] overflow-hidden border-y border-white/10 md:min-h-[760px]">
      <Image
        src="/sections/innovation-hub-strategy.png"
        alt="Marco Iglesias explorando una interfaz holografica de inteligencia artificial en una oficina moderna"
        fill
        sizes="100vw"
        className="object-cover object-[31%_center] md:object-center"
        priority={false}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.12)_30%,rgba(2,6,23,0.4)_62%,rgba(2,6,23,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.14)_0%,transparent_28%,rgba(2,6,23,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_47%,rgba(34,211,238,0.2),transparent_28%),radial-gradient(circle_at_88%_62%,rgba(124,58,237,0.18),transparent_34%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-96px)] max-w-7xl items-end px-4 pb-12 pt-48 md:min-h-[760px] md:items-center md:justify-end md:px-8 md:py-14">
        <div className="max-w-xl rounded-lg border border-white/10 bg-slate-950/30 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm md:mr-0 md:p-9 lg:-mr-2 xl:-mr-8">
          <span className="mb-3 inline-flex h-1.5 w-12 rounded-full bg-ion shadow-[0_0_28px_rgba(34,211,238,0.75)] md:mb-5 md:w-16" />
          <h2 className="font-display text-[1.62rem] font-semibold leading-[1.03] text-white md:text-5xl md:leading-tight">
            La innovacion ya no es opcional
          </h2>
          <p className="mt-3 text-[0.86rem] leading-[1.55rem] text-frost/82 md:mt-6 md:text-lg md:leading-8">
            Mientras muchas empresas siguen operando con procesos manuales, respuestas lentas y sistemas desconectados, la inteligencia artificial ya esta cambiando la forma de vender, atender, automatizar y crecer.
          </p>
        </div>
      </div>
    </section>
  );
}

export function VisualImpactSection() {
  return (
    <section id="impacto-visual" className="relative overflow-hidden px-5 py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617,#050816_52%,#020617)]" />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            Ideas que se transforman en tecnologia real
          </h2>
          <p className="mt-5 text-base leading-8 text-frost/66 md:text-lg">
            Cada proyecto nace de una necesidad, evoluciona con inteligencia artificial y se convierte en una experiencia digital funcional.
          </p>
        </div>
      </div>
    </section>
  );
}
