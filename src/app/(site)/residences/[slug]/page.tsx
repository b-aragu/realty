import { notFound } from "next/navigation";
import { getProperties, getPropertyBySlug } from "@/sanity/fetch";
import PropertyDetailClient from "./PropertyDetailClient";
import type { Metadata } from "next";
import { buildNotFoundMetadata, buildPageMetadata } from "@/lib/seo";

const FALLBACK_METADATA: Metadata = buildPageMetadata({
  title: "Residence Details | Wande Realty",
  description: "Explore premium residences available through Wande Realty in Nairobi and across the Kenyan Coast.",
  path: "/residences",
});

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;

    const safeSlug = slug?.trim();
    if (!safeSlug) {
      return FALLBACK_METADATA;
    }

    const property = await getPropertyBySlug(safeSlug);

    if (!property) {
      return buildNotFoundMetadata(`/residences/${safeSlug}`);
    }

    const safeTitle = property.title?.trim() || "Residence Details";
    const safeDescription =
      property.description?.trim() ||
      `Explore this ${property.bedrooms ?? "exclusive"}-bedroom ${property.propertyType ?? "residence"} in ${property.location ?? "Kenya"} with Wande Realty.`;

    return buildPageMetadata({
      title: `${safeTitle} | Wande Realty`,
      description: safeDescription,
      path: `/residences/${safeSlug}`,
      images: property.image ? [property.image] : undefined,
    });
  } catch (error) {
    console.error("Failed to build residence metadata:", error);
    return FALLBACK_METADATA;
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return <PropertyDetailClient property={property} />;
}
