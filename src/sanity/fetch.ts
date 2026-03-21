import { getSanityClient, isSanityConfigured } from "./client";
import {
  allPropertiesQuery,
  propertyByIdQuery,
  propertiesByLocationQuery,
  allProjectsQuery,
  projectBySlugQuery,
  allArticlesQuery,
  articleBySlugQuery,
  allAgentsQuery,
  allLocationsQuery,
  allStaysQuery,
  settingsQuery,
} from "./queries";
import { properties as staticProperties, type Property } from "@/data/properties";
import { projects as staticProjects, type Project } from "@/data/projects";
import { articles as staticArticles, type Article } from "@/data/articles";
import { stays as staticStays } from "@/data/stays";

// ── Properties ──

export async function getProperties(): Promise<Property[]> {
  if (!isSanityConfigured) return staticProperties;
  try {
    const client = getSanityClient();
    if (!client) return staticProperties;
    const data = await client.fetch(allPropertiesQuery, {}, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) return staticProperties;
    return data.map(mapSanityProperty);
  } catch {
    return staticProperties;
  }
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  if (!isSanityConfigured) return staticProperties.find((p) => p.id === id);
  try {
    const client = getSanityClient();
    if (!client) return staticProperties.find((p) => p.id === id);
    const data = await client.fetch(propertyByIdQuery, { id }, { next: { revalidate: 3600 } });
    if (!data) return staticProperties.find((p) => p.id === id);
    return mapSanityProperty(data);
  } catch {
    return staticProperties.find((p) => p.id === id);
  }
}

export async function getPropertiesByArea(area: string): Promise<Property[]> {
  if (!isSanityConfigured) return staticProperties.filter((p) => p.area === area);
  try {
    const client = getSanityClient();
    if (!client) return staticProperties.filter((p) => p.area === area);
    const data = await client.fetch(propertiesByLocationQuery, { area }, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) return staticProperties.filter((p) => p.area === area);
    return data.map(mapSanityProperty);
  } catch {
    return staticProperties.filter((p) => p.area === area);
  }
}

// ── Projects ──

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return staticProjects;
  try {
    const client = getSanityClient();
    if (!client) return staticProjects;
    const data = await client.fetch(allProjectsQuery, {}, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) return staticProjects;
    return data.map(mapSanityProject);
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSanityConfigured) return staticProjects.find((p) => p.slug === slug);
  try {
    const client = getSanityClient();
    if (!client) return staticProjects.find((p) => p.slug === slug);
    const data = await client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 3600 } });
    if (!data) return staticProjects.find((p) => p.slug === slug);
    return mapSanityProject(data);
  } catch {
    return staticProjects.find((p) => p.slug === slug);
  }
}

// ── Articles ──

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured) return staticArticles;
  try {
    const client = getSanityClient();
    if (!client) return staticArticles;
    const data = await client.fetch(allArticlesQuery, {}, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) return staticArticles;
    return data.map(mapSanityArticle);
  } catch {
    return staticArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (!isSanityConfigured) return staticArticles.find((a) => a.slug === slug);
  try {
    const client = getSanityClient();
    if (!client) return staticArticles.find((a) => a.slug === slug);
    const data = await client.fetch(articleBySlugQuery, { slug }, { next: { revalidate: 3600 } });
    if (!data) return staticArticles.find((a) => a.slug === slug);
    return mapSanityArticle(data);
  } catch {
    return staticArticles.find((a) => a.slug === slug);
  }
}

// ── Agents ──

export interface Agent {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

export async function getAgents(): Promise<Agent[]> {
  if (!isSanityConfigured) return [];
  try {
    const client = getSanityClient();
    if (!client) return [];
    const data = await client.fetch(allAgentsQuery, {}, { next: { revalidate: 3600 } });
    return (data || []).map(mapSanityAgent);
  } catch {
    return [];
  }
}

// ── Locations ──

export async function getLocations() {
  if (!isSanityConfigured) return [];
  try {
    const client = getSanityClient();
    if (!client) return [];
    return await client.fetch(allLocationsQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    return [];
  }
}

// ── Settings ──

export interface SiteSettings {
  title?: string;
  description?: string;
  avgYield?: string;
  homeHeroTitle?: string;
  homeHeroTagline?: string;
  residencesHeroTitle?: string;
  residencesHeroTagline?: string;
}

export async function getSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured) return null;
  try {
    const client = getSanityClient();
    if (!client) return null;
    return await client.fetch(settingsQuery, {}, { next: { revalidate: 3600 } });
  } catch {
    return null;
  }
}

// ── Stays (Airbnbs) ──

export interface Stay {
  _id: string;
  title: string;
  subtitle?: string;
  location?: string;
  guests?: number;
  pricePerNight?: string;
  description?: string;
  mainImage?: string;
  gallery?: { url: string; caption?: string }[];
  amenities?: string[];
  whatsappMessage?: string;
}

export async function getStays(): Promise<Stay[]> {
  if (!isSanityConfigured) return staticStays; 
  try {
    const client = getSanityClient();
    if (!client) return staticStays;
    const data = await client.fetch(allStaysQuery, {}, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) return staticStays;
    return data.map(mapSanityStay);
  } catch {
    return staticStays;
  }
}

// ── Mappers ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityProperty(p: any): Property {
  return {
    id: p._id,
    title: p.title,
    location: p.location,
    area: p.area,
    price: p.price,
    priceNumber: p.priceNumber,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    sqm: p.sqm,
    propertyType: p.propertyType,
    status: p.status,
    description: p.description,
    image: p.image || "/images/properties/lavington-2br.jpg",
    images: p.images || [],
    amenities: p.amenities || [],
    coordinates: p.coordinates
      ? { lat: p.coordinates.lat, lng: p.coordinates.lng }
      : { lat: -1.29, lng: 36.82 },
    projectName: p.projectName || undefined,
    projectSlug: p.projectSlug || undefined,
    videoUrl: p.videoUrl || undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityArticle(a: any): Article {
  return {
    slug: typeof a.slug === "string" ? a.slug : a.slug?.current || "",
    title: a.title,
    excerpt: a.excerpt || "",
    content: a.content || "",
    image: a.image || "/images/journal/nairobi-skyline.jpg",
    category: a.category || "Guide",
    author: typeof a.author === "string" ? a.author : a.author?.name || "Wande Team",
    date: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "1 January 2026",
    readTime: a.readTime || "5 min read",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityStay(s: any): Stay {
  return {
    _id: s._id,
    title: s.title || "Wande Retreat",
    subtitle: s.subtitle || "Premium Stay",
    location: s.location || "Nairobi",
    guests: s.guests || 2,
    pricePerNight: s.pricePerNight || "Contact for Pricing",
    description: s.description || "A curated short-term rental experience.",
    mainImage: s.mainImage || "/images/stays/studio-quiet.png",
    gallery: s.gallery || [],
    amenities: s.amenities || ["WiFi", "Smart TV", "Workspace", "Security"],
    whatsappMessage: s.whatsappMessage || `Hi, I'm interested in booking ${s.title}.`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityAgent(a: any): Agent {
  return {
    _id: a._id,
    name: a.name || "Wande Agent",
    role: a.role || "Property Consultant",
    bio: a.bio || "",
    photo: a.photo || "/images/team/placeholder.jpg",
    email: a.email,
    phone: a.phone,
    whatsapp: a.whatsapp,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityProject(p: any): Project {
  return {
    slug: typeof p.slug === "string" ? p.slug : p.slug?.current || "",
    title: p.title,
    tagline: p.tagline || "",
    location: p.location || "",
    description: p.description || "",
    story: p.story || "",
    pullQuote: p.pullQuote || undefined,
    heroImage: p.heroImage || "/images/projects/blossom-ivy-hero.jpg",
    gallery: p.gallery || [],
    unitTypes: (p.unitTypes || []).map((u: any) => ({
      name: u.name,
      subName: u.subName,
      size: u.size,
      price: u.price,
      bedrooms: u.bedrooms,
      bathrooms: u.bathrooms,
      occupancy: u.occupancy,
      linkedPropertySlug: u.linkedPropertySlug || undefined,
    })),
    amenities: p.amenities || [],
    investmentHighlights: p.investmentHighlights || [],
    completionStatus: p.completionStatus || "Upcoming",
    completionDate: p.completionDate || "2026",
    coordinates: p.coordinates
      ? { lat: p.coordinates.lat, lng: p.coordinates.lng }
      : { lat: -1.29, lng: 36.82 },
    startingPrice: p.startingPrice || "Contact for Pricing",
    totalUnits: p.totalUnits,
    floors: p.floors,
    sqmRange: p.sqmRange,
    rentalYield: p.rentalYield,
    amenitiesSubtitle: p.amenitiesSubtitle,
    investmentDescription: p.investmentDescription,
    unitTypesNote: p.unitTypesNote,
    videoUrl: p.videoUrl || undefined,
  };
}
