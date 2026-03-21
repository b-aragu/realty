import { defineField, defineType } from "sanity";
import { cloudinaryImage } from "./cloudinaryImage";

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
    // ── Homepage Hero Image (Cloudinary) ──
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      description: "The large background image at the top of the homepage",
      ...cloudinaryImage,
    }),
    // ── Lifestyle Category Images (4 separate fields for clarity) ──
    defineField({
      name: "urbanLivingImage",
      title: "🏙️ Lifestyle: Urban Living",
      description: "Image for the 'Urban Living' card on the homepage",
      ...cloudinaryImage,
    }),
    defineField({
      name: "beachfrontImage",
      title: "🏖️ Lifestyle: Beachfront Escapes",
      description: "Image for the 'Beachfront Escapes' card on the homepage",
      ...cloudinaryImage,
    }),
    defineField({
      name: "familyHomesImage",
      title: "🏡 Lifestyle: Family Homes",
      description: "Image for the 'Family Homes' card on the homepage",
      ...cloudinaryImage,
    }),
    defineField({
      name: "investmentImage",
      title: "💼 Lifestyle: Investment Properties",
      description: "Image for the 'Investment Properties' card on the homepage",
      ...cloudinaryImage,
    }),
  ],
});
