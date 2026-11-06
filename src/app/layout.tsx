import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-whatsapp";
import { SitePopup } from "@/components/site/site-popup";
import { db } from "@/lib/db";
import { getSeoMeta } from "@/lib/seo";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

const DEFAULT_TITLE = "KPC Skin Hair & Aesthetic Clinic | Nepal's Leading Skin & Hair Clinic";
const DEFAULT_DESCRIPTION =
  "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — Nepal's leading skin and hair clinic. Expert hair transplants, laser treatments, cosmetic surgery, acne & scar treatments, and personalized dermatology care.";
const DEFAULT_KEYWORDS = [
  "KPC Skin Hair & Aesthetic Clinic",
  "skin clinic Kathmandu",
  "hair transplant Nepal",
  "laser hair removal",
  "dermatologist Nepal",
  "acne treatment",
  "cosmetic surgery Nepal",
];

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta("/");
  const title = seo?.title || DEFAULT_TITLE;
  const description = seo?.description || DEFAULT_DESCRIPTION;
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : DEFAULT_KEYWORDS;
  return {
    title,
    description,
    keywords,
    authors: [{ name: "KPC Skin Hair & Aesthetic Clinic" }],
    alternates: { canonical: seo?.canonical || "/" },
    openGraph: {
      title,
      description,
      url: "https://www.kpcskinclinic.com",
      siteName: "KPC Skin Hair & Aesthetic Clinic",
      type: "website",
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type SiteSettings = {
  logoUrl?: string;
  faviconUrl?: string;
  clinicName?: string;
  clinicTagline?: string;
  settingsMap?: Record<string, string>;
};

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.siteSetting.findMany({
      where: { group: { in: ["general", "contact", "social", "header", "footer"] } },
    });
    if (!rows || rows.length === 0) return {};
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return {
      logoUrl: map.logo_url,
      faviconUrl: map.favicon_url,
      clinicName: map.clinic_name,
      clinicTagline: map.clinic_tagline,
      settingsMap: map,
    };
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const faviconUrl = settings.faviconUrl || "/favicon.svg";
  // Cache-bust the favicon so admin uploads take effect immediately.
  // Data URLs (uploaded via admin) are already unique, so don't append ?v=.
  const cacheBustedFavicon = faviconUrl.startsWith("data:")
    ? faviconUrl
    : faviconUrl.includes("?")
      ? faviconUrl
      : `${faviconUrl}?v=${Date.now()}`;

  // CMS admin pages are nested under /admin/* and have their own layout —
  // they must NOT render the public website Header/Footer/FloatingButtons/Popup.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={cacheBustedFavicon} />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground font-sans`}
      >
        {isAdminRoute ? (
          <>{children}</>
        ) : (
          <BookAppointmentProvider>
            <div className="flex min-h-screen flex-col bg-background">
              <Header
                logoUrl={settings.logoUrl}
                clinicName={settings.clinicName}
                clinicTagline={settings.clinicTagline}
                settings={settings.settingsMap}
              />
              <main className="flex-1">{children}</main>
              <Footer
                logoUrl={settings.logoUrl}
                clinicName={settings.clinicName}
                clinicTagline={settings.clinicTagline}
                settings={settings.settingsMap}
              />
            </div>
            <FloatingButtons />
            <SitePopup />
          </BookAppointmentProvider>
        )}
        <Toaster />
      </body>
    </html>
  );
}
