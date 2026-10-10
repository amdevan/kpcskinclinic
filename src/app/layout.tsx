import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-whatsapp";
import { SitePopup } from "@/components/site/site-popup";
import { db } from "@/lib/db";

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

export const metadata: Metadata = {
  title: "KPC Skin Hair & Aesthetic Clinic | Nepal's Leading Skin & Hair Clinic",
  description:
    "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — Nepal's leading skin and hair clinic. Expert hair transplants, laser treatments, cosmetic surgery, acne & scar treatments, and personalized dermatology care.",
  keywords: [
    "KPC Skin Hair & Aesthetic Clinic",
    "skin clinic Kathmandu",
    "hair transplant Nepal",
    "laser hair removal",
    "dermatologist Nepal",
    "acne treatment",
    "cosmetic surgery Nepal",
  ],
  authors: [{ name: "KPC Skin Hair & Aesthetic Clinic" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "KPC Skin Hair & Aesthetic Clinic | Nepal's Leading Skin & Hair Clinic",
    description:
      "Expert hair transplants, laser treatments, cosmetic surgery, acne & scar treatments, and personalized dermatology care in Nepal.",
    url: "https://www.kpcskinclinic.com",
    siteName: "KPC Skin Hair & Aesthetic Clinic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPC Skin Hair & Aesthetic Clinic",
    description: "Nepal's leading skin & hair clinic.",
  },
};

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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={faviconUrl} />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground font-sans`}
      >
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
        <Toaster />
      </body>
    </html>
  );
}
