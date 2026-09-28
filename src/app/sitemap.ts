import type { MetadataRoute } from "next";
import {
  TREATMENTS,
  REMAINING_TREATMENT_SLUGS,
} from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kpcskinhairclinic.space-z.ai";
  const now = new Date();

  // Top-level pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/doctors`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/hair-transplant`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/procedures`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/offers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/success-stories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/std-sti`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Treatment pages — the primary organic traffic asset
  const treatmentPages: MetadataRoute.Sitemap = [
    ...TREATMENTS.map((t) => ({
      url: `${base}/services/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...REMAINING_TREATMENT_SLUGS.map((t) => ({
      url: `${base}/services/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...treatmentPages];
}
