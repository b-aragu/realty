import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Wande Realty — Kenya's premium real estate company specialising in curated residential properties, off-plan developments, and investment opportunities.",
};

const values = [
  {
    title: "Curation over Volume",
    description:
      "We only represent properties and developments that meet our exacting standards for quality, location, and value.",
  },
  {
    title: "Transparency",
    description:
      "Every detail — pricing, timelines, legal status — is shared openly with our clients. No hidden costs, no surprises.",
  },
  {
    title: "Client-First Approach",
    description:
      "Whether you're a first-time buyer or a seasoned investor, our team provides personalised guidance tailored to your goals.",
  },
  {
    title: "Market Expertise",
    description:
      "Deep knowledge of Kenya's property landscape, from Nairobi's urban core to the coast's beachfront communities.",
  },
];

const team = [
  {
    name: "Wande Mwangi",
    role: "Founder & CEO",
    bio: "15 years in Kenyan real estate. Previously with Knight Frank Kenya.",
  },
  {
    name: "Aisha Omar",
    role: "Head of Sales",
    bio: "Specialist in luxury residential properties and diaspora investments.",
  },
  {
    name: "James Karanja",
    role: "Property Consultant",
    bio: "Expert in Nairobi's residential market with a focus on Kilimani and Lavington.",
  },
  {
    name: "Fatima Hassan",
    role: "Coast Region Lead",
    bio: "Based in Mombasa, covering Malindi and coastal developments.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              About Wande Realty
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              A modern real estate company built on curation, transparency,
              and deep market expertise in Kenya.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="h-80 rounded-sm bg-cover bg-center bg-[#eaeff3]"
                style={{ backgroundImage: "url(/images/about-office.jpg)" }}
              />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] mb-3 font-medium">
                  Our Story
                </p>
                <h2 className="font-playfair text-2xl text-[#2f4858] mb-4">
                  Redefining Real Estate in Kenya
                </h2>
                <p className="text-[#6b7c8a] leading-relaxed">
                  Wande Realty was founded with a simple belief: finding a home
                  should be an experience, not a hassle. We curate exceptional
                  properties across Kenya — from Nairobi&apos;s vibrant
                  neighbourhoods to the serene Kenyan coast — presenting them
                  with the care and detail they deserve.
                </p>
                <p className="text-[#6b7c8a] leading-relaxed mt-4">
                  Based in Kilimani, near Yaya Center, our team combines deep
                  local expertise with a design-forward presentation that helps
                  buyers and investors make confident decisions.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-[#eaeff3]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">Principles</p>
              <h2 className="font-playfair text-3xl text-[#2f4858] mb-4">Our Values</h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-sm shadow-sm h-full">
                  <span className="text-2xl text-[#ffc14d] mb-4 block">✦</span>
                  <h3 className="font-playfair text-lg text-[#2f4858] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#6b7c8a] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a73d7] font-medium mb-3">People</p>
              <h2 className="font-playfair text-3xl text-[#2f4858] mb-4">Our Team</h2>
              <div className="jp-divider mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-[#eaeff3] mx-auto mb-4" />
                  <h3 className="font-playfair text-lg text-[#2f4858]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#5a73d7] mb-2">{member.role}</p>
                  <p className="text-sm text-[#6b7c8a]">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#2f4858]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="jp-divider mx-auto !bg-[#ffc14d]" />
            <h2 className="font-playfair text-3xl text-white mb-4 mt-6">
              Work With Us
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Whether you&apos;re buying, investing, or just exploring, we&apos;re
              here to help.
            </p>
            <CTAButton href="/contact" variant="gold">
              Get in Touch
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Wande Realty",
            description:
              "Premium real estate company in Kenya specialising in curated residential properties and investment opportunities.",
            url: "https://www.wanderealty.com",
            logo: "https://www.wanderealty.com/wandelogo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kilimani, near Yaya Center",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: "+254712678334",
            sameAs: [
              "https://www.facebook.com/wanderealty",
              "https://www.instagram.com/wanderealty",
            ],
          }),
        }}
      />
    </>
  );
}
