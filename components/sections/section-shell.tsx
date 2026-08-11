import { SiteSection } from "@/content/site-map";
import { cn } from "@/lib/utils";

const stageLabels: Record<SiteSection["stage"], string> = {
  base: "Base",
  visual: "Visual",
  content: "Contenido",
  conversion: "Conversion"
};

export function SectionShell({ section }: { section: SiteSection }) {
  const isHero = section.id === "hero";

  return (
    <section
      id={section.id}
      className={cn(
        "relative border-b border-white/10 px-5",
        isHero ? "min-h-[78vh] py-24 md:py-32" : "py-20 md:py-28"
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.2em] text-ion/82">
            <span className="h-1.5 w-1.5 rounded-full bg-ion shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            {section.eyebrow}
          </div>
          <h1
            className={cn(
              "font-display font-semibold leading-[1.02] text-white",
              isHero ? "max-w-4xl text-5xl md:text-7xl" : "max-w-3xl text-3xl md:text-5xl"
            )}
          >
            {section.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-frost/68 md:text-lg">
            {section.description}
          </p>
          {isHero ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="rounded-full border border-cyan-300/40 bg-cyan-300/12 px-6 py-3 text-center text-sm font-semibold text-white shadow-soft-glow transition hover:bg-cyan-300/18"
              >
                Solicitar diagnostico gratuito
              </a>
              <a
                href="#impacto-visual"
                className="rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-violet-300/40 hover:bg-white/[0.08]"
              >
                Ver impacto visual
              </a>
            </div>
          ) : null}
        </div>
        <div className="relative min-h-[280px] rounded-[28px] border border-white/10 bg-white/[0.055] p-5 shadow-violet-glow backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_24%_18%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_82%_74%,rgba(234,242,255,0.12),transparent_30%)]" />
          <div className="relative flex h-full min-h-[240px] flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-frost/44">
              <span>{stageLabels[section.stage]}</span>
              <span>{section.id}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.bullets.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/16 p-4 text-sm text-frost/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
