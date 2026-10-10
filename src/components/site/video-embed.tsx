"use client";

import { useMemo } from "react";

/**
 * Converts a video URL to an embeddable URL (or null for raw video files).
 *
 * Supported:
 *   - youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 *   - vimeo.com/ID, player.vimeo.com/video/ID
 *   - instagram.com/p/ID, instagram.com/reel/ID
 *   - tiktok.com/@user/video/ID, tiktok.com/@user/video/ID?...
 *   - .mp4, .webm, .mov URLs (returned as-is for HTML5 <video>)
 *
 * Returns `null` if the URL doesn't match any known pattern — caller should
 * render a plain link instead.
 */
export type EmbedInfo =
  | { kind: "iframe"; url: string; aspect?: "16:9" | "9:16" | "square" }
  | { kind: "video"; url: string }
  | { kind: "link"; url: string };

export function toEmbedInfo(url: string): EmbedInfo | null {
  const u = (url || "").trim();
  if (!u) return null;

  // YouTube
  // watch?v=ID, youtu.be/ID, /embed/ID, /shorts/ID, /live/ID
  const yt =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/.exec(
      u,
    );
  if (yt) {
    const id = yt[1];
    const listMatch = /[?&]list=([A-Za-z0-9_-]+)/.exec(u);
    const qs = listMatch ? `?list=${listMatch[1]}` : "";
    return {
      kind: "iframe",
      url: `https://www.youtube.com/embed/${id}${qs}`,
      aspect: "16:9",
    };
  }

  // Vimeo
  const vm = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u);
  if (vm) {
    return {
      kind: "iframe",
      url: `https://player.vimeo.com/video/${vm[1]}`,
      aspect: "16:9",
    };
  }

  // Instagram — /p/ID/ or /reel/ID/
  const ig = /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/.exec(u);
  if (ig) {
    return {
      kind: "iframe",
      url: `https://www.instagram.com/p/${ig[1]}/embed`,
      aspect: "16:9",
    };
  }

  // TikTok — /@user/video/ID
  const tt = /tiktok\.com\/(?:@[^/]+\/video\/|v\/)(\d+)/.exec(u);
  if (tt) {
    return {
      kind: "iframe",
      url: `https://www.tiktok.com/embed/v2/${tt[1]}`,
      aspect: "9:16",
    };
  }

  // Facebook watch / videos — best-effort
  const fb = /facebook\.com\/(?:watch\/?\?v=|[^/]+\/videos\/)(\d+)/.exec(u);
  if (fb) {
    return {
      kind: "iframe",
      url: `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${fb[1]}&show_text=false`,
      aspect: "16:9",
    };
  }

  // Direct video files — HTML5 <video>
  if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(u)) {
    return { kind: "video", url: u };
  }

  // Fallback — show as a plain link
  return { kind: "link", url: u };
}

type VideoEmbedProps = {
  url: string;
  className?: string;
  /** Aspect for direct video files & iframe embeds that need a wrapper. */
  aspect?: "16:9" | "9:16" | "square";
};

/**
 * Renders a video embed (iframe / HTML5 video / link) from any URL.
 * Returns null when url is empty.
 *
 * Used on both public pages and the admin preview pane.
 */
export function VideoEmbed({ url, className, aspect: aspectOverride }: VideoEmbedProps) {
  const info = useMemo(() => toEmbedInfo(url), [url]);

  if (!info) return null;

  if (info.kind === "link") {
    return (
      <a
        href={info.url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-ink transition-colors link-underline " +
          (className || "")
        }
      >
        {info.url}
      </a>
    );
  }

  if (info.kind === "video") {
    return (
      <div className={"overflow-hidden rounded-2xl border border-border " + (className || "")}>
        <video
          src={info.url}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // iframe
  const aspect =
    aspectOverride || info.aspect || "16:9";
  const aspectClass =
    aspect === "9:16"
      ? "aspect-[9/16] max-w-[360px] mx-auto"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-video";
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-border bg-ink " +
        aspectClass +
        " " +
        (className || "")
      }
    >
      <iframe
        src={info.url}
        title="Embedded video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
