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
    <main className="site-shell min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, founderSchema, serviceSchema, faqSchema])
        }}
      />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <p className="doc-eyebrow">Asesoria gratuita</p>
          <h1>Asesoria gratuita en inteligencia artificial para tu empresa</h1>
          <p className="doc-lede">
            Una videollamada de 30 minutos para mirar como trabaja hoy tu empresa y decirte donde la
            inteligencia artificial te conviene, y donde no. Sin costo y sin compromiso de contratar nada
            despues.
          </p>
          <div className="doc-actions">
            <Link className="doc-cta" href="/#contacto">
              Agendar por el formulario <ArrowUpRight aria-hidden="true" />
            </Link>
            <a className="doc-cta doc-cta--ghost" href={phoneHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="doc-section">
          <h2>Que pasa en esos 30 minutos</h2>
          <p>
            No es una presentacion de servicios. La llamada parte por tu operacion, no por la tecnologia.
          </p>
          <ul className="doc-list">
            <li>Me cuentas como trabaja tu empresa hoy: que tareas se repiten, donde se pierde tiempo y que parte de la atencion consume mas gente.</li>
            <li>Miramos que de eso se puede resolver con herramientas que ya existen y estan maduras, y que todavia no.</li>
            <li>Te digo en que orden conviene empezar, si es que conviene empezar ahora.</li>
            <li>Sales con un criterio para decidir, lo hagas conmigo o por tu cuenta.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Que no incluye</h2>
          <p>
            Prefiero decirlo antes que despues, para que llegues con la expectativa correcta.
          </p>
          <ul className="doc-list doc-list--plain">
            <li>No es un informe escrito ni una auditoria. Es una conversacion.</li>
            <li>No reviso tus sistemas por dentro ni accedo a tus datos.</li>
            <li>No termina en una cotizacion automatica. Si tiene sentido trabajar juntos, eso se conversa aparte.</li>
            <li>No prometo resultados ni porcentajes de ahorro. Cualquiera que te los prometa antes de conocer tu operacion te esta vendiendo humo.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Para quien es</h2>
          <div className="doc-grid">
            <div>
              <h3>Empresa grande</h3>
              <p>Equipos que ya probaron IA en algun area y necesitan ordenar el criterio antes de escalarlo al resto de la operacion.</p>
            </div>
            <div>
              <h3>Empresa mediana</h3>
              <p>Operaciones con procesos manuales que estan creciendo mas rapido que el equipo que los sostiene.</p>
            </div>
            <div>
              <h3>Empresa chica o emprendimiento</h3>
              <p>Donde una o dos personas hacen todo y cada hora que se recupera se nota de inmediato.</p>
            </div>
            <div>
              <h3>Profesional independiente</h3>
              <p>Quien trabaja por su cuenta y quiere usar IA en su propio trabajo sin perder semanas probando herramientas.</p>
            </div>
          </div>
          <p className="doc-note">
            Si no te reconoces en ninguna, escribeme igual y te digo derechamente si te puedo ayudar o no.
          </p>
        </section>

        <section className="doc-section">
          <h2>Como funciona</h2>
          <ol className="doc-steps">
            <li>
              <strong>Me escribes.</strong> Por el formulario del sitio o por WhatsApp, contandome brevemente a que se dedica tu empresa.
            </li>
            <li>
              <strong>Coordinamos.</strong> Te respondo para fijar dia y hora segun tu disponibilidad.
            </li>
            <li>
              <strong>Conversamos 30 minutos.</strong> Por videollamada, con tu operacion sobre la mesa.
            </li>
            <li>
              <strong>Decides tu.</strong> Con un criterio claro de por donde empezar y que dejar para despues.
            </li>
          </ol>
        </section>

        <section className="doc-section">
          <h2>Por donde suelen empezar las empresas</h2>
          <p>
            Estas son las areas donde la automatizacion y la IA estan mas maduras hoy. No todas aplican a
            todos: buena parte de la conversacion es descartar las que no te sirven.
          </p>
          <ul className="doc-list">
            <li><strong>Atencion a clientes.</strong> Responder lo que se pregunta una y otra vez, y filtrar antes de que llegue a una persona del equipo.</li>
            <li><strong>Tareas administrativas repetitivas.</strong> Informacion que hoy se copia a mano de un sistema a otro, o de un correo a una planilla.</li>
            <li><strong>Contenido y catalogo.</strong> Descripciones, fichas de producto y material de venta que hoy toman horas de alguien.</li>
            <li><strong>Datos que ya registras.</strong> Ordenar lo que tu negocio ya genera para poder mirarlo y decidir con eso.</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Quien te va a asesorar</h2>
          <p>
            Soy Marco Iglesias, Master en Inteligencia Artificial, divulgador y fundador de SurInnovacion.
            Trabajo desde Puerto Montt para empresas de todo Chile.
          </p>
          <p>
            Hago divulgacion de IA porque creo que el problema no es la falta de herramientas sino la
            distancia entre esas herramientas y el negocio que las necesita. Esa distancia es la que esta
            asesoria busca acortar.
          </p>
          <p>
            Puedes revisar <Link href="/#proyectos">proyectos reales en los que he trabajado</Link> o mi{" "}
            <a href="https://marcoiglesias.cl/" target="_blank" rel="noreferrer">sitio personal</a> antes de
            escribirme.
          </p>
        </section>

        <section className="doc-section" id="preguntas">
          <h2>Preguntas frecuentes</h2>
          <div className="doc-faq">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="doc-closing">
          <h2>Agenda tu asesoria gratuita de 30 minutos</h2>
          <p>
            Cuentame brevemente a que te dedicas y coordinamos. Si no te puedo ayudar, te lo digo de
            inmediato y no pierdes el tiempo.
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
