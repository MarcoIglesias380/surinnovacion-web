import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { founderSchema, organizationSchema } from "@/content/schema";

const phoneHref =
  "https://wa.me/56992891678?text=" +
  encodeURIComponent("Hola, quiero coordinar la asesoria gratuita de 30 minutos.");

export const metadata: Metadata = {
  // Sin el sufijo de marca: con el, el title llega a 65 caracteres y Google lo
  // corta. En esta pagina el nombre ya cumple esa funcion.
  title: { absolute: "Marco Iglesias, Master en Inteligencia Artificial" },
  description:
    "Master en Inteligencia Artificial por BIG School y Universidad Isabel I. Fundador de SurInnovacion, en Puerto Montt. Proyectos publicos que puedes revisar.",
  alternates: { canonical: "/marco-iglesias" },
  openGraph: {
    title: "Marco Iglesias, Master en Inteligencia Artificial | SurInnovacion",
    description:
      "Master en Inteligencia Artificial por BIG School y Universidad Isabel I. Fundador de SurInnovacion, en Puerto Montt.",
    url: "https://surinnovacion.cl/marco-iglesias",
    type: "profile",
    siteName: "SurInnovacion",
    locale: "es_CL",
    images: [{ url: "/brand/isotipo2.png", width: 500, height: 500, alt: "Isotipo de SurInnovacion" }]
  }
};

const proyectos = [
  ["Columba Boutique", "Identidad y vitrina digital para una boutique.", "https://www.columbaboutique.com/"],
  ["Ecommerce Ferreteria", "Catalogo digital de ferreteria, simple de recorrer.", "https://catalogo-distribuidora-oriente.vercel.app/"],
  ["Marco Iglesias", "Sitio de un salon de belleza: servicios, precios y reservas.", "https://marcoiglesias.cl/"],
  ["Marca Visible", "Una propuesta digital con identidad propia.", "https://marca-visible.vercel.app/"]
] as const;

export default function MarcoIglesias() {
  return (
    <main className="site-shell min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, founderSchema]) }}
      />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <p className="doc-eyebrow">Quien esta detras</p>
          <h1>Marco Iglesias, Master en Inteligencia Artificial</h1>
          <p className="doc-lede">
            Fundador de SurInnovacion. Trabajo desde Puerto Montt con empresas de todo Chile,
            aplicando inteligencia artificial y desarrollo a problemas concretos de negocio.
          </p>
          <div className="doc-actions">
            <Link className="doc-cta" href="/#contacto">
              Agendar la asesoria gratuita <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="doc-cta doc-cta--ghost" href={phoneHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="doc-section">
          <h2>Formacion</h2>
          <p className="doc-resumen">
            Master en Inteligencia Artificial, cursado en BIG School (Barcelona) con titulacion de la
            Universidad Isabel I, Espana.
          </p>
          <p>
            Es una formacion enfocada en aplicar la IA, no en investigarla: como se integra en un
            negocio que ya esta funcionando, que problemas resuelve de verdad y cuales no. Esa
            distincion es la que mas uso en el dia a dia.
          </p>
        </section>

        <section className="doc-section">
          <h2>Que hago</h2>
          <p>
            SurInnovacion trabaja cinco lineas: agentes de IA integrados en plataformas, asesoria en
            inteligencia artificial, sitios web y ecommerce, plataformas a medida y CRM. La que mejor
            describe lo que me diferencia es la primera, porque exige entender la IA y ademas saber
            construir el sistema donde va a vivir.
          </p>
          <p>
            <Link href="/servicios">Ver las cinco lineas en detalle</Link>.
          </p>
        </section>

        <section className="doc-section">
          <h2>Trabajo que puedes revisar</h2>
          <p>
            Prefiero que mires lo que esta publicado antes de escribirme. Estos sitios estan en linea
            y los puedes abrir ahora mismo.
          </p>
          <div className="doc-proyectos">
            {proyectos.map(([nombre, descripcion, href]) => (
              <a key={nombre} href={href} target="_blank" rel="noreferrer">
                <span>
                  <strong>{nombre}</strong>
                  <small>{descripcion}</small>
                </span>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="doc-section">
          <h2>Como trabajo</h2>
          <ul className="doc-list">
            <li>
              <strong>Parto por el negocio, no por la tecnologia.</strong> La primera conversacion es
              sobre como trabajas hoy. La herramienta se elige despues, y a veces la conclusion es que
              no hace falta ninguna.
            </li>
            <li>
              <strong>Digo lo que no conviene hacer.</strong> Hay tareas donde automatizar sale mas
              caro que el tiempo que ahorra. Avisarlo a tiempo vale mas que vender un proyecto.
            </li>
            <li>
              <strong>No prometo resultados ni porcentajes.</strong> Nadie que no conozca tu operacion
              puede anticipar cuanto vas a ahorrar. Quien te de una cifra antes, te esta vendiendo
              humo.
            </li>
            <li>
              <strong>Dejamos claro quien mantiene el sistema.</strong> Antes de empezar, no despues
              de entregarlo.
            </li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Desde Puerto Montt</h2>
          <p>
            Vivo y trabajo en Puerto Montt, region de Los Lagos. Atiendo a clientes de todo Chile por
            videollamada, y si estas en la zona tambien nos podemos ver en persona.
          </p>
          <p>
            Que la tecnologia se construya desde el sur y no solo se consuma aca es, en buena medida,
            la razon por la que existe SurInnovacion.
          </p>
        </section>

        <section className="doc-closing">
          <h2>Conversemos 30 minutos</h2>
          <p>
            La primera asesoria no tiene costo. Si no te puedo ayudar, te lo digo en esa misma
            conversacion.
          </p>
          <div className="doc-actions">
            <Link className="doc-cta" href="/#contacto">
              Ir al formulario <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="doc-cta doc-cta--ghost" href={phoneHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
