"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, Link as LinkIcon, ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const uploadFile = useCallback(async (file: File) => {
    setError(null);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError("Unsupported file type. Use JPG, PNG, WEBP, GIF or SVG.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Upload failed");
      }
      onChange(data.url);
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) void uploadFile(file);
    },
    [uploadFile],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void uploadFile(file);
    // Reset so picking the same file again triggers change
    if (inputRef.current) inputRef.current.value = "";
  };

  function handleUrlConfirm() {
    const v = urlDraft.trim() || value.trim();
    onChange(v);
    setShowUrlInput(false);
    setUrlDraft("");
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}

      {value && (
        <div className="relative inline-flex w-full overflow-hidden rounded-lg border bg-card">
          <div className="relative aspect-[16/9] w-full bg-muted">
            {/* Use plain img to avoid next/image domain config issues */}
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute right-2 top-2 z-10 inline-flex size-7 items-center justify-center rounded-md bg-ink/70 text-cream backdrop-blur hover:bg-ink"
          >
            <X className="size-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 z-10 max-w-[80%] truncate rounded-md bg-ink/70 px-2 py-1 text-[10px] font-mono text-cream backdrop-blur">
            {value}
          </div>
        </div>
      )}

      {!value && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-brand bg-brand/5"
              : "border-border bg-muted/30 hover:bg-muted/60",
          )}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              <p className="text-xs text-muted-foreground">Uploading…</p>
            </>
          ) : (
            <>
              <Upload className="size-5 text-muted-foreground" />
              <p className="text-xs font-medium text-foreground">
                Drag &amp; drop, or click to browse
              </p>
              <p className="text-[10px] text-muted-foreground">
                JPG, PNG, WEBP, GIF, SVG — max 10 MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="sr-only"
        onChange={handleFilePick}
      />

      {/* URL fallback */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => {
            setUrlDraft(value);
            setShowUrlInput((s) => !s);
          }}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {showUrlInput ? (
            <>
              <ImageIcon className="size-3.5" /> Hide URL input
            </>
          ) : (
            <>
              <LinkIcon className="size-3.5" /> Use image URL instead
            </>
          )}
        </button>

        {showUrlInput && (
          <div className="flex items-center gap-2">
            <Input
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-9 text-xs"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleUrlConfirm}
            >
              Set
            </Button>
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-rust">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
