import { SITE_URL } from "@/lib/seo";

export const WHATSAPP_NUMBER = "254140530539";

type LeadMessageInput = {
  intro: string;
  pagePath?: string;
  pageUrl?: string;
  source?: string;
};

export function buildTrackedPageUrl(pagePath: string, source: string) {
  const url = new URL(pagePath.startsWith("http") ? pagePath : `${SITE_URL}${pagePath}`);
  url.searchParams.set("utm_source", "whatsapp");
  url.searchParams.set("utm_medium", "lead");
  url.searchParams.set("utm_campaign", source);
  return url.toString();
}

export function buildTrackedAbsoluteUrl(absoluteUrl: string, source: string) {
  const url = new URL(absoluteUrl);
  url.searchParams.set("utm_source", "whatsapp");
  url.searchParams.set("utm_medium", "lead");
  url.searchParams.set("utm_campaign", source);
  return url.toString();
}

export function buildLeadMessage({ intro, pagePath, pageUrl, source }: LeadMessageInput) {
  const resolvedUrl = pageUrl || (pagePath ? buildTrackedPageUrl(pagePath, source || "general") : SITE_URL);
  const lines = [
    intro,
    "",
    "Page Link:",
    resolvedUrl,
  ];

  if (source) {
    lines.push("", `Lead Source: ${source}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppHref(input: LeadMessageInput) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildLeadMessage(input))}`;
}

export function inferLeadSource(pathname: string) {
  if (pathname.startsWith("/discover/")) return "discover_detail";
  if (pathname.startsWith("/residences/")) return "residence_detail";
  if (pathname.startsWith("/journal/")) return "journal_detail";
  if (pathname.startsWith("/stays")) return "stays_page";
  if (pathname.startsWith("/discover")) return "discover_page";
  if (pathname.startsWith("/residences")) return "residences_page";
  if (pathname.startsWith("/contact")) return "contact_page";
  return "global_fab";
}

export function inferIntro(pathname: string) {
  if (pathname.startsWith("/discover/")) return "Hello Wande Realty, I'm interested in this development.";
  if (pathname.startsWith("/residences/")) return "Hello Wande Realty, I'm interested in this residence.";
  if (pathname.startsWith("/stays")) return "Hello Wande Realty, I'm interested in this stay.";
  if (pathname.startsWith("/journal/")) return "Hello Wande Realty, I'd like guidance based on this article.";
  return "Hello Wande Realty, I'm interested in a property enquiry.";
}
