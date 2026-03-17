"use client";

import { Component, type ReactNode } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

class StudioErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; message?: string }
> {
  state = { hasError: false, message: undefined as string | undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error("Studio error:", error);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const hostedStudio = projectId ? `https://${projectId}.sanity.studio` : "https://sanity.io";

    return (
      <main style={{ fontFamily: "Inter, Arial, sans-serif", padding: 24, maxWidth: 840 }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Studio connection issue</h1>
        <p style={{ marginBottom: 12, lineHeight: 1.6 }}>
          The embedded Sanity Studio could not complete authentication from this domain.
          This is usually a CORS origin configuration issue in Sanity manage settings.
        </p>
        <ol style={{ marginLeft: 18, lineHeight: 1.8, marginBottom: 16 }}>
          <li>
            Open <strong>manage.sanity.io</strong> → your project → <strong>API</strong> → <strong>CORS Origins</strong>.
          </li>
          <li>
            Add this deployment origin with <strong>credentials enabled</strong> (for example your Pages domain).
          </li>
          <li>Reload this page after saving.</li>
        </ol>

        <p style={{ marginBottom: 16 }}>
          Quick fallback: open your hosted studio directly:&nbsp;
          <a href={hostedStudio} target="_blank" rel="noreferrer" style={{ color: "#2e4480" }}>
            {hostedStudio}
          </a>
        </p>

        {this.state.message ? (
          <pre
            style={{
              background: "#f6f7f9",
              border: "1px solid #dde1ee",
              borderRadius: 8,
              padding: 12,
              overflowX: "auto",
              fontSize: 12,
            }}
          >
            {this.state.message}
          </pre>
        ) : null}
      </main>
    );
  }
}

export default function Studio() {
  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}
