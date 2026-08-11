import Image from "next/image";

const showcaseProjects = [
  {
    title: "Eventos IA",
    description: "Plataforma para dinamicas y gestion de eventos.",
    href: "https://eventos-ia-surinnovacion.vercel.app/admin",
    cta: "Ver proyecto"
  },
  {
    title: "Columba Boutique",
    description: "Sitio comercial para presencia digital y productos.",
    href: "https://www.columbaboutique.com/",
    cta: "Abrir sitio"
  },
  {
    title: "Marca Visible",
    description: "Landing comercial enfocada en servicios.",
    href: "https://marca-visible.vercel.app/",
    cta: "Ver proyecto"
  },
  {
    title: "Catalogo Distribuidora Oriente",
    description: "Catalogo digital para revisar productos.",
    href: "https://catalogo-distribuidora-oriente.vercel.app/",
    cta: "Abrir sitio"
  },
  {
    title: "Marco Iglesias",
    description: "Sitio personal, perfil y contenido profesional.",
    href: "https://marcoiglesias.cl/",
    cta: "Abrir sitio"
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
          title="Proyectos que muestran como trabajamos"
          description="Una vitrina en crecimiento con sitios, experiencias y soluciones digitales que estamos construyendo desde SurInnovacion."
        />

        <div className="mt-12 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] backdrop-blur-xl">
          {showcaseProjects.map((project) => (
            <article
              key={project.title}
              className="group grid gap-4 p-5 transition hover:bg-white/[0.055] md:grid-cols-[minmax(180px,0.42fr)_1fr_auto] md:items-center md:p-6"
            >
              <h3 className="font-display text-2xl font-semibold leading-tight text-white">
                {project.title}
              </h3>
              <p className="text-sm leading-7 text-frost/68">{project.description}</p>

              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-button liquid-button--compact justify-self-start md:justify-self-end"
                >
                  {project.cta}
                  <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">
                    -&gt;
                  </span>
                </a>
              ) : (
                <p className="text-xs uppercase tracking-[0.18em] text-frost/45 md:text-right">
                  URL publica pendiente
                </p>
              )}
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
