import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}
import AnimatedSection from "@/components/AnimatedSection";
import { getArticles, getArticleBySlug } from "@/sanity/fetch";
import { urlFor } from "@/sanity/client";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Article Image"}
            className="w-full h-auto rounded-sm object-cover bg-[#dce3ea]"
            loading="lazy"
          />
          {value.alt && (
             <figcaption className="text-center text-[0.65rem] tracking-[0.05em] text-[#8b91a8] mt-3 uppercase">
               {value.alt}
             </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <article className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <Link
              href="/journal"
              className="text-sm text-[#2e4480] hover:underline mb-6 inline-block"
            >
              ← Back to Journal
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs tracking-wide bg-[#1c2340] text-white font-medium rounded-sm">
                {article.category}
              </span>
              <span className="text-xs text-[#8b91a8]">{article.readTime}</span>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl text-[#1c2340] mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-[#8b91a8] text-lg mb-2">{article.excerpt}</p>
            <p className="text-sm text-[#8b91a8] mb-10">
              By {article.author} · {article.date}
            </p>

            <div
              className="w-full h-64 md:h-96 rounded-sm bg-cover bg-center mb-12"
              style={{
                backgroundImage: `url(${article.image})`,
                backgroundColor: "#dce3ea",
              }}
            />

            <div className="prose prose-lg max-w-none text-[#131110] [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:text-[#1c2340] [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[#8b91a8] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-[#8b91a8] [&_ol]:text-[#8b91a8] whitespace-pre-line">
              {typeof article.content === "string" ? (
                article.content
              ) : (
                <PortableText 
                  value={article.content} 
                  components={portableTextComponents} 
                />
              )}
            </div>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
