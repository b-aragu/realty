import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short-Term Escapes & Luxury Stays | Wande Retreats",
  description: "Experience curated, architecturally designed short-term rental apartments in Nairobi's most sought-after neighborhoods. Book your sophisticated stay with Wande Retreats.",
  keywords: ["luxury airbnb nairobi", "short term rentals kilimani", "boutique apartments kenya", "wande retreats", "vacation rentals nairobi"]
};

export default function StaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
