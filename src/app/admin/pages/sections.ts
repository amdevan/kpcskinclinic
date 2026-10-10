export type PageField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "video";
  help?: string;
};

export type PageGroup = {
  id: string;
  label: string;
  fields: PageField[];
};

export type PageSection = {
  page: string;
  label: string;
  href: string;
  groups: PageGroup[];
};

// Shared field definitions for clarity.
const IMAGE_FIELD: PageField = {
  key: "image",
  label: "Section image",
  type: "image",
  help: "Upload or paste an image URL — used as the section visual or background.",
};

const VIDEO_FIELD: PageField = {
  key: "video",
  label: "Video URL (YouTube/Instagram/TikTok/Vimeo/.mp4)",
  type: "video",
  help: "Paste a video link — it will be embedded on the public page.",
};

// 11 pages — each with grouped fields keyed by section name.
// The 'page' value is the route slug, the group 'id' is the PageContent.section.
// The field 'key' is the column on PageContent (title | body | image | video).
// Sub-sections can store structured data in `body` as JSON — for the admin UI
// we just expose title/body/image/video per section; richer editing happens in
// the dedicated per-entity admin pages (doctors, services, packages, etc).
export const PAGE_SECTIONS: PageSection[] = [
  {
    page: "home",
    label: "Home",
    href: "/",
    groups: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "highlight", label: "Highlight (accent text)", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
          VIDEO_FIELD,
        ],
      },
      {
        id: "popular-services",
        label: "Popular services strip",
        fields: [
          { key: "title", label: "Section title", type: "text" },
          { key: "body", label: "Intro text", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "about",
        label: "Welcome / About teaser",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
          {
            ...VIDEO_FIELD,
            help: "Optional clinic tour or introduction video — embedded next to the about teaser.",
          },
        ],
      },
      {
        id: "cta",
        label: "Call-to-action",
        fields: [
          { key: "title", label: "Headline", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
          {
            ...VIDEO_FIELD,
            help: "Optional background or explainer video — overlaid above the CTA when set.",
          },
        ],
      },
      {
        id: "success-stories",
        label: "Success stories",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Featured patient story video — embedded at the top of the section.",
          },
        ],
      },
      {
        id: "testimonials",
        label: "Testimonials",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Video testimonial — embedded above the testimonials grid.",
          },
        ],
      },
      {
        id: "social",
        label: "Social posts strip",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Caption", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Featured reel — embedded in the social strip.",
          },
        ],
      },
      {
        id: "media-gallery",
        label: "Media gallery (before/after showcase)",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Optional showcase video — embedded at the top of the gallery.",
          },
        ],
      },
    ],
  },
  {
    page: "about",
    label: "About",
    href: "/about",
    groups: [
      {
        id: "banner",
        label: "Page banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "story",
        label: "Our story",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
          {
            ...VIDEO_FIELD,
            help: "Founder's story or clinic walkthrough video — embedded alongside the story.",
          },
        ],
      },
      {
        id: "mission",
        label: "Mission",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "vision",
        label: "Vision",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "promise",
        label: "Promise / values",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body (JSON array allowed)", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "team-video",
        label: "Team / clinic video",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Caption / description", type: "textarea" },
          IMAGE_FIELD,
          VIDEO_FIELD,
        ],
      },
    ],
  },
  {
    page: "contact",
    label: "Contact",
    href: "/contact",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "form",
        label: "Form intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "map",
        label: "Map / location",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Address or caption", type: "textarea" },
          { key: "image", label: "Map screenshot fallback", type: "image" },
        ],
      },
      {
        id: "video-tour",
        label: "Clinic video tour",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Caption / description", type: "textarea" },
          IMAGE_FIELD,
          VIDEO_FIELD,
        ],
      },
    ],
  },
  {
    page: "packages",
    label: "Packages",
    href: "/packages",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
    ],
  },
  {
    page: "doctors",
    label: "Doctors",
    href: "/doctors",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
    ],
  },
  {
    page: "hair-transplant",
    label: "Hair transplant",
    href: "/hair-transplant",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
          {
            ...VIDEO_FIELD,
            help: "Featured hair transplant procedure video — shown at the top of the page.",
          },
        ],
      },
      {
        id: "sub_procedures",
        label: "Sub procedures (JSON)",
        fields: [
          { key: "body", label: "Sub procedures JSON", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
      {
        id: "steps",
        label: "Process steps (JSON)",
        fields: [
          { key: "body", label: "Steps JSON", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Step-by-step procedure video — embedded alongside the process timeline.",
          },
        ],
      },
    ],
  },
  {
    page: "success-stories",
    label: "Success stories",
    href: "/success-stories",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Featured success-story video — embedded above the gallery.",
          },
        ],
      },
    ],
  },
  {
    page: "std-sti",
    label: "STD / STI",
    href: "/std-sti",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
        ],
      },
    ],
  },
  {
    page: "blog",
    label: "Blog",
    href: "/blog",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
    ],
  },
  {
    page: "services",
    label: "Services",
    href: "/services",
    groups: [
      {
        id: "banner",
        label: "Banner",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Subtitle", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          IMAGE_FIELD,
          {
            ...VIDEO_FIELD,
            help: "Featured service intro video — embedded above the services list.",
          },
        ],
      },
    ],
  },
];
