// Sanity CMS Schema: Agent
export default {
  name: "agent",
  title: "Agent",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "whatsapp", title: "WhatsApp", type: "string" },
    {
      name: "specialisms",
      title: "Specialisms",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    },
    { name: "transactions", title: "Transactions (e.g. 50+)", type: "string" },
    { name: "experience", title: "Experience (e.g. 5 yrs)", type: "string" },
    { name: "primaryMarket", title: "Primary Market (e.g. Nairobi)", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
