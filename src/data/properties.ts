export interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  priceNumber: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  propertyType: string;
  status: "For Sale" | "For Rent" | "Off-Plan" | "Completed";
  description: string;
  image: string;
  images: { url: string; caption?: string }[];
  amenities: string[];
  coordinates: { lat: number; lng: number };
  projectName?: string;
  videoUrl?: string;
  projectSlug?: string;
  nearbyLocations?: { name: string; time: string }[];
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Lavington",
    location: "Lavington, Nairobi",
    area: "Nairobi",
    price: "KES 13.5M",
    priceNumber: 13500000,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 85,
    propertyType: "Apartment",
    status: "For Sale",
    description:
      "A beautifully designed 2-bedroom apartment in the heart of Lavington. Features an open-plan living area, modern kitchen with stone countertops, and a private balcony overlooking landscaped gardens. Part of the Blossom Ivy development.",
    image: "/images/properties/lavington-2br.jpg",
    images: [{ url: "/images/properties/lavington-2br.jpg", caption: "Main Living Area" }],
    amenities: ["Pool", "Gym", "Backup Generator", "Borehole"],
    coordinates: { lat: -1.2784, lng: 36.7763 },
    projectName: "Blossom Ivy",
  },
  {
    id: "2",
    title: "Luxury 3BR Penthouse in Kilimani",
    location: "Kilimani, Nairobi",
    area: "Nairobi",
    price: "KES 35M",
    priceNumber: 35000000,
    bedrooms: 3,
    bathrooms: 3,
    sqm: 180,
    propertyType: "Penthouse",
    status: "Off-Plan",
    description:
      "An exclusive penthouse at the top of Azure Crest tower with panoramic views of the Nairobi skyline. Features floor-to-ceiling windows, a private terrace, chef's kitchen, and access to the sky lounge.",
    image: "/images/properties/karen-estate.jpg",
    images: [{ url: "/images/properties/karen-estate.jpg", caption: "Estate Ground" }],
    amenities: ["Clubhouse", "Tennis Court", "24/7 Security", "Solar Water Heating"],
    coordinates: { lat: -1.2921, lng: 36.7851 },
    projectName: "Azure Crest",
  },
  {
    id: "3",
    title: "Beachfront 3BR Villa in Malindi",
    location: "Malindi, Mombasa",
    area: "Mombasa",
    price: "KES 32M",
    priceNumber: 32000000,
    bedrooms: 3,
    bathrooms: 3,
    sqm: 200,
    propertyType: "Villa",
    status: "Off-Plan",
    description:
      "A stunning beachfront villa with direct access to pristine white sand beaches. Features an open-air living concept, private pool, and lush tropical gardens. Part of the Palm Haven development.",
    image: "/images/properties/nyali-villa.jpg",
    images: [{ url: "/images/properties/nyali-villa.jpg", caption: "Poolside Exterior" }],
    amenities: ["Private Beach Access", "Infinity Pool", "Servant Quarters", "Beach Club", "Security"],
    coordinates: { lat: -3.2138, lng: 40.1169 },
    projectName: "Palm Haven",
  },
  {
    id: "4",
    title: "1BR Studio Apartment in Westlands",
    location: "Westlands, Nairobi",
    area: "Nairobi",
    price: "KES 45,000/mo",
    priceNumber: 45000,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 45,
    propertyType: "Apartment",
    status: "For Rent",
    description:
      "A chic studio apartment in the vibrant heart of Westlands. Modern finishes, built-in wardrobes, and access to shared amenities including a rooftop pool and co-working space. Perfect for young professionals.",
    image: "/images/properties/westlands-studio.jpg",
    images: [{ url: "/images/properties/westlands-studio.jpg", caption: "Interior Perspective" }],
    amenities: ["Rooftop Pool", "Co-working", "Gym", "Parking", "Security"],
    coordinates: { lat: -1.2673, lng: 36.8114 },
  },
  {
    id: "5",
    title: "4BR Family Home in Kiambu",
    location: "Kiambu",
    area: "Kiambu",
    price: "KES 28M",
    priceNumber: 28000000,
    bedrooms: 4,
    bathrooms: 3,
    sqm: 250,
    propertyType: "House",
    status: "Completed",
    description:
      "A spacious family home set on half an acre in the green belt of Kiambu. Features include a large garden, servant quarters, double garage, and mature trees. Ideal for families seeking space and tranquillity close to Nairobi.",
    image: "/images/properties/kiambu-house.jpg",
    images: [{ url: "/images/properties/kiambu-house.jpg", caption: "Garden View" }],
    amenities: ["Garden", "Garage", "SQ", "Borehole", "Security"],
    coordinates: { lat: -1.1714, lng: 36.8356 },
  },
  {
    id: "6",
    title: "2BR Apartment in Kilimani",
    location: "Kilimani, Nairobi",
    area: "Nairobi",
    price: "KES 16M",
    priceNumber: 16000000,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 95,
    propertyType: "Apartment",
    status: "For Sale",
    description:
      "A premium 2-bedroom apartment in Azure Crest, Kilimani. The unit features a spacious open-plan kitchen and living room, master ensuite, and a balcony with views of the Nairobi skyline.",
    image: "/images/properties/kileleshwa-apt.jpg",
    images: [{ url: "/images/properties/kileleshwa-apt.jpg", caption: "Lounge Area" }],
    amenities: ["Gym", "Speed Lifts", "Intercom", "Borehole"],
    coordinates: { lat: -1.2921, lng: 36.7851 },
    projectName: "Azure Crest",
  },
];
