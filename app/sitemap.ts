import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://surinnovacion.cl",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
