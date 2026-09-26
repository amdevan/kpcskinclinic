import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection, CtaSection } from "@/components/site/about-section";
import { SuccessStoriesSection } from "@/components/site/success-stories-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";
import { Footer } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-whatsapp";

export default function Home() {
  return (
    <BookAppointmentProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HeroCarousel />
          <PopularServices />
          <AboutSection />
          <CtaSection />
          <SuccessStoriesSection />
          <Testimonials />
          <SocialSection />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </BookAppointmentProvider>
  );
}
