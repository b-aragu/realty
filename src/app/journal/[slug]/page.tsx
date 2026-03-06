import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { articles } from "@/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.image, width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <article className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <Link
              href="/journal"
              className="text-sm text-[#5a73d7] hover:underline mb-6 inline-block"
            >
              ← Back to Journal
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs tracking-wide bg-[#2f4858] text-white font-medium rounded-sm">
                {article.category}
              </span>
              <span className="text-xs text-[#6b7c8a]">{article.readTime}</span>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl text-[#2f4858] mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-[#6b7c8a] text-lg mb-2">{article.excerpt}</p>
            <p className="text-sm text-[#6b7c8a] mb-10">
              By {article.author} · {article.date}
            </p>

            <div
              className="w-full h-64 md:h-96 rounded-sm bg-cover bg-center mb-12"
              style={{
                backgroundImage: `url(${article.image})`,
                backgroundColor: "#dce3ea",
              }}
            />

            <div className="prose prose-lg max-w-none text-[#131110] [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:text-[#2f4858] [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[#6b7c8a] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-[#6b7c8a] [&_ol]:text-[#6b7c8a] whitespace-pre-line">
              {article.content}
            </div>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
