import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ScrollytellingLandingV2 } from "@/components/sections/scrollytelling-landing-v2";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://surinnovacion.cl/#organization",
  name: "SurInnovacion",
  alternateName: "SurInnovacion IA",
  url: "https://surinnovacion.cl",
  logo: "https://surinnovacion.cl/brand/isotipo2.png",
  image: "https://surinnovacion.cl/brand/isotipo2.png",
  description:
    "SurInnovacion crea soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica para empresas y proyectos desde Puerto Montt, Chile.",
  telephone: "+56 9 9289 1678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Cuarta terraza 5098",
    addressLocality: "Puerto Montt",
    addressRegion: "Los Lagos",
    addressCountry: "CL"
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Chile"
    },
    {
      "@type": "City",
      name: "Puerto Montt"
    }
  ],
  founder: {
    "@type": "Person",
    "@id": "https://surinnovacion.cl/#marco-iglesias",
    name: "Marco Iglesias",
    jobTitle: "Fundador de SurInnovacion"
  },
  keywords: [
    "inteligencia artificial",
    "automatizacion",
    "asesoria tecnologica",
    "sitios web",
    "Puerto Montt"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://surinnovacion.cl/#website",
  url: "https://surinnovacion.cl",
  name: "SurInnovacion",
  description:
    "Soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica desde Puerto Montt, Chile.",
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
  name: "SurInnovacion | Inteligencia Artificial, automatizacion e innovacion",
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

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://surinnovacion.cl/#marco-iglesias",
  name: "Marco Iglesias",
  description: "Master en Inteligencia Artificial, divulgador de la IA y fundador de SurInnovacion.",
  worksFor: {
    "@id": "https://surinnovacion.cl/#organization"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puerto Montt",
    addressRegion: "Los Lagos",
    addressCountry: "CL"
  }
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
      <SiteFooter />
      <ScrollToTop />
    </main>
  );
}
