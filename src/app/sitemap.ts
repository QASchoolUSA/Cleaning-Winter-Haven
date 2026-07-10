import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const lastModified = new Date();

  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/house-cleaning", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/guides/how-much-does-house-cleaning-cost-winter-haven", priority: 0.9 },
    { path: "/service-areas", priority: 0.85 },
    { path: "/residential-cleaning", priority: 0.8 },
    { path: "/commercial-cleaning", priority: 0.8 },
    { path: "/post-construction-cleaning", priority: 0.8 },
    { path: "/move-out-cleaning", priority: 0.8 },
    { path: "/move-in-cleaning", priority: 0.8 },
  ];

  return pages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));
}
