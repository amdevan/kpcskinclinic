export type PageField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
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

// 11 pages — each with grouped fields keyed by section name.
// The 'page' value is the route slug, the group 'id' is the PageContent.section.
// The field 'key' is the column on PageContent (title | body | image).
// Sub-sections can store structured data in `body` as JSON — for the admin UI
// we just expose title/body/image per section; richer editing happens in the
// dedicated per-entity admin pages (doctors, services, packages, etc).
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
        ],
      },
      {
        id: "popular-services",
        label: "Popular services strip",
        fields: [
          { key: "title", label: "Section title", type: "text" },
          { key: "body", label: "Intro text", type: "textarea" },
        ],
      },
      {
        id: "about",
        label: "Welcome / About teaser",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
        ],
      },
      {
        id: "cta",
        label: "Call-to-action",
        fields: [
          { key: "title", label: "Headline", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
          { key: "image", label: "Background image", type: "image" },
        ],
      },
      {
        id: "success-stories",
        label: "Success stories",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
        ],
      },
      {
        id: "testimonials",
        label: "Testimonials",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
        ],
      },
      {
        id: "social",
        label: "Social posts strip",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Caption", type: "textarea" },
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
        ],
      },
      {
        id: "mission",
        label: "Mission",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
      },
      {
        id: "vision",
        label: "Vision",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
      },
      {
        id: "promise",
        label: "Promise / values",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body (JSON array allowed)", type: "textarea" },
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
        ],
      },
      {
        id: "form",
        label: "Form intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Intro", type: "textarea" },
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
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
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
        ],
      },
      {
        id: "sub_procedures",
        label: "Sub procedures (JSON)",
        fields: [
          { key: "body", label: "Sub procedures JSON", type: "textarea" },
        ],
      },
      {
        id: "steps",
        label: "Process steps (JSON)",
        fields: [
          { key: "body", label: "Steps JSON", type: "textarea" },
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
        ],
      },
      {
        id: "intro",
        label: "Intro",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
      },
    ],
  },
];
