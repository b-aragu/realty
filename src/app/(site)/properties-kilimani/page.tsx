import type { Metadata } from "next";
import { KilimaniPage } from "@/app/(site)/locations/LocationPages";

export const metadata: Metadata = {
  title: "Properties in Kilimani, Nairobi",
  description:
    "Find luxury apartments and penthouses for sale in Kilimani, Nairobi. Off-plan and completed units. Wande Realty.",
  alternates: { canonical: "https://wanderealty.com/properties-kilimani" },
};

export default function Page() {
  return <KilimaniPage />;
}
