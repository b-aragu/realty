import type { Metadata } from "next";
import { getAgents } from "@/sanity/fetch";
import { buildPageMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Wande Realty Kenya",
  description:
    "Learn about Wande Realty — Kenya's premium real estate company specialising in curated residential properties, off-plan developments, and expert investment guidance.",
  path: "/about",
  keywords: ["wande realty team", "real estate agents nairobi", "property consultants kenya", "luxury real estate brokers", "buy property in kenya"],
});

export default async function AboutPage() {
  const agents = await getAgents();

  return (
    <>
      <AboutClient agents={agents} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Wande Realty",
            description:
              "Premium real estate company in Kenya specialising in curated residential properties and investment opportunities.",
            url: "https://www.wanderealty.com",
            logo: "https://www.wanderealty.com/wandelogo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kilimani, near Yaya Center",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: "+254140530539",
            sameAs: [
              "https://www.facebook.com/wanderealty",
              "https://www.instagram.com/wanderealty",
            ],
          }),
        }}
      />
    </>
  );
}
