import { ArrowRight } from "lucide-react";

import { ReactiveDotGrid } from "./reactive-dot-grid";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden px-5 py-10 md:py-12 xl:py-14">
      <div className="absolute inset-0 bg-[#020617]" />
      <ReactiveDotGrid />
      <div className="data-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.14),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.18),#020617_92%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#020617]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-156px)] max-w-[1180px] items-center justify-center text-center md:min-h-[calc(100vh-172px)] xl:min-h-[calc(100vh-188px)]">
        <div className="mx-auto max-w-5xl">
          <h1 className="mx-auto max-w-5xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-6xl xl:text-7xl">
            El futuro lo construimos juntos, con{" "}
            <span className="hero-gradient-text">Inteligencia Artificial</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-frost/72 md:text-lg md:leading-8">
            Creamos soluciones para tus proyectos, asesoramos a tu equipo y
            educamos para que la IA se transforme en una herramienta practica.
          </p>
          <div className="mt-7 flex justify-center">
            <a href="#contacto" className="liquid-button group">
              Solicita una asesoria gratis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
