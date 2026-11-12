export const SITIO = "https://surinnovacion.cl";
export const ID_ORGANIZACION = `${SITIO}/#organization`;
export const ID_FUNDADOR = `${SITIO}/#marco-iglesias`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ID_ORGANIZACION,
  name: "SurInnovacion",
  alternateName: "SurInnovacion IA",
  url: SITIO,
  logo: `${SITIO}/brand/isotipo2.png`,
  image: `${SITIO}/brand/isotipo2.png`,
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
    { "@type": "Country", name: "Chile" },
    { "@type": "City", name: "Puerto Montt" }
  ],
  founder: {
    "@type": "Person",
    "@id": ID_FUNDADOR,
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

export const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": ID_FUNDADOR,
  name: "Marco Iglesias",
  description: "Master en Inteligencia Artificial, divulgador de la IA y fundador de SurInnovacion.",
  worksFor: { "@id": ID_ORGANIZACION },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Puerto Montt",
    addressRegion: "Los Lagos",
    addressCountry: "CL"
  }
};
