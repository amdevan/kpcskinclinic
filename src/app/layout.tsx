import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-whatsapp";
import { SitePopup } from "@/components/site/site-popup";

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

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch active popups + site settings from DB
  // All wrapped in try/catch so the page NEVER crashes if DB is unavailable
  let popups: any[] = [];
  let settings: Record<string, string> = {};
  try {
    const { db } = await import("@/lib/db");
    [popups] = await Promise.all([
      db.popup.findMany({ where: { isActive: true } }).catch(() => []),
    ]);
    const rows = await db.siteSetting.findMany().catch(() => []);
    for (const r of rows) settings[r.key] = r.value;
  } catch {
    // DB not available — use defaults
  }

  const logoUrl = settings["logo_url"] || "/kpc-logo.png";
  const faviconUrl = settings["favicon_url"] || "/favicon.svg";
  const clinicName = settings["clinic_name"] || "KPC";
  const clinicTagline = settings["clinic_tagline"] || "Skin · Hair · Aesthetic";

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
            <Header logoUrl={logoUrl} clinicName={clinicName} clinicTagline={clinicTagline} />
            <main className="flex-1">{children}</main>
            <Footer logoUrl={logoUrl} clinicName={clinicName} clinicTagline={clinicTagline} />
          </div>
          <FloatingButtons />
          {popups.length > 0 && <SitePopup popups={popups} />}
        </BookAppointmentProvider>
        <Toaster />
      </body>
    </html>
  );
}
