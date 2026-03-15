import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist, Cormorant_Garamond, Noto_Serif_JP } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import "../globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-noto-jp",
  display: "swap",
});

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
    "properties for sale Mombasa",
    "off plan apartments Kilimani",
    "Wande Realty",
    "short term stays Nairobi"
  ],
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
    <html lang="en" className={cn(playfair.variable, inter.variable, cormorant.variable, notoSerifJP.variable, "font-sans overflow-x-hidden w-full max-w-full", geist.variable)}>
      <body className="bg-[#f5f8fa] text-[#131110] antialiased overflow-x-hidden w-full max-w-full relative">
        <div className="flex flex-col min-h-screen overflow-x-hidden w-full max-w-full relative">
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden pt-20">{children}</main>
          <Footer />
          
          {/* Spacer to ensure footer content isn't hidden behind the floating WhatsApp button on mobile */}
          <div className="h-24 lg:hidden w-full bg-[#1c2340]" aria-hidden="true" />
        </div>

        {/* Sticky Global Interactions */}
        <ScrollIndicator />

        {/* Sticky WhatsApp — real Wande number */}
        <a
          href="https://wa.me/254140530539?text=Hello%20Wande%20Realty%2C%20I%27m%20interested%20in%20a%20property"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-14 h-14 bg-[#1c2340] border border-[#c49a3c]/40 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#2e4480] hover:border-[#c49a3c] transition-all duration-400 group focus:outline-none focus:ring-2 focus:ring-[#c49a3c] focus:ring-offset-2 focus:ring-offset-[#f8f7f4]"
          aria-label="Chat on WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>
      </body>
    </html>
  );
}
