"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site runtime error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f8f7f4] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl border border-[#dde1ee] bg-white/90 shadow-[0_20px_55px_rgba(28,35,64,0.08)] p-8 md:p-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-[#c49a3c]/70" />
          <p className="text-[0.54rem] tracking-[0.34em] uppercase text-[#2e4480]">Wande Realty</p>
          <span className="h-px w-10 bg-[#c49a3c]/70" />
        </div>

        <div className="text-center">
          <h1 className="font-cormorant font-light text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.04] text-[#1c2340]">
            An unexpected interruption.
          </h1>
          <p className="mt-5 text-[0.66rem] leading-[2] tracking-[0.08em] text-[#8b91a8] max-w-[58ch] mx-auto">
            We could not complete this request right now. Please try again, or return to the homepage to continue
            browsing curated residences and investment opportunities.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="group inline-flex items-center justify-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-6 py-2.5 transition-all duration-300"
            >
              <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
              <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Try Again</span>
              <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
            </button>
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 border border-[#1c2340] hover:border-[#c49a3c] px-6 py-2.5 transition-all duration-300"
            >
              <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
              <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Return Home</span>
              <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
