import Link from "next/link";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { Instagram, Facebook, Youtube } from "lucide-react";

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
  { href: "https://www.instagram.com/wanderealty", label: "Instagram", icon: Instagram },
  { href: "https://www.facebook.com/wanderealty", label: "Facebook", icon: Facebook },
  { href: "https://www.youtube.com/@Wanderealty", label: "YouTube", icon: Youtube },
  {
    href: buildWhatsAppHref({
      intro: "Hello Wande Realty, I'm interested in a property enquiry.",
      pagePath: "/",
      source: "footer_social",
    }),
    label: "WhatsApp",
    icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
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
            {/* Social — inline icon links */}
            <div className="flex gap-6">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.label === "WhatsApp" 
                      ? `https://wa.me/254140530539?text=${encodeURIComponent(`Hi, I have a general enquiry about Wande Realty. Page Link: ${typeof window !== 'undefined' ? window.location.href : 'https://wanderealty.com'}`)}`
                      : s.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={s.label}
                  >
                    <div className="text-white/20 group-hover:text-[#c49a3c] transition-all duration-400">
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </a>
                );
              })}
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
