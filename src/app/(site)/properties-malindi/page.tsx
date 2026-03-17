import type { Metadata } from "next";
import { MalindiPage } from "@/app/(site)/locations/LocationPages";

export const metadata: Metadata = {
  title: "Properties in Malindi, Kenya",
  description:
    "Find luxury beachfront properties in Malindi. Villas, apartments, and off-plan investments. Wande Realty.",
  alternates: { canonical: "https://wanderealty.com/properties-malindi" },
};



export default function Page() {
  return <MalindiPage />;
}
