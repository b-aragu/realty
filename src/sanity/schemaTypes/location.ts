import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          "Nairobi",
          "Mombasa",
          "Kwale (Diani)",
          "Kilifi (Malindi/Watamu)",
          "Nakuru (Naivasha)",
          "Laikipia (Nanyuki)",
          "Kiambu",
          "Kajiado",
          "Machakos",
          "Kisumu",
          "Central Kenya",
          "Rift Valley",
          "Western Kenya",
          "Eastern Kenya"
        ],
      },
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    }),
  ],
});
