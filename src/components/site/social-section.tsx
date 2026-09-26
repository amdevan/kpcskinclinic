"use client";

import { motion } from "framer-motion";
import { Instagram, Music2, ArrowUpRight } from "lucide-react";
import { SOCIAL_POSTS } from "@/lib/site-data";
import { SectionHeader } from "./popular-services";

export function SocialSection() {
  return (
    <section id="social" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Follow us"
          title={
            <>
              Follow us on{" "}
              <span className="text-brand">Instagram & TikTok</span>
            </>
          }
          description="@kpcskin — behind-the-scenes, before & afters, patient stories and skincare tips from our clinic."
          action={
            <div className="flex items-center gap-3">
              <a
                href="#social"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <Instagram className="h-4 w-4" />
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#social"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <Music2 className="h-4 w-4" />
                TikTok
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          }
        />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SOCIAL_POSTS.map((p, i) => (
            <motion.a
              key={i}
              href="#social"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-secondary"
            >
              { }
              <img
                src={p.image}
                alt={p.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[10px] font-semibold text-gold">{p.handle}</p>
                <p className="text-[11px] text-cream/90 line-clamp-2">
                  {p.caption}
                </p>
              </div>
              <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="h-3.5 w-3.5 text-brand" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
