import { notFound } from "next/navigation";
import { KilimaniPage, LavingtonPage, MalindiPage, MombasaPage, NairobiPage } from "@/app/(site)/locations/LocationPages";
import type { Metadata } from "next";

export const runtime = "edge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const titles: Record<string, string> = {
    kilimani: "Properties in Kilimani, Nairobi",
    lavington: "Properties in Lavington, Nairobi",
    malindi: "Properties in Malindi, Kenya",
    mombasa: "Properties in Mombasa & Coast",
    nairobi: "Properties for Sale & Rent in Nairobi",
  };

  const title = titles[slug] || "Properties | Wande Realty";
  
  return {
    title,
    alternates: { canonical: `https://wanderealty.com/properties/${slug}` },
  };
}

export default async function PropertyCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  switch (slug) {
    case "kilimani":
      return <KilimaniPage />;
    case "lavington":
      return <LavingtonPage />;
    case "malindi":
      return <MalindiPage />;
    case "mombasa":
      return <MombasaPage />;
    case "nairobi":
      return <NairobiPage />;
    default:
      notFound();
  }
}
