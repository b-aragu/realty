import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import { getAgents } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "About Us | Wande Realty Kenya",
  description:
    "Learn about Wande Realty — Kenya's premium real estate company specialising in curated residential properties, off-plan developments, and expert investment guidance.",
  keywords: ["wande realty team", "real estate agents nairobi", "property consultants kenya", "luxury real estate brokers", "buy property in kenya"]
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

export default async function AboutPage() {
  const agents = await getAgents();

  return (
    <>
      {/* Header — editorial two-column */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Who We Are</p>
                <h1 className="font-cormorant font-light text-[clamp(3rem,5vw,5rem)] leading-[1.04] text-[#1c2340]">
                  About <em className="italic text-[#3a5299]">Us</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                A modern real estate company built on curation, transparency,
                and deep market expertise in Kenya.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="h-80 bg-cover bg-center bg-[#dde1ee]"
                style={{ backgroundImage: "url(/images/about-office.jpg)" }}
              />
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Our Story</p>
                <h2 className="font-cormorant font-light text-[1.8rem] text-[#1c2340] mb-4">
                  Redefining Real Estate in Kenya
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mb-6" />
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] mb-6">
                  Wande Realty was founded with a simple belief: finding a home
                  should be an experience, not a hassle. We curate exceptional
                  properties across Kenya — from Nairobi&apos;s vibrant
                  neighbourhoods to the serene Kenyan coast.
                </p>
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8]">
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
      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Principles</p>
              <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] text-[#1c2340] mb-4">Our Values</h2>
              <div className="w-8 h-px bg-[#c49a3c] mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3px]">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-white p-8 h-full border-b border-[#dde1ee] hover:border-[#2e4480] transition-colors duration-300">
                  <span className="text-xl text-[#c49a3c] mb-4 block">✦</span>
                  <h3 className="font-cormorant font-light text-[1.2rem] text-[#1c2340] mb-3">
                    {v.title}
                  </h3>
                  <p className="text-[0.65rem] leading-[1.9] text-[#8b91a8]">
                    {v.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">The Advisory</p>
              <h2 className="font-cormorant font-light text-[clamp(2.5rem,3.5vw,3.2rem)] text-[#1c2340] mb-6">Expert Team</h2>
              <div className="w-8 h-px bg-[#c49a3c] mx-auto" />
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {agents.map((member, i) => (
              <AnimatedSection key={member._id} delay={i * 0.1}>
                <div className="text-center group">
                  <div 
                    className="w-40 h-40 rounded-full bg-[#dde1ee] mx-auto mb-8 border border-[#dde1ee] group-hover:border-[#c49a3c] transition-all duration-500 overflow-hidden"
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${member.photo})` }}
                    />
                  </div>
                  <h3 className="font-cormorant font-light text-[1.4rem] text-[#1c2340] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[0.48rem] tracking-[0.24em] uppercase text-[#c49a3c] mb-4">{member.role}</p>
                  <p className="text-[0.62rem] leading-[2] tracking-[0.06em] text-[#8b91a8] max-w-[24ch] mx-auto">
                    {member.bio}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#1c2340]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
          <AnimatedSection>
            <div className="w-px h-10 bg-[#c49a3c] mx-auto mb-8" />
            <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] text-white mb-4">
              Work With Us
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto text-[0.68rem] leading-[2]">
              Whether you&apos;re buying, investing, or just exploring, we&apos;re
              here to help.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact"
                className="group flex items-center justify-center gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-white hover:text-[#c49a3c] transition-all duration-300"
              >
                Get in Touch
                <span className="block w-8 h-px bg-[#c49a3c] group-hover:w-12 transition-all duration-400" />
              </a>
            </div>
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
            telephone: "+254140530539",
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
