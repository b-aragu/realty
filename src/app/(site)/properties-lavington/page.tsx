import type { Metadata } from "next";
import { LavingtonPage } from "@/app/(site)/locations/LocationPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Properties in Lavington, Nairobi | Wande Realty",
  description: "Explore apartments and houses for sale in Lavington, Nairobi with Wande Realty.",
  path: "/properties-lavington",
});



export default function Page() {
  return <LavingtonPage />;
}
