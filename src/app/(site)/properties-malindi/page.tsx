import type { Metadata } from "next";
import { MalindiPage } from "@/app/(site)/locations/LocationPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Properties in Malindi, Kenya | Wande Realty",
  description:
    "Find luxury beachfront properties in Malindi, including villas, apartments, and off-plan investments with Wande Realty.",
  path: "/properties-malindi",
});



export default function Page() {
  return <MalindiPage />;
}
