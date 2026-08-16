import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SurInnovacion",
    short_name: "SurInnovacion",
    description:
      "Soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica desde Puerto Montt, Chile.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: "es-CL",
    icons: [
      {
        src: "/favicon.png",
        sizes: "500x500",
        type: "image/png"
      }
    ]
  };
}
