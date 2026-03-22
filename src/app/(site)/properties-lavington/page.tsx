import type { Metadata } from "next";
import { LavingtonPage } from "@/app/(site)/locations/LocationPages";

export const metadata: Metadata = {
  title: "Properties in Lavington, Nairobi",
  description:
    "Explore apartments and houses for sale in Lavington, Nairobi. Wande Realty.",
  alternates: { canonical: "https://wanderealty.com/properties-lavington" },
};



export default function Page() {
  return <LavingtonPage />;
}
