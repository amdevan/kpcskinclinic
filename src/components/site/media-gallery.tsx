"use client";

import { motion } from "framer-motion";
import { BEFORE_AFTER_GALLERY } from "@/lib/site-data";

export type GalleryItem = {
  image: string;
  treatment: string;
  patient: string;
  sessions: string;
};

export function MediaGallery({
  eyebrow = "Before / After",
  title = "Real results, real people",
  description = "A glimpse of the transformations our doctors achieve — every result documented with consent.",
  image,
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  /** Gallery cards with images fetched from the CMS (Treatments / PageContent).
   *  Falls back to the built-in BEFORE_AFTER_GALLERY list. */
  items?: GalleryItem[];
}) {
  const gallery = items && items.length > 0 ? items : BEFORE_AFTER_GALLERY;
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand mb-3">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-ink">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          ) : null}
          {image ? (
            <div className="mt-6 overflow-hidden rounded-2xl">
              <img src={image} alt="" className="w-full max-h-72 object-cover" />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {gallery.map((g, i) => (
            <motion.article
              key={g.treatment}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-secondary card-lift"
            >
              <img
                src={g.image}
                alt={`${g.treatment} results`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-cream">
                <p className="font-display text-sm font-semibold">{g.treatment}</p>
                <p className="text-[11px] text-cream/75">{g.patient}</p>
                <p className="text-[11px] text-cream/60">{g.sessions}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
