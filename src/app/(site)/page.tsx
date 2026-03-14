import { getProjects, getProperties, getArticles, getStays, getSettings } from "@/sanity/fetch";
import HomeClient from "./HomeClient";

// Opt into ISR caching - revalidates every hour or when Sanity webhook fires
export const revalidate = 3600;

export default async function Home() {
  // Parallel fetching for maximum SSR performance
  const [projects, properties, articles, stays, settings] = await Promise.all([
    getProjects(),
    getProperties(),
    getArticles(),
    getStays(),
    getSettings(),
  ]);

  return (
    <HomeClient
      projects={projects}
      properties={properties}
      articles={articles}
      stays={stays}
      settings={settings}
    />
  );
}
