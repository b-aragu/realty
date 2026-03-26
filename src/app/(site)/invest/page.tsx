import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ROICalculator from "@/components/ROICalculator";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Invest in Kenyan Real Estate | Off-Plan & High Yield",
  description:
    "Explore property investment opportunities in Kenya. Discover off-plan residential guides, comprehensive diaspora investment info, rental yield data, and our interactive ROI calculator.",
  path: "/invest",
  keywords: ["invest in kenya real estate", "diaspora property investment nairobi", "high yield rental properties kilimani", "buy off plan apartments", "real estate roi calculator kenya"],
});



const sections = [
  {
    title: "Why Invest in Kenyan Real Estate?",
    eyebrow: "Market Overview",
    content: `Kenya's property market offers compelling returns driven by rapid urbanisation, a growing middle class, and increasing diaspora investment. Nairobi alone requires over 200,000 new housing units annually, creating sustained demand that supports both rental yields and capital appreciation.`,
    highlights: [
      "GDP growth averaging 5-6% annually",
      "Rental yields of 5-10% in prime locations",
      "Strong capital appreciation in Nairobi's suburbs",
      "Favourable land ownership laws for Kenyans and diaspora",
      "Growing demand for quality housing in Mombasa and satellite towns",
    ],
  },
  {
    title: "Off-Plan Investment Guide",
    eyebrow: "Strategy",
    content: `Buying off-plan means purchasing a property before or during construction. It's one of the most effective strategies for building wealth through real estate in Kenya.`,
    highlights: [
      "Purchase at 15-30% below completed market value",
      "Flexible developer payment plans (10-30% deposit, balance over 12-24 months)",
      "Choice of premium units and preferred floors",
      "Built-in capital appreciation by completion",
    ],
  },
  {
    title: "Diaspora Investment Guide",
    eyebrow: "For Global Kenyans",
    content: `Kenyans living abroad have full rights to own property in Kenya. The process has become increasingly streamlined, with developers offering dedicated diaspora sales teams and remote transaction support.`,
    highlights: [
      "Research locations and developers (we can help)",
      "Select your property and negotiate terms",
      "Sign a sale agreement (can be done remotely or via power of attorney)",
      "Make payments per the agreed schedule",
      "Legal conveyancing and title transfer upon completion",
    ],
  },
  {
    title: "Understanding Rental Yields",
    eyebrow: "Data & Insights",
    content: `Rental yield is the annual rental income expressed as a percentage of the property's value. It's a key metric for evaluating investment properties.`,
    highlights: [
      "Kilimani: 7-10%",
      "Westlands: 6-9%",
      "Lavington: 6-8%",
      "Kiambu: 5-7%",
      "Mombasa (short-term/Airbnb): 8-15%",
    ],
  },
];

export default function InvestPage() {
  return (
    <>
      {/* Header — editorial two-column */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Investment</p>
                <h1 className="font-cormorant font-light text-[clamp(3rem,5vw,5rem)] leading-[1.04] text-[#1c2340]">
                  In<em className="italic text-[#3a5299]">vest</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              <div className="flex flex-col items-start lg:items-end gap-6">
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                  Everything you need to know about investing in Kenyan real
                  estate — from off-plan opportunities to rental yield strategies.
                </p>
                {/* Stats */}
                <div className="flex items-center gap-6">
                  {[
                    { num: "5-10%", label: "Avg Yield" },
                    { num: "200K+", label: "Units Needed" },
                    { num: "5-6%", label: "GDP Growth" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                      {i > 0 && <div className="w-px h-8 bg-[#dde1ee] mr-6" />}
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-cormorant font-light text-[1.6rem] text-[#1c2340] leading-none">{stat.num}</span>
                        <span className="text-[0.46rem] tracking-[0.3em] uppercase text-[#8b91a8]">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`py-16 lg:py-24 ${i % 2 === 1 ? "bg-[#f8f7f4]" : ""}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row gap-12 lg:gap-24">
            <AnimatedSection>
              <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">{section.eyebrow}</p>
              <h2 className="font-cormorant font-light text-[clamp(1.6rem,2.5vw,2.2rem)] text-[#1c2340] mb-3">
                {section.title}
              </h2>
              <div className="w-8 h-px bg-[#c49a3c] mb-6" />
              <p className="text-[0.72rem] leading-[2.1] text-[#8b91a8] mb-6">
                {section.content}
              </p>
              <div className="space-y-3">
                {section.highlights.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <span className="text-[#c49a3c] text-[0.6rem] mt-1">✦</span>
                    <span className="text-[0.68rem] leading-[1.8] text-[#8b91a8]">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* ROI Calculator */}
      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <ROICalculator />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#1c2340]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
          <AnimatedSection>
            <div className="w-px h-10 bg-[#c49a3c] mx-auto mb-8" />
            <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-white mb-4">
              Ready to <em className="italic text-[#c49a3c]">Invest?</em>
            </h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto text-[0.68rem] leading-[2]">
              Speak with our property investment consultants to find the right
              opportunity for your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
              <a
                href="/contact"
                className="group flex items-center justify-center gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-white hover:text-[#c49a3c] transition-all duration-300"
              >
                Schedule Consultation
                <span className="block w-8 h-px bg-[#c49a3c] group-hover:w-12 transition-all duration-400" />
              </a>
              <a
                href="/discover"
                className="text-[0.58rem] tracking-[0.28em] uppercase text-white/50 border-b border-white/20 pb-px hover:text-white hover:border-white transition-all duration-300"
              >
                View Developments
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
