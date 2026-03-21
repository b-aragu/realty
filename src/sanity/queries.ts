import { groq } from "next-sanity";

// GROQ queries for all Sanity content types

// ── Properties ──
export const allPropertiesQuery = groq`
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    title,
    location,
    area,
    price,
    priceNumber,
    bedrooms,
    bathrooms,
    sqm,
    propertyType,
    status,
    description,
    "image": mainImage.asset->url,
    "images": images[]{caption, "url": coalesce(image.asset->url, asset->url)},
    amenities,
    coordinates,
    nearbyLocations[] { name, time },
    "projectName": project->title,
    "projectSlug": project->slug.current,
    videoUrl
  }
`;

export const propertyByIdQuery = groq`
  *[_type == "property" && _id == $id][0] {
    _id,
    title,
    location,
    area,
    price,
    priceNumber,
    bedrooms,
    bathrooms,
    sqm,
    propertyType,
    status,
    description,
    "image": mainImage.asset->url,
    "images": images[]{caption, "url": coalesce(image.asset->url, asset->url)},
    amenities,
    coordinates,
    nearbyLocations[] { name, time },
    "projectName": project->title,
    "projectSlug": project->slug.current,
    videoUrl
  }
`;

export const allStaysQuery = groq`
  *[_type == "stay"] | order(priceNumber asc) {
    _id,
    title,
    subtitle,
    location,
    guests,
    pricePerNight,
    priceNumber,
    description,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[]{
      caption,
      "url": coalesce(image.asset->url, asset->url)
    },
    amenities,
    whatsappMessage
  }
`;

export const propertiesByLocationQuery = groq`
  *[_type == "property" && area == $area] | order(_createdAt desc) {
    _id,
    title,
    location,
    area,
    price,
    priceNumber,
    bedrooms,
    bathrooms,
    sqm,
    propertyType,
    status,
    description,
    "image": mainImage.asset->url,
    "images": images[]{caption, "url": coalesce(image.asset->url, asset->url)},
    amenities,
    coordinates,
    "projectName": project->title,
    "projectSlug": project->slug.current,
    videoUrl
  }
`;

// ── Projects ──
export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    "slug": slug.current,
    title,
    tagline,
    location,
    description,
    story,
    pullQuote,
    "heroImage": heroImage.asset->url,
    gallery[] {
      "url": asset->url,
      caption
    },
    unitTypes[] {
      name,
      subName,
      size,
      bedrooms,
      bathrooms,
      occupancy,
      price,
      "linkedPropertyId": linkedProperty->_id
    },
    amenities,
    investmentHighlights,
    completionStatus,
    completionDate,
    coordinates,
    nearbyLocations[] { name, time },
    startingPrice,
    totalUnits,
    floors,
    sqmRange,
    rentalYield,
    amenitiesSubtitle,
    investmentDescription,
    unitTypesNote,
    videoUrl
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    tagline,
    location,
    description,
    story,
    pullQuote,
    "heroImage": heroImage.asset->url,
    gallery[] {
      "url": asset->url,
      caption
    },
    unitTypes[] {
      name,
      subName,
      size,
      bedrooms,
      bathrooms,
      occupancy,
      price,
      "linkedPropertyId": linkedProperty->_id
    },
    amenities,
    investmentHighlights,
    completionStatus,
    completionDate,
    coordinates,
    nearbyLocations[] { name, time },
    startingPrice,
    totalUnits,
    floors,
    sqmRange,
    rentalYield,
    amenitiesSubtitle,
    investmentDescription,
    unitTypesNote,
    videoUrl
  }
`;

// ── Articles ──
export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "image": featuredImage.asset->url,
    category,
    "author": author->name,
    publishedAt,
    readTime
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "image": featuredImage.asset->url,
    category,
    "author": author->{name, role, "photo": photo.asset->url},
    publishedAt,
    readTime
  }
`;

// ── Agents ──
export const allAgentsQuery = groq`
  *[_type == "agent"] {
    _id,
    name,
    role,
    bio,
    "photo": photo.asset->url,
    email,
    phone,
    whatsapp
  }
`;

// ── Locations ──
export const allLocationsQuery = `
  *[_type == "location"] {
    _id,
    name,
    "slug": slug.current,
    description,
    "image": image.asset->url,
    region,
    coordinates
  }
`;
export const settingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    avgYield,
    homeHeroTitle,
    homeHeroTagline,
    residencesHeroTitle,
    residencesHeroTagline
  }
`;
