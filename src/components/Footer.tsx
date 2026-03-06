import Link from "next/link";

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
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/journal", label: "Blog" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#131110] text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair text-xl tracking-[0.15em] text-white mb-4">
              WANDE REALTY
            </h3>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Your trusted real estate partner in Kenya. Discover exclusive
              properties for rent or sale with personalised consultations.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/wanderealty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#ffc14d] hover:border-[#ffc14d] transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/wanderealty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-[#ffc14d] hover:border-[#ffc14d] transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/30 mb-6 font-medium">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#5a73d7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/30 mb-6 font-medium">
              Locations
            </h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#5a73d7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-white/30 mb-6 font-medium">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#5a73d7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-white/40">
              <p>Kilimani, near Yaya Center</p>
              <p>Nairobi, Kenya</p>
              <a href="tel:+254712678334" className="hover:text-[#ffc14d] transition-colors block">
                +254 712 678 334
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Wande Realty. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
