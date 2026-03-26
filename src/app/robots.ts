import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/studio"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/discover", "/residences", "/journal", "/invest", "/about", "/contact", "/llms.txt"],
        disallow: ["/api/", "/studio"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/discover", "/residences", "/journal", "/invest", "/about", "/contact", "/llms.txt"],
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: "https://www.wanderealty.com/sitemap.xml",
    host: "https://www.wanderealty.com",
  };
}
