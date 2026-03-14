import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Wande Realty Kenya",
  description: "Get in touch with Wande Realty's expert team in Nairobi to schedule viewings, discuss off-plan investments, or explore premium residential properties across Kenya.",
  keywords: ["contact wande realty", "real estate agents nairobi kilimani", "schedule property viewing kenya", "buy luxury home nairobi", "property consultants kenya"]
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
