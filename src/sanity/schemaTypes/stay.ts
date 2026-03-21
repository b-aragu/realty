import { defineField, defineType } from "sanity";
import { cloudinaryImage, cloudinaryGalleryItem } from "./cloudinaryImage";

export const stay = defineType({
  name: "stay",
  title: "Stay / Airbnb",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (e.g., Nandwa Ivy)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (e.g., 2 Bedroom Urban Retreat)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location (e.g., Kilimani, Nairobi)",
      type: "string",
    }),
    defineField({
      name: "guests",
      title: "Max Guests",
      type: "number",
    }),
    defineField({
      name: "pricePerNight",
      title: "Price Per Night (Formatted e.g., KES 12,000)",
      type: "string",
    }),
    defineField({
      name: "priceNumber",
      title: "Price (Numerical)",
      type: "number",
      description: "Used for sorting",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    // ── Cloudinary Images ──
    defineField({
      name: "mainImage",
      title: "Main Image",
      ...cloudinaryImage,
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [cloudinaryGalleryItem],
      description: "Upload additional images here and give them captions to overlay on the collage UI.",
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., High-speed WiFi, Smart TV",
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Pre-fill Message",
      type: "string",
      description: "The custom text sent to WhatsApp when booking (e.g. Hi, I'm interested in booking Nandwa Ivy)",
    }),
  ],
});
