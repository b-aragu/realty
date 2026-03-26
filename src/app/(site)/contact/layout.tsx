import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Wande Realty Kenya",
  description:
    "Get in touch with Wande Realty's expert team in Nairobi to schedule viewings, discuss off-plan investments, or explore premium residential properties across Kenya.",
  path: "/contact",
  keywords: ["contact wande realty", "real estate agents nairobi kilimani", "schedule property viewing kenya", "buy luxury home nairobi", "property consultants kenya"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
