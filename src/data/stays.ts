import type { Stay } from "@/sanity/fetch";

export const stays: Stay[] = [
  {
    _id: "stay-1",
    title: "Nandwa Ivy",
    subtitle: "2 Bedroom Urban Retreat",
    location: "Kilimani · Nairobi",
    guests: 4,
    pricePerNight: "KES 12,000",
    description: "A meticulously curated two-bedroom urban retreat featuring premium furnishings, warm wood tones, and abundant natural light. Perfect for business travellers or families seeking a serene sanctuary in the heart of Kilimani.",
    mainImage: "/images/stays/nandwa-2bed.png",
    amenities: ["High-speed WiFi", "Smart TV", "Full Kitchen", "Pool Access", "Gym", "Secure Parking"],
    whatsappMessage: "Hi, I'm interested in booking the Nandwa Ivy 2-Bedroom stay.",
  },
  {
    _id: "stay-2",
    title: "The Curated Suite",
    subtitle: "1 Bedroom Retreat",
    location: "Lavington · Nairobi",
    guests: 2,
    pricePerNight: "KES 8,500",
    description: "An intimate, sunlit one-bedroom apartment designed with minimalist elegance. Warm wood tones and thoughtful touches throughout — a peaceful escape from the city's pulse.",
    mainImage: "/images/stays/cozy-1bed.png",
    amenities: ["Workspace", "High-speed WiFi", "Smart TV", "Kitchenette", "Balcony", "24/7 Security"],
    whatsappMessage: "Hi, I'm interested in booking the Curated 1-Bedroom stay.",
  },
  {
    _id: "stay-3",
    title: "The Quiet Room",
    subtitle: "Studio · New Listing",
    location: "Westlands · Nairobi",
    guests: 2,
    pricePerNight: "KES 6,000",
    description: "A refined studio designed for the thoughtful solo traveller. Clean lines, natural materials, and considered silence. Nothing superfluous — everything intentional.",
    mainImage: "/images/stays/studio-quiet.png",
    amenities: ["Workspace", "High-speed WiFi", "Kitchenette", "City View", "24/7 Security"],
    whatsappMessage: "Hi, I'm interested in booking The Quiet Room studio.",
  }
];
