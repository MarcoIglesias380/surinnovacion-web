"use client";

import { navItems } from "@/content/site-map";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  return (
    <header
      id="top"
      className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/35 backdrop-blur-xl"
    >
      <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2 md:px-6 lg:gap-6">
        <a href="#hero" className="brand-lockup group flex min-w-0 items-center gap-2.5 md:gap-3" aria-label="SurInnovacion inicio" onClick={closeMenu}>
          <span className="brand-mark brand-mark--icon relative grid h-14 w-14 shrink-0 place-items-center overflow-visible md:h-16 md:w-16">
            <Image
              src="/brand/isotipo2.png"
              alt="Isotipo SurInnovacion"
              fill
              sizes="(min-width: 768px) 64px, 56px"
              className="brand-isotype-img object-contain"
              priority
            />
          </span>
          <span className="brand-wordmark brand-wordmark--header relative h-11 w-[min(47vw,205px)] overflow-visible sm:w-[230px] md:h-12 md:w-[260px]" aria-label="SurInnovacion">
            <Image
              src="/brand/surinnovacion-wordmark-2.png"
              alt="Nombre SurInnovacion"
              fill
              sizes="(min-width: 768px) 260px, (min-width: 640px) 230px, 47vw"
              className="brand-wordmark-img object-contain"
              priority
            />
          </span>
        </a>
        <div className="hidden items-center gap-5 text-[0.68rem] uppercase tracking-[0.14em] text-frost/64 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="relative transition hover:text-ion">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-grid h-10 w-10 place-items-center rounded-full border border-cyan-200/24 bg-white/[0.065] text-white shadow-soft-glow backdrop-blur-xl transition hover:border-cyan-200/50 hover:bg-white/[0.1] lg:hidden"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        {isMenuOpen ? (
          <div
            id="mobile-navigation"
            className="mobile-navigation absolute left-4 right-4 top-[calc(100%+8px)] overflow-hidden p-3 lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-navigation__link px-4 py-3 text-sm font-medium text-frost/86 transition"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
