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

// Additional body-alias fields read as `extra.*` on home sections.
const EYEBROW_FIELD: PageField = {
  key: "eyebrow",
  label: "Eyebrow (small heading above title)",
  type: "text",
};

// Additional body-alias fields read as `extra.*` on home sections.
const HIGHLIGHT_FIELD: PageField = {
  key: "highlight",
  label: "Highlighted title text (accent color)",
  type: "text",
};

// Card-section convention: the FIRST block of a card section is the section
// header (eyebrow / title / intro). Every block BELOW it is one card — its
// Title, Body and Image render as that card (e.g. a service card, a review
// avatar, a social post photo). Image fallback: when a card has no image,
// the home page uses the matching Treatment hero image (Admin → Treatments).
const CARD_HREF_FIELD: PageField = {
  key: "href",
  label: "Card service slug (optional)",
  type: "text",
  help: "Treatment slug (e.g. botox-treatment). Blank = link to this card's title slug.",
};

const PATIENT_FIELD: PageField = {
  key: "patient",
  label: "Patient name (optional)",
  type: "text",
};

const SESSIONS_FIELD: PageField = {
  key: "sessions",
  label: "Sessions info (optional)",
  type: "text",
  help: "e.g. 4 sessions over 3 months",
};

const HANDLE_FIELD: PageField = {
  key: "handle",
  label: "Handle (optional)",
  type: "text",
  help: "e.g. @kpcskin",
};

const SERVICE_FIELD: PageField = {
  key: "service",
  label: "Treatment badge (optional)",
  type: "text",
};

const DATE_FIELD: PageField = {
  key: "date",
  label: "Review date (optional)",
  type: "text",
};

const RATING_FIELD: PageField = {
  key: "rating",
  label: "Star rating 1–5 (optional)",
  type: "text",
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
          {
            ...VIDEO_FIELD,
            help: "Optional video embedded below the hero carousel. Hero text and images are managed under Admin → Hero slides.",
          },
        ],
      },
      {
        id: "popular-services",
        label: "Popular services strip",
        fields: [
          EYEBROW_FIELD,
          { key: "title", label: "Section title", type: "text", help: "First block = heading (title/intro). Add blocks below it — each one renders as a card with its own title, body and image." },
          HIGHLIGHT_FIELD,
          { key: "body", label: "Intro text", type: "textarea" },
          IMAGE_FIELD,
          CARD_HREF_FIELD,
        ],
      },
      {
        id: "about",
        label: "Welcome / About teaser",
        fields: [
          EYEBROW_FIELD,
          { key: "title", label: "Title", type: "text" },
          HIGHLIGHT_FIELD,
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
          HIGHLIGHT_FIELD,
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
          { key: "primaryCta", label: "Primary button label", type: "text", help: "Opens the booking form." },
          { key: "secondaryCta", label: "Secondary button label", type: "text", help: "Links to the contact page." },
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
          EYEBROW_FIELD,
          { key: "title", label: "Title", type: "text", help: "First block = heading. Blocks below render as cards (title = label, patient name optional, image = card photo)." },
          HIGHLIGHT_FIELD,
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          PATIENT_FIELD,
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
          EYEBROW_FIELD,
          { key: "title", label: "Title", type: "text", help: "First block = heading. Blocks below are reviews (title = name, body = review, image = avatar)." },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          SERVICE_FIELD,
          DATE_FIELD,
          RATING_FIELD,
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
          EYEBROW_FIELD,
          { key: "title", label: "Title", type: "text", help: "First block = heading. Blocks below are posts (title ignored, body = caption, image = post photo)." },
          HIGHLIGHT_FIELD,
          { key: "body", label: "Caption", type: "textarea" },
          IMAGE_FIELD,
          HANDLE_FIELD,
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
          EYEBROW_FIELD,
          { key: "title", label: "Title", type: "text", help: "First block = heading. Blocks below are gallery cards (title = treatment, image = result photo)." },
          { key: "body", label: "Intro", type: "textarea" },
          IMAGE_FIELD,
          PATIENT_FIELD,
          SESSIONS_FIELD,
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
          {
            key: "body",
            label: "Sub procedures JSON",
            type: "textarea",
            help: "JSON array of {slug, title, desc, image, price}. Each card's image is edited here — there is no separate section image for this group.",
          },
        ],
      },
      {
        id: "steps",
        label: "Process steps (JSON)",
        fields: [
          {
            key: "body",
            label: "Steps JSON",
            type: "textarea",
            help: "JSON array of {step, title, body}.",
          },
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
