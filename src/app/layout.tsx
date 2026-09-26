import type { Metadata } from "next";
import { Playfair_Display, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Used sparingly for editorial pull-quotes and long-form captions.
const sourceSerif = Source_Serif_4({
  variable: "--font-serif-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
    url: "https://www.kpcskin.com",
    siteName: "KPC Skin Hair & Aesthetic Clinic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPC Skin Hair & Aesthetic Clinic",
    description: "Nepal's leading skin & hair clinic.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${sourceSerif.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
