import { BookAppointmentProvider } from "@/components/site/book-appointment-context";
import { Header } from "@/components/site/header";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { MarqueeStrip } from "@/components/site/marquee-strip";
import { FeaturesStrip } from "@/components/site/features-strip";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection, CtaSection } from "@/components/site/about-section";
import { ServicesSection } from "@/components/site/services-section";
import { PricingSection } from "@/components/site/pricing-section";
import { OffersSection } from "@/components/site/offers-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";
import { NewsletterSection } from "@/components/site/newsletter-section";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <BookAppointmentProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <HeroCarousel />
          <MarqueeStrip />
          <FeaturesStrip />
          <PopularServices />
          <AboutSection />
          <ServicesSection />
          <CtaSection />
          <PricingSection />
          <OffersSection />
          <Testimonials />
          <SocialSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </BookAppointmentProvider>
  );
}
