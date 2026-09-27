import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-whatsapp";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Clean, normal heading font (used in normal — non-italic — weight)
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
        className={`${inter.variable} ${poppins.variable} antialiased bg-background text-foreground font-sans`}
      >
        <BookAppointmentProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingButtons />
        </BookAppointmentProvider>
        <Toaster />
      </body>
    </html>
  );
}
