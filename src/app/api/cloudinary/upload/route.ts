import { NextRequest, NextResponse } from "next/server";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * Generate SHA-1 hex signature using Web Crypto API (Edge-compatible).
 */
async function generateSignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  // Sort parameters alphabetically and join with &
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const stringToSign = sortedParams + apiSecret;

  // Use Web Crypto API (works on Edge, Cloudflare Workers, all browsers)
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error: "Cloudinary configuration is missing.",
          debug: { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret },
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "wanderealty/general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max 5MB, got ${(file.size / 1024 / 1024).toFixed(1)}MB` },
        { status: 400 }
      );
    }

    // Build signed upload parameters
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const paramsToSign: Record<string, string> = {
      folder,
      timestamp,
    };

    const signature = await generateSignature(paramsToSign, apiSecret);

    // Build multipart form for Cloudinary REST API
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("folder", folder);
    uploadForm.append("timestamp", timestamp);
    uploadForm.append("api_key", apiKey);
    uploadForm.append("signature", signature);

    // Call Cloudinary Upload API directly via fetch
    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadForm }
    );

    if (!cloudinaryRes.ok) {
      const errBody = await cloudinaryRes.text();
      console.error("Cloudinary API error:", cloudinaryRes.status, errBody);
      return NextResponse.json(
        { error: "Cloudinary rejected the upload.", details: errBody },
        { status: 502 }
      );
    }

    const result = await cloudinaryRes.json();

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("Upload exception:", error);
    return NextResponse.json(
      {
        error: "Upload failed.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
