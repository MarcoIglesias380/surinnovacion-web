import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://surinnovacion.cl",
      lastModified: new Date("2026-11-12"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: "https://surinnovacion.cl/asesoria-ia",
      lastModified: new Date("2026-11-12"),
      changeFrequency: "monthly",
      priority: 0.9
    }
  ];
}
