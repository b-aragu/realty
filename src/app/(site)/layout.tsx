import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import "../globals.css";
import { cn } from "@/lib/utils";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import GlobalWhatsAppFab from "@/components/GlobalWhatsAppFab";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wanderealty.com"),
  title: {
    default: "Wande Realty | Your Trusted Real Estate Partner in Kenya",
    template: "%s | Wande Realty",
  },
  description: "Discover curated residential properties, comprehensive off-plan developments, and exclusive short-term luxury stays in Nairobi and the Kenyan Coast with Wande Realty.",
  keywords: [
    "real estate Kenya",
    "luxury homes Nairobi",
    "properties for sale Nairobi",
    "apartments for sale Kilimani",
    "off plan apartments Kilimani",
    "houses for sale Lavington",
    "properties for sale Mombasa",
    "beachfront property Mombasa",
    "Malindi property for sale",
    "Wande Realty",
    "buy property Kenya",
    "invest in Kenyan real estate",
    "diaspora property investment Kenya",
    "rental yield Nairobi",
    "Airbnb Nairobi",
    "short term stays Nairobi",
    "luxury apartments Westlands",
    "off plan developments Kenya",
    "real estate agent Nairobi",
    "property management Kenya",
    "Kilimani apartments",
    "Kileleshwa homes",
    "Kenya property listing"
  ],
  alternates: {
    canonical: "https://www.wanderealty.com",
  },
  authors: [{ name: "Wande Realty" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.wanderealty.com",
    siteName: "Wande Realty",
    title: "Wande Realty | Your Trusted Real Estate Partner in Kenya",
    description:
      "Discover exclusive properties for rent or sale with Wande Realty, Kenya's premium real estate service provider.",
    images: [
      {
        url: "/wandelogo.png",
        width: 1200,
        height: 630,
        alt: "Wande Realty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wande Realty | Your Trusted Real Estate Partner in Kenya",
    description:
      "Discover exclusive properties for rent or sale with Wande Realty.",
    images: ["/wandelogo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans overflow-x-hidden w-full max-w-full")}>
      <body className="bg-[#f5f8fa] text-[#131110] antialiased overflow-x-hidden w-full max-w-full relative">
        <div className="flex flex-col min-h-screen overflow-x-hidden w-full max-w-full relative">
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden pt-20">{children}</main>
          <Footer />
          
          {/* Spacer to ensure footer content isn't hidden behind the floating WhatsApp button on mobile */}
          <div className="h-24 lg:hidden w-full bg-[#1c2340]" aria-hidden="true" />
        </div>

        {/* Sticky Global Interactions */}
        <ScrollIndicator />
        <GlobalWhatsAppFab />
      </body>
    </html>
  );
}
