"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { set, unset, setIfMissing, type ObjectInputProps } from "sanity";

/**
 * Custom Sanity Studio input that uploads images to Cloudinary
 * instead of Sanity's native asset pipeline.
 */
export default function CloudinaryUploader(props: ObjectInputProps) {
  const { onChange, value, schemaType, readOnly } = props;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const isUploadingRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentValue = value as any;
  const imageUrl = currentValue?.url;

  // Local state for text inputs
  const [localAlt, setLocalAlt] = useState(currentValue?.alt || "");
  const [localCaption, setLocalCaption] = useState(currentValue?.caption || "");

  // Sync local state when the prop changes (e.g. from another client or after a successful patch)
  useEffect(() => {
    setLocalAlt(currentValue?.alt || "");
  }, [currentValue?.alt]);

  useEffect(() => {
    setLocalCaption(currentValue?.caption || "");
  }, [currentValue?.caption]);

  // Handle Alt Text sync on blur (prevents concurrent transaction bugs from timers)
  const handleAltBlur = useCallback(() => {
    const fallbackAlt = currentValue?.alt || "";
    if (localAlt === fallbackAlt) return;
    
    if (currentValue?.alt === undefined && localAlt === "") return;

    if (localAlt) {
      onChange([setIfMissing({ _type: schemaType.name }), set(localAlt, ["alt"])]);
    } else {
      onChange([setIfMissing({ _type: schemaType.name }), unset(["alt"])]);
    }
  }, [localAlt, currentValue?.alt, schemaType.name, onChange]);

  // Handle Caption sync on blur
  const handleCaptionBlur = useCallback(() => {
    const fallbackCaption = currentValue?.caption || "";
    if (localCaption === fallbackCaption) return;

    if (currentValue?.caption === undefined && localCaption === "") return;

    if (localCaption) {
      onChange([setIfMissing({ _type: schemaType.name }), set(localCaption, ["caption"])]);
    } else {
      onChange([setIfMissing({ _type: schemaType.name }), unset(["caption"])]);
    }
  }, [localCaption, currentValue?.caption, schemaType.name, onChange]);

  // Optimize Cloudinary URL for Studio preview
  const getThumbnailUrl = (url: string) => {
    if (!url || !url.includes("res.cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/w_600,c_limit,f_auto,q_auto/");
  };

  const hasCaption = schemaType.fields?.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (f: any) => f.name === "caption"
  );

  const isDisabled = uploading || readOnly;
  const folder = "wanderealty/general";

  const uploadFile = useCallback(
    async (file: File) => {
      if (isDisabled || isUploadingRef.current) return;
      isUploadingRef.current = true;
      setUploading(true);
      setError(null);

      try {
        // [iOS / Mobile Fix] When users return from the native photo picker, the browser tab
        // is rapidly un-suspended. We must wait explicitly for the network stack and Sanity's 
        // WebSockets to finish waking up, otherwise the fetch will instantly drop with NetworkError.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          throw new Error("Device is offline. Please check your connection and try again.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        let res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });

        // Simple failover retry for flaky mobile connections
        if (!res.ok) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          res = await fetch("/api/cloudinary/upload", {
            method: "POST",
            body: formData,
          });
        }

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Network anomaly or server error" }));
          throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();

        // Sanity buffers these patches even if the WebSocket is still showing 'Trying to connect...'
        onChange([
          setIfMissing({ _type: schemaType.name }),
          set(data.url, ["url"]),
          set(data.public_id, ["public_id"]),
          set(localAlt || "", ["alt"]), 
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        isUploadingRef.current = false;
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [onChange, folder, isDisabled, localAlt, schemaType.name]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (isDisabled) return;
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile, isDisabled]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile, isDisabled]
  );

  const handleRemove = useCallback(() => {
    if (isDisabled) return;
    onChange(unset());
  }, [onChange, isDisabled]);

  const handleAltChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLocalAlt(e.target.value), []);
  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLocalCaption(e.target.value), []);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "10px", 
      width: "100%", 
      boxSizing: "border-box",
      pointerEvents: uploading ? "none" : "auto"
    }}>
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
        <div style={{ position: "relative", width: "100%", boxSizing: "border-box" }}>
          <img
            src={getThumbnailUrl(imageUrl)}
            alt={currentValue?.alt || ""}
            style={{
              width: "100%",
              maxHeight: "240px",
              objectFit: "cover",
              borderRadius: "4px",
              border: "1px solid #e3e6ea",
              background: "#fafbfc",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={handleRemove}
              disabled={isDisabled}
              style={{
                padding: "6px 14px",
                fontSize: "12px",
                border: "1px solid #e3e6ea",
                borderRadius: "3px",
                background: "#fff",
                cursor: isDisabled ? "not-allowed" : "pointer",
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
                cursor: isDisabled ? "not-allowed" : "pointer",
                color: "#2e4480",
              }}
            >
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isDisabled}
                style={{ display: "none" }}
              />
            </label>
            {currentValue?.public_id && (
              <span
                style={{
                  fontSize: "9px",
                  color: "#999",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  maxWidth: "100%",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {currentValue.public_id}
              </span>
            )}
          </div>
          {/* Alt text input */}
          <div style={{ marginTop: "10px" }}>
            <label style={{ fontSize: "10px", fontWeight: 600, color: "#8b91a8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "4px" }}>
              Alt Text
            </label>
            <input
              type="text"
              value={localAlt}
              onChange={handleAltChange}
              onBlur={handleAltBlur}
              disabled={isDisabled}
              placeholder="Describe this image for accessibility"
              style={{
                width: "100%",
                padding: "8px 10px",
                fontSize: "13px",
                color: "#1c2340",
                border: "1px solid #e3e6ea",
                borderRadius: "3px",
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
                cursor: isDisabled ? "not-allowed" : "text",
              }}
            />
          </div>
          {/* Caption input — only for gallery items */}
          {hasCaption && (
            <div style={{ marginTop: "8px" }}>
              <label style={{ fontSize: "10px", fontWeight: 600, color: "#c49a3c", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "4px" }}>
                ✦ Caption Overlay
              </label>
              <input
                type="text"
                value={localCaption}
                onChange={handleCaptionChange}
                onBlur={handleCaptionBlur}
                disabled={isDisabled}
                placeholder="e.g. Living Room, Kitchen"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1c2340",
                  border: "2px solid #c49a3c",
                  borderRadius: "4px",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fffdf7",
                  cursor: isDisabled ? "not-allowed" : "text",
                }}
              />
              <span style={{ fontSize: "10px", color: "#8b91a8", marginTop: "3px", display: "block" }}>
                This text overlays the image in the gallery.
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Upload zone */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!isDisabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? "#2e4480" : "#dde1ee"}`,
            borderRadius: "6px",
            padding: "28px 16px",
            textAlign: "center",
            background: dragOver ? "#f0f4ff" : "#fafbfc",
            cursor: isDisabled ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            width: "100%",
            boxSizing: "border-box",
            opacity: isDisabled ? 0.6 : 1,
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
              <p style={{ fontSize: "13px", color: "#6e7683", margin: "0 0 10px 0" }}>
                Drag & drop an image here
              </p>
              <label
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  fontSize: "13px",
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
                  disabled={isDisabled}
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
            wordBreak: "break-word",
          }}
        >
          {error}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
