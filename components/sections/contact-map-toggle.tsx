"use client";

import { MapPin, X } from "lucide-react";
import { useState } from "react";

const address = "Avenida Cuarta terraza 5098 Valle Volcanes Puerto Montt";
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export function ContactMapToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="map-toggle group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <MapPin className="h-4 w-4" aria-hidden="true" />}
        {isOpen ? "Ocultar mapa" : "Ver ubicacion"}
      </button>
      {isOpen ? (
        <div className="map-frame mt-5 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.05] p-2 shadow-soft-glow">
          <iframe
            title="Ubicacion SurInnovacion"
            src={mapSrc}
            className="h-[320px] w-full rounded-[22px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
    </div>
  );
}
