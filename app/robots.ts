import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://surinnovacion.cl/sitemap.xml",
    host: "https://surinnovacion.cl"
  };
}
