import type { Metadata } from "next";
import { getProperties, getSettings, getLocations } from "@/sanity/fetch";
import ResidencesClient from "./ResidencesClient";

export const metadata: Metadata = {
  title: "Luxury Residences For Sale & Rent | Wande Realty",
  description:
    "Browse our curated portfolio of premium properties available for sale, long-term rent, and high-yield investment across Nairobi and the Kenyan Coast.",
  keywords: ["luxury homes for sale nairobi", "apartments for rent kilimani lavington", "houses for sale kenya", "wande realty properties", "buy real estate mombasa"]
};



export default async function ResidencesPage() {
  const [properties, settings, locations] = await Promise.all([
    getProperties(),
    getSettings(),
    getLocations()
  ]);

  return (
    <ResidencesClient 
      properties={properties} 
      settings={settings} 
      locationsCount={locations.length}
    />
  );
}
