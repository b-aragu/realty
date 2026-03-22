import type { Metadata } from "next";
import { NairobiPage } from "@/app/(site)/locations/LocationPages";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Nairobi",
  description:
    "Browse luxury apartments, penthouses, and houses for sale and rent in Nairobi. Kilimani, Lavington, Westlands and more. Wande Realty.",
  alternates: { canonical: "https://wanderealty.com/properties-nairobi" },
};



export default function Page() {
  return <NairobiPage />;
}
