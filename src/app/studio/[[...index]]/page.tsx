import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ index: [] }];
}

const studioEnabled = process.env.ENABLE_STUDIO === "true";

export default async function StudioPage() {
  if (!studioEnabled) {
    notFound();
  }

  const Studio = (await import("./Studio")).default;
  return <Studio />;
}
