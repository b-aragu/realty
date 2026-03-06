import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ROICalculator from "@/components/ROICalculator";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Invest in Kenyan Real Estate",
  description:
    "Explore property investment opportunities in Kenya. Off-plan guides, diaspora investment info, rental yield data, and an interactive ROI calculator.",
};

const sections = [
  {
    title: "Why Invest in Kenyan Real Estate?",
    content: `Kenya's property market offers compelling returns driven by rapid urbanisation, a growing middle class, and increasing diaspora investment. Nairobi alone requires over 200,000 new housing units annually, creating sustained demand that supports both rental yields and capital appreciation.

Key highlights:
• GDP growth averaging 5-6% annually
• Rental yields of 5-10% in prime locations
• Strong capital appreciation in Nairobi's suburbs
• Favourable land ownership laws for Kenyans and diaspora
• Growing demand for quality housing in Mombasa and satellite towns`,
  },
  {
    title: "Off-Plan Investment Guide",
    content: `Buying off-plan means purchasing a property before or during construction. It's one of the most effective strategies for building wealth through real estate in Kenya.

Advantages:
• Purchase at 15-30% below completed market value
• Flexible developer payment plans (typically 10-30% deposit, balance over 12-24 months)
• Choice of premium units and preferred floors
• Built-in capital appreciation by completion

Risks to consider:
• Construction delays are possible — work with established developers
• Market conditions may shift — invest in high-demand locations
• Always verify title deeds, building permits, and developer track record`,
  },
  {
    title: "Diaspora Investment Guide",
    content: `Kenyans living abroad have full rights to own property in Kenya. The process has become increasingly streamlined, with developers offering dedicated diaspora sales teams and remote transaction support.

Steps to invest from abroad:
1. Research locations and developers (we can help)
2. Select your property and negotiate terms
3. Sign a sale agreement (can be done remotely or via power of attorney)
4. Make payments per the agreed schedule
5. Legal conveyancing and title transfer upon completion

Financing options:
• Developer payment plans (most common for diaspora buyers)
• Diaspora mortgage products from Kenyan banks (12-14% p.a.)
• Sacco-based financing for qualifying members`,
  },
  {
    title: "Understanding Rental Yields",
    content: `Rental yield is the annual rental income expressed as a percentage of the property's value. It's a key metric for evaluating investment properties.

Gross Rental Yield = (Annual Rent ÷ Property Price) × 100

Average yields by area:
• Kilimani: 7-10%
• Westlands: 6-9%
• Lavington: 6-8%
• Kiambu: 5-7%
• Mombasa (short-term/Airbnb): 8-15%

Tips for maximising yield:
• Invest in areas with strong rental demand (near business districts, hospitals, schools)
• Furnished apartments command 20-40% higher rents
• Short-term rentals on the coast can outperform long-term leases`,
  },
];

export default function InvestPage() {
  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              Invest
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              Everything you need to know about investing in Kenyan real
              estate — from off-plan opportunities to rental yield strategies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`py-16 lg:py-24 ${i % 2 === 1 ? "bg-[#eaeff3]/40" : ""}`}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <h2 className="font-playfair text-2xl md:text-3xl text-[#2f4858] mb-6">
                {section.title}
              </h2>
              <div className="text-[#6b7c8a] leading-relaxed space-y-4 whitespace-pre-line">
                {section.content}
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <ROICalculator />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#2f4858]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="jp-divider mx-auto !bg-[#ffc14d]" />
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4 mt-6">
              Ready to Invest?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Speak with our property investment consultants to find the right
              opportunity for your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact" variant="gold">
                Schedule a Consultation
              </CTAButton>
              <CTAButton href="/discover" variant="outline" className="!border-white/30 !text-white hover:!bg-white hover:!text-[#2f4858]">
                View Developments
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
