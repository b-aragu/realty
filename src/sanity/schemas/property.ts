// Sanity CMS Schema: Property
export default {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "location", title: "Location", type: "string" },
    { name: "area", title: "Area", type: "string" },
    { name: "price", title: "Price Display", type: "string" },
    { name: "priceNumber", title: "Price (Number)", type: "number" },
    { name: "bedrooms", title: "Bedrooms", type: "string" },
    { name: "bathrooms", title: "Bathrooms", type: "number" },
    { name: "sqm", title: "Area (sqm)", type: "string" },
    { name: "propertyType", title: "Property Type", type: "string", options: { list: ["Apartment", "House", "Villa", "Penthouse", "Townhouse"] } },
    { name: "status", title: "Status", type: "string", options: { list: ["For Sale", "For Rent", "Off-Plan", "Completed"] } },
    { name: "description", title: "Description", type: "text" },
    { name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] },
    { name: "coordinates", title: "Coordinates", type: "geopoint" },
    { name: "project", title: "Project", type: "reference", to: [{ type: "project" }] },
  ],
};
