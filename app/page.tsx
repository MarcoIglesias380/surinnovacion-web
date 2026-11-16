import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ScrollytellingLandingV2 } from "@/components/sections/scrollytelling-landing-v2";
import { founderSchema, organizationSchema } from "@/content/schema";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://surinnovacion.cl/#website",
  url: "https://surinnovacion.cl",
  name: "SurInnovacion",
  description:
    organizationSchema.description,
  inLanguage: "es-CL",
  publisher: {
    "@id": "https://surinnovacion.cl/#organization"
  }
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://surinnovacion.cl/#webpage",
  url: "https://surinnovacion.cl",
  name: "Consultoría en innovación empresarial | SurInnovacion",
  isPartOf: {
    "@id": "https://surinnovacion.cl/#website"
  },
  about: {
    "@id": "https://surinnovacion.cl/#organization"
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://surinnovacion.cl/brand/isotipo2.png"
  },
  inLanguage: "es-CL"
};

export default function Home() {
  return (
    <main className="site-shell min-h-screen bg-void text-frost selection:bg-ion/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            webpageSchema,
            founderSchema
          ])
        }}
      />
      <SiteHeader />
      <ScrollytellingLandingV2 />
      <section className="doc-page">
        <div className="doc-section">
          <h2>Consultoría para optimizar los recursos de tu empresa</h2>
          <p>
            SurInnovacion ayuda a empresas desde Puerto Montt y en todo Chile a mejorar sus
            procesos administrativos y técnicos. Marco Iglesias revisa con tu equipo cómo
            trabajan, qué herramientas usan y dónde se pierde tiempo o se duplica el trabajo.
          </p>
          <p>
            Si las cotizaciones quedan sin seguimiento, podemos ordenar el flujo comercial y
            evaluar un CRM. Si tu equipo ingresa los mismos datos en varios sistemas, podemos
            evaluar una integración. Cuando una tarea requiere interpretar documentos o preparar
            respuestas, podemos evaluar IA con revisión humana.
          </p>
          <p>
            La primera videollamada dura 30 minutos y es gratuita. Sirve para entender un
            problema y definir qué conviene revisar primero. Si hay un proyecto, acordamos su
            alcance antes de implementarlo.
          </p>
          <div className="doc-actions">
            <Link className="doc-cta" href="/servicios">Ver servicios y metodología</Link>
            <Link className="doc-cta doc-cta--ghost" href="/marco-iglesias">Conocer a Marco Iglesias</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
      <ScrollToTop />
    </main>
  );
}
