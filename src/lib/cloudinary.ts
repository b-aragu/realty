/**
 * Cloudinary image URL optimization utility.
 * Injects auto-quality and auto-format transforms for Cloudinary URLs.
 * Passes through Sanity CDN or other URLs unchanged (backward compat).
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dgiqg7t6h";

interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
  crop?: string;
}

export function optimizeImage(url: string, opts: OptimizeOptions = {}): string {
  if (!url) return "";

  // Only transform Cloudinary URLs
  if (!url.includes("res.cloudinary.com")) return url;

  const { width, height, quality = "auto", format = "auto", crop } = opts;

  // Build transformation string
  const transforms: string[] = [`q_${quality}`, `f_${format}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  const transformStr = transforms.join(",");

  // Insert transformations: .../upload/TRANSFORMS/... 
  return url.replace("/upload/", `/upload/${transformStr}/`);
}

/**
 * Generate a responsive srcSet for Cloudinary images
 */
export function generateSrcSet(url: string, widths: number[] = [400, 800, 1200, 1600]): string {
  if (!url.includes("res.cloudinary.com")) return "";

  return widths
    .map((w) => `${optimizeImage(url, { width: w })} ${w}w`)
    .join(", ");
}

/**
 * Determine the Cloudinary folder based on document type
 */
export function getCloudinaryFolder(docType: string): string {
  switch (docType) {
    case "property":
      return "wanderealty/residencies";
    case "project":
      return "wanderealty/developments";
    case "stay":
      return "wanderealty/stays";
    case "siteSettings":
      return "wanderealty/homepage";
    default:
      return "wanderealty/general";
  }
}
