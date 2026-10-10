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
  {
    id: "header",
    label: "Header",
    description:
      "Top utility bar and main navigation settings shown across every public page.",
    fields: [
      {
        key: "header_topbar_visible",
        label: "Top utility bar visible",
        type: "text",
        help: "Set to 'true' to show the top utility bar (phone, location, hours). Blank or 'false' hides it.",
        placeholder: "true",
      },
      {
        key: "header_topbar_message",
        label: "Top bar custom message",
        type: "text",
        help: "Optional. If set, replaces the phone/location/hours strip with a single centered message.",
        placeholder: "Free consultation this week — book now!",
      },
      {
        key: "header_show_phone",
        label: "Show phone in top bar",
        type: "text",
        placeholder: "true",
      },
      {
        key: "header_show_address",
        label: "Show address in top bar",
        type: "text",
        placeholder: "true",
      },
      {
        key: "header_show_hours",
        label: "Show opening hours in top bar",
        type: "text",
        placeholder: "true",
      },
      {
        key: "header_hours_text",
        label: "Opening hours text",
        type: "text",
        placeholder: "Sun–Fri · 8 AM – 6 PM",
      },
      {
        key: "header_show_socials",
        label: "Show social links in top bar",
        type: "text",
        placeholder: "true",
      },
      {
        key: "header_book_button_label",
        label: "Book appointment button label",
        type: "text",
        placeholder: "Book appointment",
      },
      {
        key: "header_book_button_visible",
        label: "Show book appointment button",
        type: "text",
        placeholder: "true",
      },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    description:
      "Newsletter, brand blurb, directory links and copyright bar shown in the site footer.",
    fields: [
      {
        key: "footer_newsletter_visible",
        label: "Show newsletter strip",
        type: "text",
        placeholder: "true",
      },
      {
        key: "footer_newsletter_title",
        label: "Newsletter title",
        type: "text",
        placeholder: "Subscribe to our newsletter",
      },
      {
        key: "footer_newsletter_desc",
        label: "Newsletter description",
        type: "textarea",
        placeholder:
          "Subscribe to our newsletter for the latest tips, offers, and updates straight to your inbox.",
      },
      {
        key: "footer_brand_blurb",
        label: "Brand blurb",
        type: "textarea",
        placeholder:
          "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — Nepal's leading skin & hair clinic.",
      },
      {
        key: "footer_show_socials",
        label: "Show social icons",
        type: "text",
        placeholder: "true",
      },
      {
        key: "footer_show_directory",
        label: "Show directory column",
        type: "text",
        placeholder: "true",
      },
      {
        key: "footer_copyright_text",
        label: "Copyright text",
        type: "text",
        placeholder:
          "© {year} KPC Skin Hair & Aesthetic Clinic. All rights reserved.",
        help: "Use {year} to insert the current year dynamically.",
      },
      {
        key: "footer_developer_credit_name",
        label: "Developer credit name",
        type: "text",
        placeholder: "IT Relevant",
      },
      {
        key: "footer_developer_credit_url",
        label: "Developer credit URL",
        type: "text",
        placeholder: "https://itrelevant.com",
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
  // Header group
  header_topbar_visible: "true",
  header_topbar_message: "",
  header_show_phone: "true",
  header_show_address: "true",
  header_show_hours: "true",
  header_hours_text: "Sun–Fri · 8 AM – 6 PM",
  header_show_socials: "true",
  header_book_button_label: "Book appointment",
  header_book_button_visible: "true",
  // Footer group
  footer_newsletter_visible: "true",
  footer_newsletter_title: "Subscribe to our newsletter",
  footer_newsletter_desc:
    "Subscribe to our newsletter for the latest tips, offers, and updates straight to your inbox.",
  footer_brand_blurb:
    "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — Nepal's leading skin & hair clinic. 5 years of trusted care, advanced technology, and personalized treatment plans.",
  footer_show_socials: "true",
  footer_show_directory: "true",
  footer_copyright_text:
    "© {year} KPC Skin Hair & Aesthetic Clinic. All rights reserved.",
  footer_developer_credit_name: "IT Relevant",
  footer_developer_credit_url: "https://itrelevant.com",
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
