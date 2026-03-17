"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      Loading Studio…
    </div>
  ),
});

export default function StudioPage() {
  return <Studio />;
}
