import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
    }),
    defineField({
      name: "avgYield",
      title: "Average Yield Display",
      type: "string",
      description: 'e.g., "7-10%"',
    }),
    defineField({
      name: "homeHeroTitle",
      title: "Home Hero Title",
      type: "string",
    }),
    defineField({
      name: "homeHeroTagline",
      title: "Home Hero Tagline",
      type: "text",
    }),
    defineField({
      name: "residencesHeroTitle",
      title: "Residences Hero Title",
      type: "string",
    }),
    defineField({
      name: "residencesHeroTagline",
      title: "Residences Hero Tagline",
      type: "text",
    }),
  ],
});
