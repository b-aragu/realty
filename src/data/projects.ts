export interface UnitType {
  name: string;
  subName?: string;
  size: string;
  occupancy?: string;
  bedrooms: string;
  bathrooms: number;
  price: string;
  linkedPropertyId?: string;
  linkedPropertySlug?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  location: string;
  description: string;
  story: string;
  pullQuote?: string;
  heroImage: string;
  gallery: { url: string; caption?: string }[];
  unitTypes: UnitType[];
  amenities: string[];
  investmentHighlights: string[];
  completionStatus: string;
  completionDate: string;
  coordinates: { lat: number; lng: number };
  startingPrice: string;
  totalUnits?: number;
  floors?: string;
  sqmRange?: string;
  rentalYield?: string;
  amenitiesSubtitle?: string;
  investmentDescription?: string;
  unitTypesNote?: string;
  videoUrl?: string;
  nearbyLocations?: { name: string; time: string }[];
}

export const projects: Project[] = [
  {
    slug: "blossom-ivy",
    title: "Blossom Ivy",
    tagline: "Where Nature Meets Modern Living",
    location: "Lavington, Nairobi",
    description:
      "A collection of thoughtfully designed apartments nestled in one of Nairobi's most serene neighbourhoods. Blossom Ivy brings together contemporary architecture and lush green surroundings.",
    story:
      "Inspired by the harmony between nature and modern living, Blossom Ivy was conceived as a sanctuary within the city. Every detail — from the landscaped courtyards to the floor-to-ceiling windows — has been crafted to bring the outdoors in. Residents enjoy the quiet elegance of Lavington while remaining minutes from Nairobi's vibrant core.",
    heroImage: "/images/projects/blossom-ivy-hero.jpg",
    gallery: [
      { url: "/images/projects/blossom-ivy-1.jpg", caption: "Exterior Render" },
      { url: "/images/projects/blossom-ivy-2.jpg", caption: "Living Room" },
      { url: "/images/projects/blossom-ivy-3.jpg", caption: "Kitchen" },
      { url: "/images/projects/blossom-ivy-4.jpg", caption: "Bedroom" },
    ],
    unitTypes: [
      { name: "1 Bedroom", size: "55 sqm", price: "KES 8.5M", bedrooms: "1", bathrooms: 1 },
      { name: "2 Bedroom", size: "85 sqm", price: "KES 13.5M", bedrooms: "2", bathrooms: 2 },
      { name: "3 Bedroom", size: "120 sqm", price: "KES 19.5M", bedrooms: "3", bathrooms: 2 },
    ],
    amenities: [
      "Swimming Pool",
      "Fitness Centre",
      "Rooftop Garden",
      "Underground Parking",
      "24/7 Security",
      "Children's Play Area",
      "Concierge Service",
      "Landscaped Gardens",
    ],
    investmentHighlights: [
      "Projected rental yield of 7-9% annually",
      "Located in Nairobi's most sought-after neighbourhood",
      "Flexible payment plans available",
      "Title deed upon completion",
    ],
    completionStatus: "Under Construction",
    completionDate: "Q4 2026",
    coordinates: { lat: -1.2784, lng: 36.7763 },
    startingPrice: "KES 8.5M",
  },
  {
    slug: "palm-haven",
    title: "Palm Haven",
    tagline: "Coastal Luxury Redefined",
    location: "Malindi, Mombasa",
    description:
      "Beachfront villas designed for those who seek the tranquillity of the Kenyan coast. Palm Haven offers an exclusive retreat where the Indian Ocean is your backyard.",
    story:
      "Palm Haven was born from a vision of coastal luxury that honours the natural beauty of Malindi. Each villa is oriented to capture ocean breezes and golden sunsets. The architecture draws from Swahili heritage, blending traditional craftsmanship with contemporary comfort to create a home that feels both timeless and modern.",
    heroImage: "/images/projects/palm-haven-hero.jpg",
    gallery: [
      { url: "/images/projects/palm-haven-1.jpg", caption: "Beachfront View" },
      { url: "/images/projects/palm-haven-2.jpg", caption: "Private Pool" },
      { url: "/images/projects/palm-haven-3.jpg", caption: "Patio" },
      { url: "/images/projects/palm-haven-4.jpg", caption: "Interior Layout" },
    ],
    unitTypes: [
      { name: "2 Bedroom Villa", size: "150 sqm", price: "KES 22M", bedrooms: "2", bathrooms: 2 },
      { name: "3 Bedroom Villa", size: "200 sqm", price: "KES 32M", bedrooms: "3", bathrooms: 3 },
      { name: "4 Bedroom Villa", size: "280 sqm", price: "KES 45M", bedrooms: "4", bathrooms: 4 },
    ],
    amenities: [
      "Private Beach Access",
      "Infinity Pool",
      "Spa & Wellness Centre",
      "Beach Club",
      "Water Sports",
      "Restaurant",
      "Gated Community",
      "Tropical Gardens",
    ],
    investmentHighlights: [
      "Prime beachfront location in Malindi",
      "Strong short-term rental potential via Airbnb",
      "Holiday home with capital appreciation",
      "Managed rental programme available",
    ],
    completionStatus: "Off-Plan",
    completionDate: "Q2 2027",
    coordinates: { lat: -3.2138, lng: 40.1169 },
    startingPrice: "KES 22M",
  },
  {
    slug: "azure-crest",
    title: "Azure Crest",
    tagline: "Elevated Urban Living",
    location: "Kilimani, Nairobi",
    description:
      "A landmark residential tower rising above Kilimani's leafy canopy. Azure Crest offers panoramic city views, world-class amenities, and an address that speaks for itself.",
    story:
      "Azure Crest reimagines what urban living can be. Positioned at the heart of Kilimani, this tower offers residents uninterrupted views of the Nairobi skyline and the Ngong Hills beyond. The interiors are designed by award-winning architects who believe that luxury is found in the details — natural stone, warm timber, and light that moves through every space.",
    heroImage: "/images/projects/azure-crest-hero.jpg",
    gallery: [
      { url: "/images/projects/azure-crest-1.jpg", caption: "Balcony Outlook" },
      { url: "/images/projects/azure-crest-2.jpg", caption: "Penthouse Level" },
      { url: "/images/projects/azure-crest-3.jpg", caption: "Sunset Perspective" },
      { url: "/images/projects/azure-crest-4.jpg", caption: "Rooftop Pool" },
    ],
    unitTypes: [
      { name: "Studio", size: "40 sqm", price: "KES 6.5M", bedrooms: "1", bathrooms: 1 },
      { name: "1 Bedroom", size: "60 sqm", price: "KES 10M", bedrooms: "1", bathrooms: 1 },
      { name: "2 Bedroom", size: "95 sqm", price: "KES 16M", bedrooms: "2", bathrooms: 2 },
      { name: "3 Bedroom Penthouse", size: "180 sqm", price: "KES 35M", bedrooms: "3", bathrooms: 3 },
    ],
    amenities: [
      "Sky Lounge",
      "Infinity Pool",
      "Modern Gym",
      "Co-working Space",
      "Underground Parking",
      "24/7 Security & CCTV",
      "Landscaped Podium",
      "EV Charging Stations",
    ],
    investmentHighlights: [
      "Premium Kilimani address",
      "High rental demand from expatriates",
      "Projected 8-10% rental yield",
      "Completion guarantee from established developer",
    ],
    completionStatus: "Under Construction",
    completionDate: "Q1 2027",
    coordinates: { lat: -1.2921, lng: 36.7851 },
    startingPrice: "KES 6.5M",
  },
];
