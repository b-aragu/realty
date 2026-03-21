/**
 * JSON-LD structured data components for SEO.
 * These inject <script type="application/ld+json"> into page output.
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization schema — use in root layout */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Wande Realty",
        url: "https://www.wanderealty.com",
        logo: "https://www.wanderealty.com/wandelogo.png",
        image: "https://www.wanderealty.com/wandelogo.png",
        description:
          "Kenya's premium real estate agency. Curated residential properties, off-plan developments, and luxury short-term stays in Nairobi and the Kenyan Coast.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kilimani, near Yaya Center",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        telephone: "+254140530539",
        email: "info@wanderealty.com",
        areaServed: [
          { "@type": "City", name: "Nairobi" },
          { "@type": "City", name: "Mombasa" },
          { "@type": "City", name: "Malindi" },
        ],
        sameAs: [
          "https://www.instagram.com/wanderealty",
          "https://www.tiktok.com/@wanderealty",
          "https://www.youtube.com/@wanderealty",
        ],
        priceRange: "KES 2M - KES 100M+",
        openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"],
      }}
    />
  );
}

/** WebSite schema — enables sitelinks search box in Google */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Wande Realty",
        url: "https://www.wanderealty.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.wanderealty.com/residences?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

/** RealEstateListing schema — for individual property pages */
export function PropertyJsonLd({
  name,
  description,
  image,
  price,
  bedrooms,
  bathrooms,
  sqm,
  location,
  url,
}: {
  name: string;
  description?: string;
  image?: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqm?: number;
  location?: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name,
        description: description || `${name} — Premium property available through Wande Realty in ${location || "Kenya"}`,
        image: image || "https://www.wanderealty.com/wandelogo.png",
        url,
        offers: price
          ? {
              "@type": "Offer",
              price: price.replace(/[^0-9.]/g, ""),
              priceCurrency: "KES",
              availability: "https://schema.org/InStock",
            }
          : undefined,
        numberOfRooms: bedrooms,
        numberOfBathroomsTotal: bathrooms,
        floorSize: sqm
          ? {
              "@type": "QuantitativeValue",
              value: sqm,
              unitCode: "MTK",
            }
          : undefined,
        address: location
          ? {
              "@type": "PostalAddress",
              addressLocality: location,
              addressCountry: "KE",
            }
          : undefined,
      }}
    />
  );
}
