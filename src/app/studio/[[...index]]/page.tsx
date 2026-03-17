"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export const runtime = "edge";

export function generateStaticParams() {
  return [{ index: [] }];
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
