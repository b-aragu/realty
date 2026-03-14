import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient, isSanityConfigured } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!isSanityConfigured) return null;
  const client = getSanityClient();
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}
