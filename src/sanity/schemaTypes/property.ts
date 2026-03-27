import { defineField, defineType } from "sanity";
import { cloudinaryImage, cloudinaryGalleryItem } from "./cloudinaryImage";

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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      type: "reference",
      to: [{ type: "macroRegion" }],
      description: "Select the broader region this property belongs to (e.g., Nairobi)",
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
        list: [
          "Apartment", 
          "Villa", 
          "Penthouse", 
          "House", 
          "Studio",
          "Townhouse",
          "Duplex",
          "Mansion",
          "Cottage",
          "Farmhouse",
          "Commercial Space",
          "Land/Plot"
        ],
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
    // ── Cloudinary Images ──
    defineField({
      name: "mainImage",
      title: "Main Image",
      ...cloudinaryImage,
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [cloudinaryGalleryItem],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video Tour URL",
      type: "url",
      description: "YouTube, TikTok, or Instagram link for this property (optional — only displays if provided)",
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
      name: "nearbyLocations",
      title: "Nearby Locations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Location Name", type: "string", description: "e.g. Nairobi CBD" },
            { name: "time", title: "Time / Distance", type: "string", description: "e.g. 15 mins" }
          ]
        }
      ],
      description: "Optional: Add prominent nearby locations to display over the Location Map.",
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
