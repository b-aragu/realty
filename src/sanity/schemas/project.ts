// Sanity CMS Schema: Project
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "location", title: "Location", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "story", title: "Story", type: "text" },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    {
      name: "unitTypes",
      title: "Unit Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "size", title: "Size", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "bedrooms", title: "Bedrooms", type: "number" },
            { name: "bathrooms", title: "Bathrooms", type: "number" },
          ],
        },
      ],
    },
    { name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] },
    { name: "investmentHighlights", title: "Investment Highlights", type: "array", of: [{ type: "string" }] },
    { name: "completionStatus", title: "Completion Status", type: "string", options: { list: ["Off-Plan", "Under Construction", "Completed"] } },
    { name: "completionDate", title: "Completion Date", type: "string" },
    { name: "startingPrice", title: "Starting Price", type: "string" },
    { name: "coordinates", title: "Coordinates", type: "geopoint" },
  ],
};
