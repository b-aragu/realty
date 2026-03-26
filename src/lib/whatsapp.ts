import { SITE_URL } from "@/lib/seo";

export const WHATSAPP_NUMBER = "254140530539";

type LeadMessageInput = {
  intro: string;
  pagePath?: string;
  pageUrl?: string;
  source?: string;
};

export function buildTrackedAbsoluteUrl(pagePath: string, source: string) {
  const url = new URL(pagePath.startsWith("http") ? pagePath : `${SITE_URL}${pagePath}`);
  url.searchParams.set("utm_source", "whatsapp");
  url.searchParams.set("utm_medium", "lead");
  url.searchParams.set("utm_campaign", source);
  return url.toString();
}

/**
 * Alias for buildTrackedAbsoluteUrl used in some components.
 */
export const buildTrackedPageUrl = buildTrackedAbsoluteUrl;

/**
 * Infers the lead source from the current URL pathname.
 */
export function inferLeadSource(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";
  if (pathname.includes("/discover/")) return "project_detail";
  if (pathname.includes("/residences/")) return "residence_detail";
  if (pathname.includes("/contact")) return "contact_page";
  return "general_site";
}

/**
 * Infers a suitable WhatsApp introduction message based on the current page.
 */
export function inferIntro(pathname: string): string {
  if (pathname.includes("/discover/")) {
    return "Hi, I'm interested in learning more about this project I found on your website.";
  }
  if (pathname.includes("/residences/")) {
    return "Hi, I'm interested in this specific property listing on your website.";
  }
  if (pathname === "/" || pathname === "") {
    return "Hi, I'm visiting your website and would like to enquire about your services and properties.";
  }
  return "Hi, I have an enquiry about Wande Realty.";
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
