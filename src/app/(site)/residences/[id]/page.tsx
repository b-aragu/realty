import { notFound } from "next/navigation";
import { getPropertyById } from "@/sanity/fetch";
import PropertyDetailClient from "./PropertyDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return { title: property.title };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}
