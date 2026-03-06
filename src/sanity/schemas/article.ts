// Sanity CMS Schema: Article
export default {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
    { name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } },
    { name: "category", title: "Category", type: "string", options: { list: ["Investment", "Guide", "Lifestyle", "Diaspora", "Market Update"] } },
    { name: "author", title: "Author", type: "reference", to: [{ type: "agent" }] },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "readTime", title: "Read Time", type: "string" },
  ],
};
