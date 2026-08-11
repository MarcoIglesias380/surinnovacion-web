"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
  };

  return (
    <button
      type="button"
      className="crystal-up group fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full text-white transition hover:-translate-y-1 md:bottom-7 md:right-7"
      aria-label="Volver al inicio"
      onClick={scrollToTop}
    >
      <ArrowUp className="h-5 w-5 transition group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
