import { defineField, defineType } from "sanity";
import CloudinaryUploader from "../components/CloudinaryUploader";

/**
 * Reusable Cloudinary image object type definition.
 * Used across property, project, and stay schemas.
 */
export const cloudinaryImage = {
  type: "object" as const,
  fields: [
    { name: "url", type: "url", title: "Image URL" },
    { name: "public_id", type: "string", title: "Cloudinary Public ID" },
    { name: "alt", type: "string", title: "Alt Text" },
  ],
  components: { input: CloudinaryUploader },
};

/**
 * Cloudinary gallery item (with optional caption).
 */
export const cloudinaryGalleryItem = {
  type: "object" as const,
  fields: [
    { name: "url", type: "url", title: "Image URL" },
    { name: "public_id", type: "string", title: "Cloudinary Public ID" },
    { name: "alt", type: "string", title: "Alt Text" },
    { name: "caption", type: "string", title: "Caption" },
  ],
  components: { input: CloudinaryUploader },
  preview: {
    select: { title: "caption", subtitle: "url" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      return {
        title: selection.title || "Gallery Image",
        subtitle: selection.subtitle ? "✓ Uploaded" : "⏳ Pending",
      };
    },
  },
};
