import type { Metadata } from "next";
import { MombasaPage } from "@/app/(site)/locations/LocationPages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Properties in Mombasa & Coast | Wande Realty",
  description:
    "Discover beachfront villas and apartments in Mombasa and the Kenyan coast with Wande Realty.",
  path: "/properties-mombasa",
});



export default function Page() {
  return <MombasaPage />;
}
