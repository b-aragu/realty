// Sanity CMS Schema: Location
export default {
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "region", title: "Region", type: "string", options: { list: ["Nairobi", "Coast", "Central", "Other"] } },
    { name: "coordinates", title: "Coordinates", type: "geopoint" },
    { name: "seoTitle", title: "SEO Title", type: "string" },
    { name: "seoDescription", title: "SEO Description", type: "text" },
  ],
};
