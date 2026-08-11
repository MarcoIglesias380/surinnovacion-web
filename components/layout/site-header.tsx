"use client";

import { navItems } from "@/content/site-map";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      id="top"
      className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/70 shadow-[0_1px_0_rgba(34,211,238,0.08)] backdrop-blur-2xl"
    >
      <nav className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3">
        <a href="#hero" className="brand-lockup group flex min-w-0 items-center gap-3 md:gap-4" aria-label="SurInnovacion inicio" onClick={closeMenu}>
          <span className="brand-mark brand-mark--icon relative grid h-14 w-14 shrink-0 place-items-center overflow-visible md:h-16 md:w-16">
            <Image
              src="/brand/isotipo2.png"
              alt="Isotipo SurInnovacion"
              fill
              sizes="64px"
              className="brand-isotype-img object-contain"
              priority
              unoptimized
            />
          </span>
          <span className="brand-wordmark brand-wordmark--header relative h-12 w-[min(58vw,280px)] overflow-visible sm:h-14 sm:w-[410px] lg:w-[380px] xl:h-16 xl:w-[520px]" aria-label="SurInnovacion">
            <Image
              src="/brand/surinnovacion-wordmark-2.png"
              alt="Nombre SurInnovacion"
              fill
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 380px, (min-width: 640px) 410px, 58vw"
              className="brand-wordmark-img object-contain"
              priority
              unoptimized
            />
          </span>
        </a>
        <div className="hidden items-center gap-5 text-sm text-frost/70 xl:flex xl:gap-7">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="relative transition hover:text-ion">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-grid h-10 w-10 place-items-center rounded-full border border-cyan-200/24 bg-white/[0.065] text-white shadow-soft-glow backdrop-blur-xl transition hover:border-cyan-200/50 hover:bg-white/[0.1] xl:hidden"
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
            className="absolute left-5 right-5 top-[calc(100%+10px)] overflow-hidden rounded-3xl border border-cyan-200/18 bg-[#071128]/95 p-3 shadow-[0_24px_70px_rgba(2,6,23,0.52)] backdrop-blur-2xl xl:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-frost/78 transition hover:bg-white/[0.07] hover:text-ion"
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
