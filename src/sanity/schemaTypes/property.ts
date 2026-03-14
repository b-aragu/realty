import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Residency",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (Display)",
      type: "string",
      description: 'e.g., "Lavington, Nairobi"',
    }),
    defineField({
      name: "area",
      title: "Macro Area",
      type: "string",
      options: {
        list: [
          { title: "Nairobi", value: "Nairobi" },
          { title: "Coast", value: "Mombasa" },
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Price (Formatted)",
      type: "string",
      description: 'e.g., "KES 13.5M"',
    }),
    defineField({
      name: "priceNumber",
      title: "Price (Numerical)",
      type: "number",
      description: "Used for sorting and filtering",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
    }),
    defineField({
      name: "sqm",
      title: "Square Meters",
      type: "number",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: ["Apartment", "Villa", "Penthouse", "House", "Studio"],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["For Sale", "For Rent", "Off-Plan", "Completed"],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    }),
    defineField({
      name: "project",
      title: "Associated Project",
      type: "reference",
      to: [{ type: "project" }],
      description: "If this property is part of a larger off-plan development",
    }),
  ],
});
