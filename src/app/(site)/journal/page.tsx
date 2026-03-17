import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import { getArticles } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Real Estate Journal & Market Insights | Wande Realty",
  description:
    "Insights, guides, and expert perspectives on Kenya's real estate market. Read Wande Realty's journal for off-plan investment tips, neighborhood guides, and market trends.",
  keywords: ["kenya real estate news", "nairobi property market insights", "invest in kenya off plan guide", "wande realty journal", "kilimani lavington neighborhood guide"]
};

export const runtime = "edge";

export default async function JournalPage() {
  const articles = await getArticles();

  // Split articles: first 3 get image cards, rest get list variant
  const imageArticles = articles.slice(0, 3);
  const listArticles = articles.slice(3);

  return (
    <>
      {/* Header — editorial two-column */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pb-10 border-b border-[#dde1ee] gap-6">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">
                  Insights &amp; Perspectives
                </p>
                <h1 className="font-cormorant font-light text-[clamp(2.2rem,3vw,3rem)] leading-[1.1] text-[#1c2340]">
                  From the <em className="italic text-[#3a5299]">Journal</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-4" />
              </div>
              <a
                href="/journal"
                className="group flex items-center gap-3 text-[0.58rem] tracking-[0.28em] uppercase text-[#1c2340] hover:text-[#2e4480] transition-all duration-300"
              >
                All Articles
                <span className="block w-7 h-px bg-current group-hover:w-11 transition-all duration-400" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Editorial image grid */}
      <section className="pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-10 lg:pt-16">
          <AnimatedSection>
            {imageArticles.length >= 3 ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[3px]">
                {/* Feature — large, left, spans 2 rows */}
                <div className="lg:row-span-2">
                  <BlogCard
                    article={imageArticles[0]}
                    variant="image"
                    imageHeight="h-[360px] lg:h-[620px]"
                  />
                </div>
                {/* Secondary A — top right */}
                <div>
                  <BlogCard
                    article={imageArticles[1]}
                    variant="image"
                    imageHeight="h-[300px]"
                  />
                </div>
                {/* Secondary B — bottom right */}
                <div>
                  <BlogCard
                    article={imageArticles[2]}
                    variant="image"
                    imageHeight="h-[317px]"
                  />
                </div>
              </div>
            ) : (
              /* Fallback: simple grid if less than 3 articles */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]">
                {imageArticles.map((article) => (
                  <BlogCard key={article.slug} article={article} variant="image" imageHeight="h-[340px]" />
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Text list row — remaining articles */}
      {listArticles.length > 0 && (
        <section className="pb-0">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-[#dde1ee]">
                {listArticles.map((article) => (
                  <BlogCard key={article.slug} article={article} variant="list" />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Footer note */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[0.5rem] tracking-[0.26em] uppercase text-[#8b91a8]">
                {articles.length} articles · Updated weekly
              </span>
              <a
                href="/contact"
                className="text-[0.52rem] tracking-[0.26em] uppercase text-[#1c2340] border-b border-[#dde1ee] pb-px hover:text-[#2e4480] hover:border-[#2e4480] transition-all duration-300"
              >
                Subscribe to the Journal
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
