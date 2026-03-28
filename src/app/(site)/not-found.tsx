import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f8f7f4] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center border border-[#dde1ee] bg-white/90 p-10 md:p-14 shadow-[0_14px_45px_rgba(28,35,64,0.06)]">
        <p className="text-[0.54rem] tracking-[0.34em] uppercase text-[#2e4480]">404 · Page Not Found</p>
        <h1 className="mt-5 font-cormorant font-light text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] text-[#1c2340]">
          This page could not be found.
        </h1>
        <p className="mt-5 text-[0.66rem] leading-[2] tracking-[0.08em] text-[#8b91a8] max-w-[58ch] mx-auto">
          The page may have moved, expired, or no longer exists. Continue exploring our available residences,
          projects, and market insights.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/residences"
            className="group inline-flex items-center justify-center gap-3 border border-[#1c2340] hover:border-[#c49a3c] px-6 py-2.5 transition-all duration-300"
          >
            <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
            <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Browse Residences</span>
            <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-3 border border-[#dde1ee] hover:border-[#c49a3c] px-6 py-2.5 transition-all duration-300"
          >
            <span className="w-[2px] h-[1rem] bg-[#c49a3c] shrink-0" />
            <span className="text-[0.5rem] tracking-[0.24em] uppercase text-[#1c2340] group-hover:text-[#2e4480] transition-colors duration-300">Go Home</span>
            <span className="text-[#8b91a8] group-hover:text-[#c49a3c] transition-colors duration-300 text-[0.6rem] ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
