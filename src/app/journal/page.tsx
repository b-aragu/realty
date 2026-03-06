import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Insights, guides, and expert perspectives on Kenya's real estate market from Wande Realty.",
};

export default function JournalPage() {
  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              Journal
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              Expert insights, investment guides, and lifestyle features from
              Kenya&apos;s property market.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.1}>
                <BlogCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
