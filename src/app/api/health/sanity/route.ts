import { NextResponse } from "next/server";
import { getSanityClient, isSanityConfigured } from "@/sanity/client";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSanityConfigured) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message: "Sanity environment variables are missing or invalid.",
    });
  }

  const client = getSanityClient();
  if (!client) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message: "Sanity client is unavailable.",
    });
  }

  try {
    const data = await client.fetch(
      `{
        "projects": count(*[_type == "project"]),
        "properties": count(*[_type == "property"]),
        "articles": count(*[_type == "article"]),
        "stays": count(*[_type == "stay"]),
        "hasSettings": defined(*[_type == "siteSettings"][0]._id)
      }`,
      {},
      { cache: "no-store" },
    );

    return NextResponse.json({
      ok: true,
      configured: true,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      ...data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        message: "Sanity query failed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
