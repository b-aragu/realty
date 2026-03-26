import type { Metadata } from "next";
import { KilimaniPage } from "@/app/(site)/locations/LocationPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Properties in Kilimani, Nairobi | Wande Realty",
  description:
    "Find luxury apartments and penthouses for sale in Kilimani, Nairobi. Off-plan and completed units with Wande Realty.",
  path: "/properties-kilimani",
});



export default function Page() {
  return <KilimaniPage />;
}
