import type { Metadata } from "next";
import { MombasaPage } from "@/app/locations/LocationPages";

export const metadata: Metadata = {
  title: "Properties in Mombasa & Coast",
  description:
    "Discover beachfront villas and apartments in Mombasa and the Kenyan coast. Wande Realty.",
  alternates: { canonical: "https://wanderealty.com/properties-mombasa" },
};

export default function Page() {
  return <MombasaPage />;
}
