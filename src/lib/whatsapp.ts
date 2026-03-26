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
