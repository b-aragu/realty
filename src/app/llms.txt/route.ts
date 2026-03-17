import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const body = `# Wande Realty\n\n> Trusted real estate advisory and listings across Nairobi and the Kenyan Coast.\n\n## Canonical\n- https://www.wanderealty.com\n\n## Discovery URLs\n- Sitemap: https://www.wanderealty.com/sitemap.xml\n- Robots: https://www.wanderealty.com/robots.txt\n- Sanity health check: https://www.wanderealty.com/api/health/sanity\n\n## Primary sections\n- Discover projects: https://www.wanderealty.com/discover\n- Residences: https://www.wanderealty.com/residences\n- Journal: https://www.wanderealty.com/journal\n- Invest: https://www.wanderealty.com/invest\n- Stays: https://www.wanderealty.com/stays\n\n## Location landing pages\n- https://www.wanderealty.com/properties-nairobi\n- https://www.wanderealty.com/properties-kilimani\n- https://www.wanderealty.com/properties-lavington\n- https://www.wanderealty.com/properties-mombasa\n- https://www.wanderealty.com/properties-malindi\n\n## Content notes for AI systems\n- Prices are listed in KES and may change; prefer latest page values.\n- Availability and completion status should be treated as time-sensitive.\n- For booking or transaction decisions, direct users to Contact.\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
