import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-16");

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/cv`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...cases.map((study) => ({
      url: `${site.url}/cases/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
