import { HeroCarousel } from "@/components/site/hero-carousel";
import { PopularServices } from "@/components/site/popular-services";
import { AboutSection } from "@/components/site/about-section";
import { CtaSection } from "@/components/site/cta-section";
import { SuccessStoriesSection } from "@/components/site/success-stories-section";
import { Testimonials } from "@/components/site/testimonials";
import { SocialSection } from "@/components/site/social-section";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <PopularServices />
      <AboutSection />
      <CtaSection />
      <SuccessStoriesSection />
      <Testimonials />
      <SocialSection />
    </>
  );
}
