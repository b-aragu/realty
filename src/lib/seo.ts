import type { Metadata } from "next";

export const SITE_URL = "https://www.wanderealty.com";
export const SITE_NAME = "Wande Realty";
export const DEFAULT_OG_IMAGE = "/wandelogo.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  images?: string[];
};

const absoluteUrl = (path: string) => {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  images,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const ogImages = (images && images.length > 0 ? images : [DEFAULT_OG_IMAGE]).map((url) => ({
    url,
    width: 1200,
    height: 630,
    alt: title,
  }));

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      url: canonicalUrl,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_KE",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}

export function buildNotFoundMetadata(path: string): Metadata {
  return {
    title: "Page Not Found | Wande Realty",
    description: "The requested page could not be found on Wande Realty.",
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
