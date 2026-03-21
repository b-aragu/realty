import { defineField, defineType } from "sanity";
import { cloudinaryImage, cloudinaryGalleryItem } from "./cloudinaryImage";

export const project = defineType({
  name: "project",
  title: "Development",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location Display",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
    }),
    defineField({
      name: "story",
      title: "Story / Vision",
      type: "text",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      description: "Italicized quote in the Vision section",
    }),
    // ── Cloudinary Images ──
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      ...cloudinaryImage,
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [cloudinaryGalleryItem],
    }),
    defineField({
      name: "unitTypes",
      title: "Unit Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "subName", title: "Sub Name", type: "string", description: "e.g. Premium · Configuration" },
            { name: "size", title: "Size", type: "string" },
            { name: "bedrooms", title: "Bedrooms", type: "number" },
            { name: "bathrooms", title: "Bathrooms", type: "number" },
            { name: "occupancy", title: "Occupancy", type: "string", description: "e.g. 1–2 Persons" },
            { name: "price", title: "Price", type: "string" },
            defineField({
              name: "linkedProperty",
              title: "Linked Property Listing",
              type: "reference",
              to: [{ type: "property" }],
              description: "Optional: Link this unit type directly to a specific property listing page.",
            }),
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
      name: "amenitiesSubtitle",
      title: "Amenities Subtitle",
      type: "text",
      description: "Brief description under the Amenities heading",
    }),
    defineField({
      name: "investmentDescription",
      title: "Investment Description",
      type: "text",
      description: "Brief description under the Investment heading",
    }),
    defineField({
      name: "unitTypesNote",
      title: "Unit Types Note",
      type: "text",
      description: "Small note next to Unit Types heading (e.g. Payment plan info)",
    }),
    defineField({
      name: "investmentHighlights",
      title: "Investment Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "completionStatus",
      title: "Completion Status",
      type: "string",
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "string",
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "string",
    }),
    defineField({
      name: "totalUnits",
      title: "Total Units",
      type: "number",
    }),
    defineField({
      name: "floors",
      title: "Total Floors",
      type: "string",
      description: "e.g. G+10",
    }),
    defineField({
      name: "sqmRange",
      title: "SQM Range",
      type: "string",
      description: "e.g. 38–85",
    }),
    defineField({
      name: "rentalYield",
      title: "Rental Yield",
      type: "string",
      description: "e.g. 7–10%",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Tour URL",
      type: "url",
      description: "YouTube or TikTok link for this development (optional — only displays if provided)",
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
            { name: "name", title: "Location Name", type: "string" },
            { name: "time", title: "Time / Distance", type: "string" }
          ]
        }
      ],
      description: "Optional: Add prominent nearby locations to display over the Location Map.",
    }),
  ],
});
