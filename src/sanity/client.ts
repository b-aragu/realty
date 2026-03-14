import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured =
  !!projectId &&
  projectId !== "your_project_id_here" &&
  /^[a-z0-9-]+$/.test(projectId);

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) {
    if (typeof window !== "undefined") {
      console.warn("Sanity is not configured. Falling back to static data.");
    }
    return null;
  }
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
    });
  }
  return _client;
}

import imageUrlBuilder from "@sanity/image-url";

export function urlFor(source: any) {
  if (!isSanityConfigured) return { url: () => "/images/placeholder.jpg" } as any;
  return imageUrlBuilder({ projectId, dataset }).image(source);
}
