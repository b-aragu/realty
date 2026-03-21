import { defineField, defineType } from "sanity";
import { cloudinaryImage, cloudinaryGalleryItem } from "./cloudinaryImage";

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
    // ── Homepage Images (Cloudinary) ──
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      description: "The large hero background image shown on the homepage",
      ...cloudinaryImage,
    }),
    defineField({
      name: "lifestyleImages",
      title: "Lifestyle Category Images",
      description: "4 images for: Urban Living, Beachfront Escapes, Family Homes, Investment Properties",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { 
              name: "category", 
              type: "string", 
              title: "Category Name",
              options: {
                list: [
                  { title: "Urban Living", value: "Urban Living" },
                  { title: "Beachfront Escapes", value: "Beachfront Escapes" },
                  { title: "Family Homes", value: "Family Homes" },
                  { title: "Investment Properties", value: "Investment Properties" },
                ]
              }
            },
            { name: "url", type: "url", title: "Image URL" },
            { name: "public_id", type: "string", title: "Cloudinary Public ID" },
            { name: "alt", type: "string", title: "Alt Text" },
          ],
          components: { input: cloudinaryImage.components.input },
          preview: {
            select: { title: "category", subtitle: "url" },
          },
        },
      ],
    }),
  ],
});
