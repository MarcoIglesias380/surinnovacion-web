import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { founderSchema, organizationSchema } from "@/content/schema";
import Link from "next/link";

const phoneHref = "https://wa.me/56992891678?text=" + encodeURIComponent("Hola, quiero coordinar la asesoria gratuita de 30 minutos.");

export const metadata: Metadata = {
  title: "Asesoria gratuita en Inteligencia Artificial",
  description:
    "Videollamada de 30 minutos para ver donde la inteligencia artificial le conviene a tu empresa y donde no. Sin costo. Marco Iglesias, Master en IA.",
  alternates: { canonical: "/asesoria-ia" },
  openGraph: {
    title: "Asesoria gratuita en Inteligencia Artificial para empresas | SurInnovacion",
    description:
      "Videollamada de 30 minutos para ver donde la inteligencia artificial le conviene a tu empresa y donde no. Sin costo.",
    url: "https://surinnovacion.cl/asesoria-ia",
    type: "article",
    siteName: "SurInnovacion",
    locale: "es_CL",
    images: [
      {
        url: "/brand/isotipo2.png",
        width: 500,
        height: 500,
        alt: "Isotipo de SurInnovacion"
      }
    ]
  }
};

const faqs = [
  [
    "La asesoria es realmente gratis?",
    "Si. No tiene costo ni te deja comprometido a contratar nada despues. Si al final no tiene sentido trabajar juntos, te lo digo en la misma llamada."
  ],
  [
    "Cuanto dura?",
    "Treinta minutos. Si la conversacion da para mas y ambos tenemos la agenda libre, seguimos, pero el compromiso son treinta minutos."
  ],
  [
    "Es presencial o por videollamada?",
    "Por videollamada, a cualquier parte de Chile. Estoy en Puerto Montt, asi que si estas en la zona tambien podemos vernos en persona."
  ],
  [
    "Necesito saber de inteligencia artificial para aprovecharla?",
    "No. La conversacion parte de como trabaja hoy tu empresa, no de tecnologia. Esa traduccion es justamente mi trabajo."
  ],
  [
    "Necesito tener mis datos o procesos ordenados antes?",
    "No. Si estuvieran ordenados, probablemente no necesitarias la conversacion. Llegamos con lo que hay."
  ],
  [
    "Sirve si mi empresa es muy chica?",
    "Si. En equipos de una o dos personas cada hora que se recupera se nota de inmediato, y suelen ser los casos mas directos de resolver."
  ],
  [
    "Que pasa despues de la llamada?",
    "Decides tu. Te quedas con el criterio para avanzar, lo hagas conmigo o por tu cuenta. No hay seguimiento insistente."
  ]
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://surinnovacion.cl/asesoria-ia#faq",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }))
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://surinnovacion.cl/asesoria-ia#servicio",
  name: "Asesoria gratuita en inteligencia artificial",
  serviceType: "Asesoria en inteligencia artificial para empresas",
  description:
    "Videollamada de 30 minutos para identificar donde la inteligencia artificial y la automatizacion aportan a una empresa, y donde no conviene aplicarlas.",
  url: "https://surinnovacion.cl/asesoria-ia",
  provider: { "@id": "https://surinnovacion.cl/#organization" },
  areaServed: { "@type": "Country", name: "Chile" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://surinnovacion.cl/#contacto",
    availableLanguage: { "@type": "Language", name: "Espanol" }
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CLP",
    description: "Primera asesoria de 30 minutos sin costo."
  }
};

export default function AsesoriaIA() {
  return (
    <main className="site-shell commercial-page min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, founderSchema, serviceSchema, faqSchema])
        }}
      />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <h1>Asesoría gratuita en inteligencia artificial para tu empresa</h1>
          <p className="doc-lede">
            En 30 minutos revisamos un proceso de tu empresa y vemos si la IA puede ayudarte.
          </p>
          <div className="doc-actions">
            <a className="doc-cta" href={phoneHref} target="_blank" rel="noreferrer">
              Coordinar por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="doc-section">
          <h2>Qué revisamos en la llamada</h2>
          <div className="commercial-disclosures">
            <details>
              <summary>Cómo funciona y qué incluye</summary>
              <div className="commercial-detail">
                <p>Me cuentas dónde se repite trabajo o se pierde tiempo. Revisamos las opciones y te propongo un primer paso que puedas evaluar.</p>
                <p>Es una videollamada inicial, sin costo ni compromiso. No incluye auditoría, informe escrito ni acceso a tus sistemas o datos. Si necesitas una implementación, acordamos su alcance por separado.</p>
              </div>
            </details>
            <details>
              <summary>Para quién es la asesoría</summary>
              <div className="commercial-detail">
                <p>Para pymes, equipos de empresas grandes y profesionales independientes que quieren evaluar la IA en una tarea concreta o revisar un piloto antes de escalarlo.</p>
              </div>
            </details>
            <details>
              <summary>Ejemplos de procesos que podemos revisar</summary>
              <div className="commercial-detail">
                <ul className="doc-list">
                  <li>Responder consultas frecuentes de clientes.</li>
                  <li>Reducir la digitación repetida entre correos, planillas y sistemas.</li>
                  <li>Preparar fichas de producto o sacar partido a los datos que ya registras.</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        <section className="doc-section" id="preguntas">
          <h2>Preguntas frecuentes</h2>
          <div className="commercial-disclosures">
            <details>
              <summary>Ver preguntas y respuestas</summary>
              <div className="commercial-detail doc-faq">
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section className="doc-closing">
          <h2>Conversemos sobre tu proceso</h2>
          <p>Te asesora <Link href="/marco-iglesias">Marco Iglesias</Link>, fundador de SurInnovacion.</p>
          <div className="doc-actions">
            <a className="doc-cta" href={phoneHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
            <Link className="doc-cta doc-cta--ghost" href="/#contacto">
              Ir al formulario <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
