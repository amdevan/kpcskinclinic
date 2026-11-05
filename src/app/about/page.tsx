import { PageBanner } from "@/components/site/page-banner";
import { CtaSection } from "@/components/site/cta-section";
import { VideoEmbed } from "@/components/site/video-embed";
import { VALUES, STATS_FULL, CONTACT_INFO } from "@/lib/site-data";
import { CheckCircle2, Target, Eye, Heart } from "lucide-react";
import { getPageSection } from "@/lib/page-content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata("/about", {
    title: "About Us | KPC Skin Hair & Aesthetic Clinic",
    description:
      "KPC Skin Hair & Aesthetic Clinic Pvt. Ltd — founded 2021 in Thapathali, Kathmandu. Meet our doctors, our values, and the story behind Nepal's leading skin & hair clinic.",
    canonical: "/about",
  });
}

// Default content fallbacks (used when DB is unavailable or rows missing)
const DEFAULTS = {
  banner: {
    title: "A small clinic that takes a long time with each patient.",
    description:
      "Founded 2021 in Thapathali. Trusted care, one promise: honest treatment plans, written down, performed by doctors — not salespeople.",
    image: "/images/gen/clinic-room.jpg",
  },
  story: {
    title:
      "We started KPC because we were tired of clinics that treated patients like transactions.",
    body: "KPC Skin Hair & Aesthetic Clinic started in 2021 with two rooms in Thapathali and one dermatologist who refused to recommend treatments he wouldn't do on his own family. Five years on, we've grown — but that rule hasn't changed.\n\nWe are not the biggest clinic in Kathmandu, and we don't want to be. What we are is deliberate: every consultation runs 30–45 minutes, every treatment plan is written down and handed to you, and every procedure is performed by a doctor — not a technician, not a salesperson.\n\nToday, KPC is a team of five full-time doctors, a patient care team of three, and an in-house surgical theatre. We've performed over 8,000 procedures — from hair transplants to rhinoplasty to laser hair removal — and we still answer every appointment request ourselves. No call center, no bots.",
  },
  mission: {
    title: "Mission",
    body: "To deliver dermatology and aesthetic care that puts the patient's long-term outcome above short-term revenue — and to prove that honesty is a viable business model.",
  },
  vision: {
    title: "Vision",
    body: "To be Nepal's most trusted skin and hair clinic — where patients come for a second opinion before they commit to a procedure anywhere else.",
  },
  promise: {
    title: "Promise",
    body: "Every patient leaves with a written plan, a clear price, and the name of the doctor responsible for their care. If we can't help, we'll tell you who can.",
  },
};

async function getAboutContent() {
  const [banner, story, mission, vision, promise, teamVideoRow] = await Promise.all([
    getPageSection("about", "banner"),
    getPageSection("about", "story"),
    getPageSection("about", "mission"),
    getPageSection("about", "vision"),
    getPageSection("about", "promise"),
    getPageSection("about", "team-video"),
  ]);
  const bannerContent = {
    title: banner?.title || DEFAULTS.banner.title,
    description: banner?.body || DEFAULTS.banner.description,
    image: banner?.image || DEFAULTS.banner.image,
    eyebrow: banner?.extra.eyebrow || "About Us",
    highlight: banner?.extra.highlight || "",
  };
  const storyContent = {
    title: story?.title || DEFAULTS.story.title,
    body: story?.body || DEFAULTS.story.body,
    video: story?.video || "",
  };
  const teamVideo =
    teamVideoRow && teamVideoRow.video
      ? { title: teamVideoRow.title, body: teamVideoRow.body, image: teamVideoRow.image, video: teamVideoRow.video }
      : null;
  return {
    banner: bannerContent,
    story: storyContent,
    mission: { title: mission?.title || DEFAULTS.mission.title, body: mission?.body || DEFAULTS.mission.body },
    vision: { title: vision?.title || DEFAULTS.vision.title, body: vision?.body || DEFAULTS.vision.body },
    promise: { title: promise?.title || DEFAULTS.promise.title, body: promise?.body || DEFAULTS.promise.body },
    teamVideo,
  };
}

export default async function AboutPage() {
  const { banner, story, mission, vision, promise, teamVideo } = await getAboutContent();
  const storyParas = story.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const bannerTitleMain = banner.highlight
    ? banner.title
    : banner.title.split(" ").slice(0, -2).join(" ");
  const bannerHighlight = banner.highlight || banner.title.split(" ").slice(-2).join(" ");
  return (
    <>
      <PageBanner
        eyebrow={banner.eyebrow}
        title={bannerTitleMain}
        highlight={bannerHighlight}
        description={banner.description}
        image={banner.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story + stats */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
                Our story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-6">
                {story.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="font-italic-accent text-brand font-medium">
                  {story.title.split(" ").slice(-1)[0]}
                </span>
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {storyParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {story.video ? (
                <div className="mt-8 max-w-2xl">
                  <VideoEmbed url={story.video} />
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
                {STATS_FULL.map((s, i) => {
                  const colors = ["text-brand", "text-cyan", "text-green", "text-gold", "text-rust", "text-brand"];
                  return (
                    <div key={s.label} className="bg-card p-5 text-center">
                      <p className={`font-display text-3xl sm:text-4xl font-bold ${colors[i % colors.length]}`}>
                        {s.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-2xl p-7 border-t-4 border-brand border border-border">
              <div className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {mission.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mission.body}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-7 border-t-4 border-cyan border border-border">
              <div className="h-11 w-11 rounded-xl bg-cyan/10 flex items-center justify-center mb-4">
                <Eye className="h-5 w-5 text-cyan" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {vision.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {vision.body}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-7 border-t-4 border-rust border border-border">
              <div className="h-11 w-11 rounded-xl bg-rust/10 flex items-center justify-center mb-4">
                <Heart className="h-5 w-5 text-rust" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {promise.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {promise.body}
              </p>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">
            What we will{" "}
            <span className="font-italic-accent text-brand font-medium">
              never
            </span>{" "}
            compromise on
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-ink mb-1">{v.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / clinic video — only rendered if a video URL is set */}
      {teamVideo && teamVideo.video ? (
        <section className="py-16 sm:py-20 bg-cream">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                {teamVideo.title ? (
                  <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink mb-3">
                    {teamVideo.title}
                  </h2>
                ) : null}
                {teamVideo.body ? (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {teamVideo.body}
                  </p>
                ) : null}
              </div>
              <div className="lg:col-span-7">
                <VideoEmbed url={teamVideo.video} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection
        titlePrefix="Want to meet the team?"
        highlight="Book a consultation."
        description="Meet the doctor who'll actually perform your procedure, walk through the clinic, and leave with a written plan. Consultations are 30–45 minutes."
        primaryCta="Request an Appointment"
        secondaryCta="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
