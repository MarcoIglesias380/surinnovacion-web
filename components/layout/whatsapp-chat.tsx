"use client";

import { MessageCircle, X } from "lucide-react";
import { useRef, useState } from "react";

export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="fixed bottom-20 right-5 z-50 flex flex-col-reverse items-end gap-3 md:bottom-24 md:right-7"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={open ? "Cerrar asistencia por WhatsApp" : "Mostrar asistencia por WhatsApp"}
        aria-controls="whatsapp-chat-panel"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="grid size-12 place-items-center rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800"
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </button>
      <section
        id="whatsapp-chat-panel"
        aria-labelledby="whatsapp-chat-title"
        hidden={!open}
        className="w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-blue-100 bg-white p-5 text-slate-900 shadow-xl"
      >
        <h2 id="whatsapp-chat-title" className="font-semibold">Bienvenido a SurInnovacion</h2>
        <p className="mt-2 text-sm text-slate-700">¿En qué podemos ayudarle?</p>
        <a
          href="https://wa.me/56992891678"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Abrir Chat
        </a>
      </section>
    </div>
  );
}
