import Link from "next/link";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const footerLinks = {
  explore: [
    { href: "/discover", label: "Developments" },
    { href: "/residences", label: "Residences" },
    { href: "/invest", label: "Invest" },
    { href: "/journal", label: "Journal" },
  ],
  locations: [
    { href: "/residences?area=Nairobi", label: "Nairobi" },
    { href: "/residences?area=Kiambu", label: "Kiambu" },
    { href: "/residences?area=Mombasa", label: "Mombasa" },
    { href: "/residences?area=Malindi", label: "Malindi" },
    { href: "/residences?area=Diani", label: "Diani" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/journal", label: "Careers" },
    { href: "/journal", label: "Journal" },
  ],
};

const socialLinks = [
  { href: "https://www.instagram.com/wanderealty", label: "Instagram" },
  { href: "https://www.facebook.com/wanderealty", label: "Facebook" },
  { href: "https://www.youtube.com/@Wanderealty", label: "YouTube" },
  {
    href: buildWhatsAppHref({
      intro: "Hello Wande Realty, I'm interested in a property enquiry.",
      pagePath: "/",
      source: "footer_social",
    }),
    label: "WhatsApp",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#12172a] text-white/50 relative overflow-hidden w-full max-w-[100vw]">
      {/* Ghost kanji — 礎 meaning "foundation" */}
      <div
        className="absolute bottom-[-8%] right-[-2%] font-noto-jp font-extralight select-none pointer-events-none"
        style={{ fontSize: "30vw", lineHeight: 1, color: "rgba(255,255,255,0.018)" }}
        aria-hidden="true"
      >
        礎
      </div>

      <div className="relative z-[2] max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 lg:pt-[5.5rem]">
        {/* ── TOP — logo + tagline / address ── */}
        <div className="flex flex-col lg:flex-row items-start justify-between pb-12 lg:pb-14 border-b border-white/[0.07] mb-12 lg:mb-14 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center mb-5">
              <span className="font-cormorant font-light text-[0.88rem] tracking-[0.45em] uppercase text-white/80">
                Wande Realty
              </span>
              <span className="text-[#c49a3c] text-[1.1em] ml-[0.15em] leading-none" aria-hidden="true">·</span>
            </Link>
            <p className="text-[0.6rem] leading-[1.95] tracking-[0.07em] text-white/30 max-w-[28ch] mb-6">
              Your trusted real estate partner in Kenya.<br />
              Curated properties, personalised consultations,<br />
              lasting relationships.
            </p>
            {/* Social — inline text links */}
            <div className="flex gap-7">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.48rem] tracking-[0.32em] uppercase text-white/25 border-b border-white/[0.08] pb-px hover:text-white/65 hover:border-[#c49a3c] transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Address — right aligned */}
          <div className="lg:text-right space-y-1">
            <p className="text-[0.6rem] leading-[2.1] tracking-[0.08em] text-white/28">
              Near Yaya Centre, Kilimani
            </p>
            <p className="text-[0.6rem] leading-[2.1] tracking-[0.08em] text-white/28">
              Nairobi, Kenya
            </p>
            <div className="mt-3 space-y-1">
              <a href="tel:+254140530539" className="block text-[0.6rem] tracking-[0.08em] text-white/40 hover:text-white/70 transition-colors">
                +254 140 530 539
              </a>
              <a href="mailto:info@wanderealty.com" className="block text-[0.6rem] tracking-[0.08em] text-white/40 hover:text-white/70 transition-colors">
                info@wanderealty.com
              </a>
            </div>
          </div>
        </div>

        {/* ── LINK COLUMNS ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 pb-12 lg:pb-16">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              {/* Column title with gold line prefix */}
              <p className="flex items-center gap-2 text-[0.46rem] tracking-[0.38em] uppercase text-white/20 mb-6">
                <span className="w-4 h-px bg-[#c49a3c] opacity-50" />
                {title}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[0.68rem] tracking-[0.1em] text-white/38 hover:text-white/75 transition-colors duration-300"
                    >
                      {/* Gold line slides in on hover */}
                      <span className="w-0 h-px bg-[#c49a3c] group-hover:w-3 transition-all duration-350 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/[0.07] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[0.46rem] tracking-[0.22em] text-white/18">
            © {new Date().getFullYear()} Wande Realty. All rights reserved.
          </span>
          {/* Gold rule accent */}
          <div className="w-6 h-px bg-[#c49a3c] opacity-30 hidden md:block" />
          <div className="flex gap-8">
            <Link href="/contact" className="text-[0.46rem] tracking-[0.22em] text-white/18 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-[0.46rem] tracking-[0.22em] text-white/18 hover:text-white/50 transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="text-[0.46rem] tracking-[0.22em] text-white/18 hover:text-white/50 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
