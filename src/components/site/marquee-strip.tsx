"use client";

const ITEMS = [
  "Hair Transplant",
  "FUE Technique",
  "Beard & Eyebrow Restoration",
  "PRP Hair Treatment",
  "GFC Therapy",
  "Laser Hair Removal",
  "HydraFacial",
  "Chemical Peeling",
  "Botox & Fillers",
  "HIFU Lifting",
  "Rhinoplasty",
  "Acne & Scar Treatment",
  "Melasma Treatment",
  "Carbon Laser Peel",
  "Microneedling",
  "Mole & Tattoo Removal",
];

export function MarqueeStrip() {
  // Duplicate items so the loop appears seamless
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-ink text-cream/90 border-y border-cream/10 overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap py-3.5">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-6 inline-flex items-center gap-3 text-sm font-medium tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
