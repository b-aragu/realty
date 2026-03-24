import type { Metadata } from "next";
import { getProjects } from "@/sanity/fetch";
import DiscoverClient from "./DiscoverClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Developments & Off-Plan Projects | Wande Realty Kenya",
  description:
    "Explore premier residential developments by Wande Realty. Invest securely in vetted off-plan apartments, completed luxury homes, and upcoming real estate projects across Kenya.",
  path: "/discover",
  keywords: ["off plan properties kenya", "real estate developments nairobi", "investment projects kilimani", "wande realty developments", "buy apartments under construction"],
});



export default async function DiscoverPage() {
  const projects = await getProjects();
  
  return (
    <>
      {/* Vertical Japanese label */}
      <div
        className="fixed top-1/2 left-4 -translate-y-1/2 z-10 pointer-events-none hidden lg:block"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        aria-hidden="true"
      >
        <span className="font-noto-jp font-extralight text-[0.48rem] tracking-[0.45em] text-[#dde1ee]">
          開発物件 · Kenya
        </span>
      </div>

      <DiscoverClient projects={projects} />
    </>
  );
}
