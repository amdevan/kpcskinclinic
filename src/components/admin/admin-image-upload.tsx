"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  async function handleUpload(file: File) {
    // Guard against accidentally overwriting an existing image.
    if (value && !confirm("Replace the current image? The previous one will be lost.")) {
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setPreview(data.url);
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-32 w-32 rounded-lg border object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); onChange(""); }}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <span className="text-xs text-gray-400">No image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleUpload(f);
          e.target.value = "";
        }}
        className="hidden"
        id={`img-${label.replace(/\s+/g, "-")}`}
      />
      <label
        htmlFor={`img-${label.replace(/\s+/g, "-")}`}
        className="inline-block cursor-pointer"
      >
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => {}}>
          {uploading ? "Uploading…" : "Upload image"}
        </Button>
      </label>
    </div>
  );
}