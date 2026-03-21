"use client";

import { useCallback, useState } from "react";
import { set, unset, type ObjectInputProps } from "sanity";

/**
 * Custom Sanity Studio input that uploads images to Cloudinary
 * instead of Sanity's native asset pipeline.
 *
 * Expected schema shape:
 *   { type: "object", fields: [
 *     { name: "url", type: "url" },
 *     { name: "public_id", type: "string" },
 *     { name: "alt", type: "string" },
 *   ]}
 */
export default function CloudinaryUploader(props: ObjectInputProps) {
  const { onChange, value, schemaType } = props;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentValue = value as any;
  const imageUrl = currentValue?.url;

  // Determine folder from parent document type
  const folder = "wanderealty/general";

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();

        // Set both url and public_id fields on the parent object
        onChange([
          set(data.url, ["url"]),
          set(data.public_id, ["public_id"]),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, folder]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleRemove = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  const handleAltChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(e.target.value, ["alt"]));
    },
    [onChange]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <label
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#6e7683",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {schemaType.title || "Image"}
      </label>

      {imageUrl ? (
        /* Preview mode */
        <div style={{ position: "relative" }}>
          <img
            src={imageUrl}
            alt={currentValue?.alt || ""}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "4px",
              border: "1px solid #e3e6ea",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "8px",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={handleRemove}
              style={{
                padding: "6px 14px",
                fontSize: "12px",
                border: "1px solid #e3e6ea",
                borderRadius: "3px",
                background: "#fff",
                cursor: "pointer",
                color: "#d4380d",
              }}
            >
              Remove
            </button>
            <label
              style={{
                padding: "6px 14px",
                fontSize: "12px",
                border: "1px solid #e3e6ea",
                borderRadius: "3px",
                background: "#fff",
                cursor: "pointer",
                color: "#2e4480",
              }}
            >
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </label>
            {currentValue?.public_id && (
              <span
                style={{
                  fontSize: "10px",
                  color: "#999",
                  marginLeft: "auto",
                  fontFamily: "monospace",
                }}
              >
                {currentValue.public_id}
              </span>
            )}
          </div>
          {/* Alt text input */}
          <input
            type="text"
            value={currentValue?.alt || ""}
            onChange={handleAltChange}
            placeholder="Alt text (accessibility)"
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: "12px",
              border: "1px solid #e3e6ea",
              borderRadius: "3px",
              marginTop: "8px",
              outline: "none",
            }}
          />
        </div>
      ) : (
        /* Upload zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? "#2e4480" : "#dde1ee"}`,
            borderRadius: "6px",
            padding: "40px 20px",
            textAlign: "center",
            background: dragOver ? "#f0f4ff" : "#fafbfc",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "2px solid #2e4480",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <span style={{ fontSize: "13px", color: "#6e7683" }}>
                Uploading to Cloudinary...
              </span>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "13px", color: "#6e7683", margin: "0 0 8px 0" }}>
                Drag & drop an image here
              </p>
              <label
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  fontSize: "12px",
                  background: "#2e4480",
                  color: "white",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </label>
              <p style={{ fontSize: "11px", color: "#b0b5be", marginTop: "12px" }}>
                JPEG, PNG, WebP, AVIF · Max 5MB
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "8px 12px",
            background: "#fff2f0",
            border: "1px solid #ffccc7",
            borderRadius: "3px",
            fontSize: "12px",
            color: "#d4380d",
          }}
        >
          {error}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
