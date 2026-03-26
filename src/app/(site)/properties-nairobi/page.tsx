import type { Metadata } from "next";
import { NairobiPage } from "@/app/(site)/locations/LocationPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Properties for Sale & Rent in Nairobi | Wande Realty",
  description:
    "Browse luxury apartments, penthouses, and houses for sale and rent in Nairobi, including Kilimani, Lavington, Westlands, and more.",
  path: "/properties-nairobi",
});



export default function Page() {
  return <NairobiPage />;
}
