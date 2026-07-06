import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { PAGES } from "@/content/clientPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.meta.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/recruiter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/playbook`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/seinfeld-hq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const clientRoutes: MetadataRoute.Sitemap = Object.keys(PAGES).map((slug) => ({
    url: `${base}/client/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...clientRoutes];
}
