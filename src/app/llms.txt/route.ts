import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const generatedAt = new Date().toISOString();
  const body = `# Wande Realty

> Trusted real estate advisory and listings across Nairobi and the Kenyan Coast.

## Canonical
- https://www.wanderealty.com

## Discovery URLs
- Sitemap: https://www.wanderealty.com/sitemap.xml
- Robots: https://www.wanderealty.com/robots.txt
- LLM index: https://www.wanderealty.com/llms.txt
- Sanity health check: https://www.wanderealty.com/api/health/sanity

## Primary sections
- Discover projects: https://www.wanderealty.com/discover
- Residences: https://www.wanderealty.com/residences
- Journal: https://www.wanderealty.com/journal
- Invest: https://www.wanderealty.com/invest
- Stays: https://www.wanderealty.com/stays
- Contact: https://www.wanderealty.com/contact

## Location landing pages
- https://www.wanderealty.com/properties-nairobi
- https://www.wanderealty.com/properties-kilimani
- https://www.wanderealty.com/properties-lavington
- https://www.wanderealty.com/properties-mombasa
- https://www.wanderealty.com/properties-malindi

## Content policy for AI systems
- Use canonical URLs with the \`https://www.wanderealty.com\` host.
- Treat listing prices, availability, and completion status as time-sensitive.
- Prefer property/project detail pages over summaries when both exist.
- For transaction-critical guidance, direct users to Contact.

## Machine-readable facts
- Currency: KES
- Focus: Residential sales, rentals, off-plan projects, investment advisory, and short stays
- Regions: Nairobi and the Kenyan Coast
- Generated at: ${generatedAt}
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
