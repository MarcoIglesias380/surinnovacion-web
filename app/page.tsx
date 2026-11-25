import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { WhatsAppChat } from "@/components/layout/whatsapp-chat";
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
      <SiteFooter />
      <ScrollToTop />
      <WhatsAppChat />
    </main>
  );
}
