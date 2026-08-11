import { navItems } from "@/content/site-map";
import Image from "next/image";

const solutions = [
  "Automatizacion IA",
  "Chatbots",
  "Sitios web futuristas",
  "Campanas con IA",
  "Consultoria Tech"
];

const phoneHref = "https://wa.me/56992891678";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-midnight">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[2.35fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="brand-lockup flex flex-wrap items-center gap-4 md:gap-5">
            <span className="brand-mark brand-mark--icon relative grid h-16 w-16 shrink-0 place-items-center overflow-visible md:h-20 md:w-20">
              <Image
                src="/brand/isotipo2.png"
                alt="Isotipo SurInnovacion"
                fill
                sizes="80px"
                className="brand-isotype-img object-contain"
                unoptimized
              />
            </span>
            <span className="brand-wordmark brand-wordmark--footer relative h-16 w-[min(78vw,520px)] overflow-visible sm:h-20 sm:w-[min(78vw,640px)]" aria-label="SurInnovacion">
              <Image
                src="/brand/surinnovacion-wordmark-2.png"
                alt="Nombre SurInnovacion"
                fill
                sizes="(min-width: 1024px) 640px, 78vw"
                className="brand-wordmark-img object-contain"
                unoptimized
              />
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-frost/62">
            IA - Innovacion - Futuro. Desde el sur de Chile creando tecnologia aplicada para negocios reales.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ion/80">Soluciones</h3>
          <ul className="mt-4 space-y-3 text-sm text-frost/62">
            {solutions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ion/80">Empresa</h3>
          <ul className="mt-4 space-y-3 text-sm text-frost/62">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-ion">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ion/80">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-frost/62">
            <li>
              <a href={phoneHref} target="_blank" rel="noreferrer" className="transition hover:text-ion">
                +56 9 9289 1678
              </a>
            </li>
            <li>Avenida Cuarta terraza 5098</li>
            <li>Valle Volcanes, Puerto Montt</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-frost/44">
        © 2026 SurInnovacion. Todos los derechos reservados. Creado por Marco Iglesias.
      </div>
    </footer>
  );
}
