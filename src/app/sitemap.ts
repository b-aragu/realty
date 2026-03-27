import type { MetadataRoute } from "next";
import { getArticles, getProjects, getProperties } from "@/sanity/fetch";

const siteUrl = "https://www.wanderealty.com";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/discover", priority: 0.9, changeFrequency: "weekly" },
  { path: "/residences", priority: 0.9, changeFrequency: "daily" },
  { path: "/stays", priority: 0.8, changeFrequency: "weekly" },
  { path: "/invest", priority: 0.75, changeFrequency: "monthly" },
  { path: "/journal", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/properties-nairobi", priority: 0.8, changeFrequency: "weekly" },
  { path: "/properties-kilimani", priority: 0.8, changeFrequency: "weekly" },
  { path: "/properties-lavington", priority: 0.8, changeFrequency: "weekly" },
  { path: "/properties-mombasa", priority: 0.8, changeFrequency: "weekly" },
  { path: "/properties-malindi", priority: 0.8, changeFrequency: "weekly" },
  { path: "/studio", priority: 0.3, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, properties, articles] = await Promise.all([
    getProjects(),
    getProperties(),
    getArticles(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: `${siteUrl}/discover/${project.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

  const propertyEntries: MetadataRoute.Sitemap = properties
    .filter((property) => property.slug || property.id)
    .map((property) => ({
      url: `${siteUrl}/residences/${property.slug || property.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.85,
    }));

  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: `${siteUrl}/journal/${article.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...projectEntries, ...propertyEntries, ...articleEntries];
}
