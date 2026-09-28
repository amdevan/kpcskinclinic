import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: "https://kpcskinhairclinic.space-z.ai/sitemap.xml",
    host: "https://kpcskinhairclinic.space-z.ai",
  };
}
