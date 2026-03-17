import Studio from "./Studio";

export const dynamic = "force-static";
export const runtime = "edge";

export function generateStaticParams() {
  return [{ index: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
