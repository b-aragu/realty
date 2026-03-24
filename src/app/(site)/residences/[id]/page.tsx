import { notFound } from "next/navigation";
import { getProperties, getPropertyById } from "@/sanity/fetch";
import PropertyDetailClient from "./PropertyDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  
  if (!property) return { title: "Property Not Found" };
  
  const description = property.description || `Explore this ${property.bedrooms}-bedroom ${property.propertyType} in ${property.location} with Wande Realty.`;
  
  return { 
    title: `${property.title} | Wande Realty`,
    description,
    openGraph: {
      title: `${property.title} | Wande Realty`,
      description,
      images: property.image ? [{ url: property.image, width: 1200, height: 630 }] : undefined,
      type: "website",
    }
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}
