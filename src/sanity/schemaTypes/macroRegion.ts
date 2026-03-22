import { defineField, defineType } from "sanity";

export const macroRegion = defineType({
  name: "macroRegion",
  title: "Macro Region",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., Nairobi, Mombasa, Rift Valley",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "e.g., 'Capital City · Premium Urban Living'",
    }),
    defineField({
      name: "price",
      title: "Starting Price",
      type: "string",
      description: "e.g., 'From KES 8M'",
    }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number", validation: (Rule) => Rule.required() },
        { name: "lng", title: "Longitude", type: "number", validation: (Rule) => Rule.required() },
      ],
      description: "Central coordinates for the map to focus on",
    }),
    defineField({
      name: "zoom",
      title: "Default Zoom Level",
      type: "number",
      description: "e.g., 12 for strict city view, 10 for wider province view. Default is 12.",
    }),
  ],
});
