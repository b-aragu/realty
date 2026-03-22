import type { Metadata } from "next";
import { getProjects, getProperties, getArticles, getStays, getSettings, getMacroRegions } from "@/sanity/fetch";
import HomeClient from "./HomeClient";

// Opt into ISR caching - revalidates every hour or when Sanity webhook fires
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wande Realty | Kenya's Premium Real Estate Agency — Nairobi & Coast",
  description:
    "Discover curated luxury apartments, villas, and off-plan developments in Kilimani, Lavington, Westlands, Mombasa, and Malindi. Short-term stays, investment opportunities, and expert real estate advisory.",
  openGraph: {
    title: "Wande Realty | Kenya's Premium Real Estate",
    description: "Luxury homes, apartments, and investment properties across Kenya. Expert advisory in Nairobi and the Coast.",
    url: "https://www.wanderealty.com",
  },
  alternates: {
    canonical: "https://www.wanderealty.com",
  },
};

export default async function Home() {
  // Parallel fetching for maximum SSR performance
  const [projects, properties, articles, stays, settings, macroRegions] = await Promise.all([
    getProjects(),
    getProperties(),
    getArticles(),
    getStays(),
    getSettings(),
    getMacroRegions(),
  ]);

  return (
    <HomeClient
      projects={projects}
      properties={properties}
      articles={articles}
      stays={stays}
      settings={settings}
      macroRegions={macroRegions}
    />
  );
}
