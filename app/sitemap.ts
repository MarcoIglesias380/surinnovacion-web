import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://surinnovacion.cl",
      lastModified: new Date("2026-11-03"),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
