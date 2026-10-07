export type SiteInfoField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
  placeholder?: string;
  help?: string;
};

export type SiteInfoGroup = {
  id: string;
  label: string;
  description?: string;
  fields: SiteInfoField[];
};

// IMPORTANT: keep these keys in sync with src/lib/site-data.ts and the public
// pages that read from SiteSetting (layout.tsx, contact, header, footer…).
export const SITE_INFO_GROUPS: SiteInfoGroup[] = [
  {
    id: "general",
    label: "Clinic identity",
    description: "Brand-level info shown across the site header, footer and meta.",
    fields: [
      {
        key: "clinic_name",
        label: "Clinic name",
        type: "text",
        placeholder: "KPC Skin Hair & Aesthetic Clinic",
      },
      {
        key: "clinic_tagline",
        label: "Clinic tagline",
        type: "text",
        placeholder: "Hair, Skin & Aesthetic Clinic in Kathmandu",
      },
      {
        key: "logo_url",
        label: "Logo image",
        type: "image",
        help: "Shown in the site header & footer (top-left).",
      },
      {
        key: "favicon_url",
        label: "Favicon",
        type: "image",
        help: "Shown in browser tabs. Recommended size 32x32 PNG or SVG.",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact info",
    description: "Phone, email and physical address shown on the contact page and footer.",
    fields: [
      {
        key: "phone",
        label: "Primary phone",
        type: "text",
        placeholder: "+977-9747223514",
      },
      {
        key: "mobile",
        label: "Mobile (alt)",
        type: "text",
        placeholder: "+977-9747223514",
      },
      {
        key: "whatsapp",
        label: "WhatsApp link",
        type: "text",
        placeholder: "https://wa.me/9779747223514",
      },
      {
        key: "email",
        label: "Public email",
        type: "text",
        placeholder: "info@kpcskin.com",
      },
      {
        key: "address",
        label: "Full address",
        type: "textarea",
        placeholder: "Prasuti Griha Marg, Thapathali, Kathmandu, Nepal 44600",
      },
      {
        key: "address_short",
        label: "Address (short)",
        type: "text",
        placeholder: "Thapathali, Kathmandu",
      },
      {
        key: "map_link",
        label: "Google Maps link",
        type: "text",
        placeholder: "https://maps.google.com/?q=…",
      },
    ],
  },
  {
    id: "social",
    label: "Social media",
    description: "Leave blank to hide a platform from the site footer.",
    fields: [
      {
        key: "social_instagram",
        label: "Instagram URL",
        type: "text",
        placeholder: "https://instagram.com/kpcskin",
      },
      {
        key: "social_facebook",
        label: "Facebook URL",
        type: "text",
        placeholder: "https://facebook.com/kpcskin",
      },
      {
        key: "social_tiktok",
        label: "TikTok URL",
        type: "text",
        placeholder: "https://tiktok.com/@kpcskin",
      },
      {
        key: "social_youtube",
        label: "YouTube URL",
        type: "text",
        placeholder: "",
      },
    ],
  },
];

// SMTP-related keys are stored separately so they can be filtered / masked
// when displayed in the UI if needed.
export const EMAIL_SETTING_KEYS = [
  "smtp_host",
  "smtp_port",
  "smtp_user",
  "smtp_pass",
  "email_from",
  "email_to",
];

export const EMAIL_SETTING_FIELDS: SiteInfoField[] = [
  {
    key: "smtp_host",
    label: "SMTP host",
    type: "text",
    placeholder: "smtp.gmail.com",
  },
  {
    key: "smtp_port",
    label: "SMTP port",
    type: "text",
    placeholder: "465",
  },
  {
    key: "smtp_user",
    label: "SMTP username",
    type: "text",
    placeholder: "noreply@kpcskin.com",
  },
  {
    key: "smtp_pass",
    label: "SMTP password",
    type: "text",
    placeholder: "••••••••",
  },
  {
    key: "email_from",
    label: "From email",
    type: "text",
    placeholder: "KPC Skin <noreply@kpcskin.com>",
  },
  {
    key: "email_to",
    label: "Default recipient",
    type: "text",
    placeholder: "info@kpcskin.com",
  },
];

// Sensible defaults used when the SiteSetting table is empty on first load.
export const DEFAULT_SITE_INFO: Record<string, string> = {
  clinic_name: "KPC Skin, Hair & Aesthetic Clinic",
  clinic_tagline: "Hair, Skin & Aesthetic Clinic in Kathmandu",
  logo_url: "/kpc-logo.png",
  favicon_url: "/favicon.svg",
  phone: "+977-9747223514",
  mobile: "+977-9747223514",
  whatsapp: "https://wa.me/9779747223514",
  email: "info@kpcskin.com",
  address: "Prasuti Griha Marg, Thapathali, Kathmandu, Nepal 44600",
  address_short: "Thapathali, Kathmandu",
  map_link: "https://maps.google.com/?q=Prasuti+Griha+Marg+Thapathali+Kathmandu",
  social_instagram: "https://instagram.com/kpcskin",
  social_facebook: "https://facebook.com/kpcskin",
  social_tiktok: "https://tiktok.com/@kpcskin",
  social_youtube: "",
  smtp_host: "",
  smtp_port: "465",
  smtp_user: "",
  smtp_pass: "",
  email_from: "KPC Skin <noreply@kpcskin.com>",
  email_to: "info@kpcskin.com",
};

export const ALL_SITE_INFO_FIELDS: SiteInfoField[] = [
  ...SITE_INFO_GROUPS.flatMap((g) => g.fields),
  ...EMAIL_SETTING_FIELDS,
];

export const SITE_INFO_KEY_TO_GROUP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const g of SITE_INFO_GROUPS) {
    for (const f of g.fields) map[f.key] = g.id;
  }
  for (const f of EMAIL_SETTING_FIELDS) map[f.key] = "email";
  return map;
})();
