import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { founderSchema, organizationSchema, ID_ORGANIZACION } from "@/content/schema";

const phoneHref =
  "https://wa.me/56992891678?text=" +
  encodeURIComponent("Hola, quiero coordinar una asesoría para revisar los procesos de mi empresa.");

const servicesTitle = "Consultoría y mejora de procesos";
const servicesDescription =
  "Evaluación de procesos administrativos y técnicos, asesoría y soluciones a medida. Automatización, CRM, plataformas web e IA según tu operación.";

export const metadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: `${servicesTitle} | SurInnovacion`,
    description: servicesDescription,
    url: "https://surinnovacion.cl/servicios",
    type: "article",
    siteName: "SurInnovacion",
    locale: "es_CL",
    images: [{ url: "/brand/isotipo2.png", width: 500, height: 500, alt: "Isotipo de SurInnovacion" }]
  }
};

const servicios = [
  {
    id: "mejora-de-procesos",
    titulo: "Evaluación y mejora de procesos empresariales",
    resumen:
      "Revisamos con tu equipo dónde se pierde tiempo, se repite trabajo o se desaprovechan herramientas.",
    cuerpo: [
      "En lo administrativo, podemos revisar aprobaciones, cotizaciones, seguimiento de clientes y traspasos de información entre áreas. En lo técnico, podemos revisar herramientas que no se comunican, registros duplicados y tareas que dependen de planillas o de una sola persona.",
      "La asesoría compara opciones según el esfuerzo, el costo y la capacidad de tu equipo para sostenerlas. Una mejora puede ser ordenar los pasos de un proceso, aprovechar un sistema que ya tienes, integrar herramientas o implementar una solución a medida."
    ]
  },
  {
    id: "agentes",
    titulo: "Agentes de IA integrados en tus plataformas",
    resumen:
      "Un asistente que vive dentro del sistema que tu equipo ya usa, no en una pestana aparte.",
    cuerpo: [
      "Es la linea donde se cruzan las dos cosas que hago: entender como funciona la inteligencia artificial y saber construir el sistema donde va a vivir. Un agente integrado puede responder lo que los clientes preguntan una y otra vez, buscar en la informacion del propio negocio, preparar respuestas para que una persona solo las revise, o encargarse de tareas repetitivas que hoy consumen horas.",
      "La diferencia con usar una herramienta suelta de IA es que el agente trabaja con los datos reales del negocio y dentro del flujo que el equipo ya conoce. Nadie tiene que cambiar como trabaja para usarlo.",
      "Parte del trabajo es decidir que NO conviene automatizar. Hay tareas donde un error sale mas caro que el tiempo que se ahorra, y esas se dejan en manos de una persona."
    ]
  },
  {
    id: "asesoria",
    titulo: "Asesoria en inteligencia artificial",
    resumen:
      "Treinta minutos para ver donde la IA le conviene a tu empresa, y donde no.",
    cuerpo: [
      "Sin costo y sin compromiso. La conversacion parte por como trabaja tu negocio hoy, no por la tecnologia, y termina con un criterio para decidir por donde empezar."
    ],
    enlace: { href: "/asesoria-ia", texto: "Ver como funciona la asesoria" }
  },
  {
    id: "sitios-web",
    titulo: "Sitios web y ecommerce",
    resumen:
      "Landings, vitrinas digitales y catalogos para vender o mostrar lo que haces.",
    cuerpo: [
      "Un sitio que carga rapido, se ve bien en el telefono (que es por donde entra la mayoria) y se puede actualizar sin depender de nadie. Si vendes, el catalogo se arma para que recorrerlo sea simple, no para que se vea complicado.",
      "Es la linea con mas trabajo publico que puedes revisar antes de contratarme: Columba Boutique, el catalogo de ferreteria, Marca Visible y mi propio sitio estan en linea y los puedes abrir ahora mismo."
    ],
    enlace: { href: "/#proyectos", texto: "Ver los proyectos publicados" }
  },
  {
    id: "plataformas",
    titulo: "Plataformas a medida",
    resumen:
      "Cuando una planilla ya no alcanza para manejar lo que el negocio hace.",
    cuerpo: [
      "Sistemas pensados para una operacion concreta: controlar ventas, ordenar inventario, gestionar reservas o coordinar un evento. Se construyen sobre lo que ya usas cuando tiene sentido, o desde cero cuando lo que hay estorba mas de lo que ayuda.",
      "La pregunta que define esta linea no es que tecnologia usar, sino que parte del trabajo diario se esta haciendo a mano porque no existe la herramienta adecuada."
    ]
  },
  {
    id: "crm",
    titulo: "CRM: ordenar a tus clientes",
    resumen:
      "Saber quien es quien, que se le ofrecio y cuando corresponde volver a hablarle.",
    cuerpo: [
      "La mayoria de los negocios chicos no pierde ventas por falta de interesados, sino por no hacer seguimiento. Un CRM es simplemente el lugar donde esa informacion deja de vivir en la cabeza de alguien o en un cuaderno.",
      "Se arma segun como vende tu negocio, no al reves. Un CRM que obliga a cambiar la forma de trabajar termina sin usarse, y entonces no sirve de nada."
    ]
  }
] as const;

const faqs = [
  [
    "¿Puedo pedir una evaluación aunque no sepa qué tecnología necesito?",
    "Sí. En la primera videollamada revisamos cómo se hace hoy una tarea, quién participa, qué herramientas se usan y dónde aparece el problema. Con eso puedes decidir qué conviene revisar primero."
  ],
  [
    "Puedo contratar solo una de estas lineas?",
    "Si. La mayoria de los proyectos empieza por una sola cosa concreta. Si despues tiene sentido sumar otra, se conversa en ese momento."
  ],
  [
    "Trabajan fuera de Puerto Montt?",
    "Si, para todo Chile. Todo el trabajo se coordina por videollamada. Si estas en la zona tambien podemos vernos en persona."
  ],
  [
    "Cuanto cuesta?",
    "Depende del alcance, y por eso no publico un precio que despues no se cumpla. La asesoria de 30 minutos es gratis y sirve justamente para dimensionar el trabajo antes de hablar de numeros."
  ],
  [
    "Cuanto demora un proyecto?",
    "Varia mucho segun lo que incluya. Una landing no se parece a una plataforma con agentes integrados. En la primera conversacion te doy un rango realista en vez de uno comodo."
  ],
  [
    "Ya tengo una web, sirve de algo?",
    "Casi siempre si. Es mas barato arreglar lo que ya funciona que empezar de nuevo, y parte de la asesoria es decirte cual de las dos sale a cuenta en tu caso."
  ],
  [
    "Que pasa con el sistema despues de entregarlo?",
    "Es la pregunta correcta y conviene hacersela a cualquier proveedor. Lo acordamos antes de empezar: quien lo mantiene, quien puede modificarlo y que pasa si dejamos de trabajar juntos."
  ]
] as const;

const serviciosSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://surinnovacion.cl/servicios#lista",
  name: "Servicios de SurInnovacion",
  itemListElement: servicios.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.titulo,
      description: s.resumen,
      url: `https://surinnovacion.cl/servicios#${s.id}`,
      provider: { "@id": ID_ORGANIZACION },
      areaServed: { "@type": "Country", name: "Chile" }
    }
  }))
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://surinnovacion.cl/servicios#faq",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer }
  }))
};

export default function Servicios() {
  return (
    <main className="site-shell commercial-page min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, founderSchema, serviciosSchema, faqSchema])
        }}
      />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <h1>Consultoría en innovación y mejora de procesos</h1>
          <p className="doc-lede">
            Asesoro a profesionales, empresas, colegios y organizaciones que quieren incorporar la IA o automatizar un proceso. Revisamos un caso concreto y vemos qué puede ahorrar tiempo o mejorar el trabajo. Atiendo desde Puerto Montt a todo Chile.
          </p>
          <div className="doc-actions">
            <a className="doc-cta" href={phoneHref} target="_blank" rel="noreferrer">
              Agendar asesoría gratuita por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
            <a className="doc-cta doc-cta--ghost" href="#soluciones">
              Explorar soluciones <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="doc-section" id="soluciones">
          <h2>Servicios de IA, automatización y desarrollo digital</h2>
          <div className="commercial-disclosures">
            {servicios.map((s) => (
              <details id={s.id} key={s.id}>
                <summary>
                  {s.titulo}
                  <span>{s.resumen}</span>
                </summary>
                <div className="commercial-detail">
                  {s.cuerpo.map((parrafo) => <p key={parrafo}>{parrafo}</p>)}
                  {"enlace" in s && s.enlace ? (
                    <p><Link href={s.enlace.href}>{s.enlace.texto}</Link></p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="doc-section">
          <h2>Cómo empezamos</h2>
          <div className="commercial-disclosures">
            <details>
              <summary>De la primera llamada a una propuesta</summary>
              <div className="commercial-detail">
                <ol className="doc-steps">
                  <li>Cuéntame por WhatsApp qué proceso necesitas mejorar.</li>
                  <li>En la videollamada revisamos el problema y definimos por dónde empezar.</li>
                  <li>Si hay un proyecto, te propongo un alcance, un plazo y un precio antes de empezar.</li>
                </ol>
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
          <h2>Cuéntame qué proceso quieres mejorar</h2>
          <p>La primera videollamada dura 30 minutos y es gratuita.</p>
          <div className="doc-actions">
            <a className="doc-cta" href={phoneHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp <MessageCircle aria-hidden="true" />
            </a>
          </div>
          <p><Link href="/marco-iglesias">Conoce a Marco Iglesias</Link></p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
