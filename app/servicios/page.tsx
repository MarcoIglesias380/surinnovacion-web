import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { founderSchema, organizationSchema, ID_ORGANIZACION } from "@/content/schema";

const phoneHref =
  "https://wa.me/56992891678?text=" +
  encodeURIComponent("Hola, quiero coordinar la asesoria gratuita de 30 minutos.");

export const metadata: Metadata = {
  title: "Servicios: IA, sitios web, plataformas y CRM",
  description:
    "Asesoria en inteligencia artificial, sitios web y ecommerce, plataformas a medida, CRM y agentes de IA integrados. Desde Puerto Montt para todo Chile.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios: IA, sitios web, plataformas y CRM | SurInnovacion",
    description:
      "Asesoria en inteligencia artificial, sitios web y ecommerce, plataformas a medida, CRM y agentes de IA integrados.",
    url: "https://surinnovacion.cl/servicios",
    type: "article",
    siteName: "SurInnovacion",
    locale: "es_CL",
    images: [{ url: "/brand/isotipo2.png", width: 500, height: 500, alt: "Isotipo de SurInnovacion" }]
  }
};

const servicios = [
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
      "Se arma segun como vende tu negocio, no al reves. Un CRM que obliga a cambiar la forma de trabajar termina sin usarse, y entonces no sirve de nada.",
      "Hay uno funcionando hoy en un salon de belleza de Puerto Montt: agenda, fichas de clientas y seguimiento, usado todos los dias. No tiene acceso publico porque contiene datos de personas reales, pero es un sistema en produccion y no una demostracion."
    ]
  }
] as const;

const faqs = [
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
    <main className="site-shell min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, founderSchema, serviciosSchema, faqSchema])
        }}
      />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <p className="doc-eyebrow">Servicios</p>
          <h1>Inteligencia artificial, sitios web, plataformas y CRM</h1>
          <p className="doc-lede">
            Cinco formas de resolver el mismo problema de fondo: que la tecnologia trabaje para tu
            negocio en vez de darte mas trabajo. Todas empiezan por la misma conversacion de 30
            minutos sin costo.
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

        {servicios.map((s) => (
          <section className="doc-section" id={s.id} key={s.id}>
            <h2>{s.titulo}</h2>
            <p className="doc-resumen">{s.resumen}</p>
            {s.cuerpo.map((parrafo) => (
              <p key={parrafo.slice(0, 40)}>{parrafo}</p>
            ))}
            {"enlace" in s && s.enlace ? (
              <p>
                <Link href={s.enlace.href}>{s.enlace.texto}</Link>
              </p>
            ) : null}
          </section>
        ))}

        <section className="doc-section">
          <h2>Como empieza cualquiera de estas lineas</h2>
          <ol className="doc-steps">
            <li>
              <strong>Me escribes.</strong> Por el formulario o por WhatsApp, contandome brevemente a
              que se dedica tu negocio y que te esta costando.
            </li>
            <li>
              <strong>Conversamos 30 minutos.</strong> Sin costo. Ahi queda claro cual de estas lineas
              resuelve tu problema, o si ninguna lo hace.
            </li>
            <li>
              <strong>Te propongo algo concreto.</strong> Con alcance, plazo y precio definidos antes
              de empezar, no sobre la marcha.
            </li>
            <li>
              <strong>Decides tu.</strong> Si no te convence, te quedas igual con el criterio de la
              conversacion.
            </li>
          </ol>
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
          <h2>Conversemos 30 minutos y lo vemos</h2>
          <p>
            No necesitas tener claro cual de estas lineas te sirve. Esa es justamente la parte que
            resolvemos en la primera conversacion.
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
