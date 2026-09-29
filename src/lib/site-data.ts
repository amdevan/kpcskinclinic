// Centralized site content for KPC Skin Hair & Aesthetic Clinic
// Site copy modeled on the original KPC clinic brand.

export type ServiceItem = {
  title: string;
  href: string;
  description: string;
  slug?: string;
};

// Slugify a title for use in /services/[slug] links
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  services: ServiceItem[];
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "About", href: "/about" },
  { label: "Hair Transplant", href: "/hair-transplant" },
  { label: "Procedure", href: "/procedures" },
  { label: "Package", href: "/packages" },
  { label: "Offers", href: "/offers" },
  { label: "Success Story", href: "/success-stories" },
  { label: "STD/STI", href: "/std-sti" },
  { label: "Blog", href: "/blog" },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hair-transplant",
    title: "Hair Transplant",
    tagline: "Restore your hairline, naturally.",
    description:
      "Advanced FUE hair transplant techniques delivered by experienced surgeons for natural, permanent results.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    services: [
      { title: "Hair Transplant", href: "#services", description: "FUE hair restoration for natural density." },
      { title: "Beard Transplant", href: "#services", description: "Fill in patchy beards with your own follicles." },
      { title: "Eyebrow Transplant", href: "#services", description: "Restore eyebrows frame-by-frame." },
    ],
  },
  {
    id: "hair-clinic",
    title: "Hair Clinic",
    tagline: "Medical hair care, end to end.",
    description:
      "Diagnosis-driven treatment plans for dandruff, scalp concerns, hair loss and thinning — backed by clinically proven protocols.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    services: [
      { title: "Dandruff & Scalp Treatments", href: "#services", description: "Targeted care for itchy, flaky scalps." },
      { title: "GFC Treatment", href: "#services", description: "Growth Factor Concentrate for thicker hair." },
      { title: "PRP Hair Treatment", href: "#services", description: "Platelet-rich plasma therapy for hair regrowth." },
      { title: "Hair Loss Treatment", href: "#services", description: "Personalized plans for every type of hair loss." },
      { title: "Minoxidil / Finasteride", href: "#services", description: "Medical-grade hair loss management." },
    ],
  },
  {
    id: "surgery",
    title: "Surgery",
    tagline: "Refinement, artistry, safety.",
    description:
      "Cosmetic and reconstructive surgical procedures performed by board-certified plastic surgeons in a fully equipped, sterile theatre.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
    services: [
      { title: "Anti Aging", href: "#services", description: "Surgical anti-aging procedures." },
      { title: "Plastic Surgery", href: "#services", description: "Comprehensive cosmetic surgery options." },
      { title: "Rhinoplasty", href: "#services", description: "Nose reshaping for harmony & function." },
      { title: "Blepharoplasty (Upper & Lower)", href: "#services", description: "Eyelid surgery for a refreshed look." },
      { title: "Scar Revision", href: "#services", description: "Minimize and refine visible scars." },
    ],
  },
  {
    id: "face-concerns",
    title: "Cosmetic Concerns for Face",
    tagline: "Solutions for every skin concern.",
    description:
      "Targeted, evidence-based protocols for acne, pigmentation, vitiligo, dark circles and more — tailored to your skin type.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/50233b5c58e8.jpg",
    services: [
      { title: "Acne & Acne Scars", href: "#services", description: "Clear active acne and smooth scars." },
      { title: "Open Pores & Oily Skin", href: "#services", description: "Refine texture and control oil." },
      { title: "Melasma Treatment", href: "#services", description: "Fade stubborn pigmentation safely." },
      { title: "Vitiligo Treatment", href: "#services", description: "Holistic care for vitiligo." },
      { title: "Dark Circles Treatment", href: "#services", description: "Brighten tired under-eyes." },
    ],
  },
  {
    id: "aesthetic-services",
    title: "Aesthetic Services",
    tagline: "Glow, every single day.",
    description:
      "A full spectrum of aesthetic and facial rejuvenation treatments — from HydraFacial and chemical peels to HIFU, fillers and PRP.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
    services: [
      { title: "Hydra Facial", href: "#services", description: "Deep-cleansing, hydrating glow facial." },
      { title: "Chemical Peeling", href: "#services", description: "Resurface for brighter, smoother skin." },
      { title: "Botox Treatment", href: "#services", description: "Soften lines and wrinkles." },
      { title: "Carbon Laser Peeling", href: "#services", description: "The 'red-carpet' glow peel." },
      { title: "Facial Treatments", href: "#services", description: "Customized facials for every skin." },
      { title: "Microneedling", href: "#services", description: "Collagen induction for firmness." },
      { title: "HIFU", href: "#services", description: "Non-surgical lifting & tightening." },
      { title: "Weight Loss / Body Shaping", href: "#services", description: "Body contouring programs." },
      { title: "PRP – Face Treatment", href: "#services", description: "PRP for facial rejuvenation." },
      { title: "PRP – Hair Treatment", href: "#services", description: "PRP therapy for hair regrowth." },
      { title: "Dermal Fillers", href: "#services", description: "Restore volume & definition." },
      { title: "Tattoo Removal", href: "#services", description: "Safe, effective laser removal." },
      { title: "Mole Removal", href: "#services", description: "Precision mole & skin tag removal." },
    ],
  },
  {
    id: "laser-treatments",
    title: "Laser Treatments",
    tagline: "Smooth, hair-free, confident.",
    description:
      "Medical-grade laser hair removal using the latest diode technology for safe, comfortable and lasting results on all skin types.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
    services: [
      { title: "Laser Hair Removal", href: "#services", description: "Permanent reduction, all skin types." },
    ],
  },
];

export type PopularService = {
  title: string;
  description: string;
  image: string;
  href: string;
  accent: string;
};

export const POPULAR_SERVICES: PopularService[] = [
  {
    title: "Hair Transplant",
    description:
      "Natural, permanent hair restoration with advanced FUE techniques and experienced surgeons.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    href: "#services",
    accent: "from-brand/80 to-cyan",
  },
  {
    title: "Plastic Surgery",
    description:
      "Refined cosmetic and reconstructive procedures performed by board-certified plastic surgeons.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2daf75b22fb4.jpg",
    href: "#services",
    accent: "from-gold/80 to-rust",
  },
  {
    title: "Acne & Acne Scars",
    description:
      "Clear active acne and smooth acne scars with clinically proven, personalized protocols.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    href: "#services",
    accent: "from-green/80 to-brand",
  },
  {
    title: "Hair Loss Treatment",
    description:
      "Diagnosis-driven plans combining medical therapy, PRP, GFC and lifestyle guidance.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    href: "#services",
    accent: "from-rust/80 to-gold",
  },
];

export type Testimonial = {
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
  service: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Bibek",
    date: "9th Aug, 2026",
    rating: 5,
    text:
      "I am the most happiest guy now after visiting KPC Skin Clinic for my skin consultation with Dr Rupak, I can see the visible changes and glow on my skin that I never had before. Highly recommended, best skin clinic in Kathmandu.",
    avatar:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b3d45d368c6e.jpg",
    service: "Skin Consultation",
  },
  {
    name: "Megha Nath Rai",
    date: "14th Aug, 2025",
    rating: 5,
    text: "Best place to transplant!",
    avatar:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/80b0eb48c72d.jpg",
    service: "Hair Transplant",
  },
  {
    name: "Manju DC",
    date: "18th Feb, 2026",
    rating: 5,
    text:
      "Completed my laser hair removal sessions here and very satisfied with the result. Highly recommended KPC for laser hair removal.",
    avatar:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/edf0e5648f32.jpg",
    service: "Laser Hair Removal",
  },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryCta: string;
  secondaryCta: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Expert Hair Transplant Solutions",
    title: "Healthy hair starts with a",
    highlight: "personalized consultation.",
    description:
      "FUE hair transplants, beard and eyebrow restoration performed by experienced surgeons — natural density, permanent results.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dfd046dc97ad.jpg",
    primaryCta: "Request an Appointment",
    secondaryCta: "Explore our Services",
  },
  {
    eyebrow: "Hair Restoration Specialists at Your Service",
    title: "A personalized consultation with the",
    highlight: "best hair transplant doctors.",
    description:
      "Diagnosis-driven hair loss programs — medical therapy, PRP, GFC and transplant options tailored to your goals and biology.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8f1cadc923c0.jpg",
    primaryCta: "Request an Appointment",
    secondaryCta: "Explore our Services",
  },
  {
    eyebrow: "Friendly Team to Guide Your Hair Restoration Journey",
    title: "It all starts with a",
    highlight: "personalized consultation.",
    description:
      "Nearly 10 years of trusted care. State-of-the-art medical equipment. Clinically proven procedures. Confidence in every step.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/13a4cb2c9ca7.jpg",
    primaryCta: "Request an Appointment",
    secondaryCta: "Explore our Services",
  },
];

export const SOCIAL_POSTS = [
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bc026548584.webp",
    handle: "@kpcskin",
    caption: "Glowing skin week — HydraFacial results.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a6cc93c84fc4.jpg",
    handle: "@kpcskin",
    caption: "Day 7 post FUE hair transplant.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da3261b93bf0.jpg",
    handle: "@kpcskin",
    caption: "Carbon laser peel — red carpet ready.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2469b0d523.jpg",
    handle: "@kpcskin",
    caption: "Inside our Kathmandu clinic.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cb095eaff0da.jpg",
    handle: "@kpcskin",
    caption: "Sterile, equipped, ready for you.",
  },
  {
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7e1b6422719.jpg",
    handle: "@kpcskin",
    caption: "Where science meets care.",
  },
];

export const STATS = [
  { value: "10+", label: "Years of trusted care" },
  { value: "15k+", label: "Procedures performed" },
  { value: "98%", label: "Patient satisfaction" },
  { value: "6", label: "Service categories" },
];

export const PRICING = [
  {
    name: "Hair Transplant",
    note: "FUE / FUT",
    price: "NPR 60,000+",
    unit: "per session",
    features: [
      "Free pre-op consultation",
      "Experienced transplant surgeons",
      "Lifetime graft survival guarantee",
      "PRP add-on available",
    ],
    popular: false,
  },
  {
    name: "Laser Hair Removal",
    note: "Full body / area",
    price: "NPR 2,500+",
    unit: "per session",
    features: [
      "Diode laser for all skin types",
      "Cool-tip for comfort",
      "Package of 6+ sessions recommended",
      "Free patch test",
    ],
    popular: true,
  },
  {
    name: "HydraFacial",
    note: "Signature glow",
    price: "NPR 4,500+",
    unit: "per session",
    features: [
      "Cleanse · exfoliate · hydrate",
      "Instant visible glow",
      "No downtime",
      "Add-on LED light therapy",
    ],
    popular: false,
  },
];

export const OFFERS = [
  {
    badge: "Monsoon",
    title: "Flat 20% off Laser Hair Removal packages",
    description:
      "Book a full-body package of 6 sessions before the end of the month and save 20% plus a free HydraFacial add-on.",
    cta: "Claim offer",
  },
  {
    badge: "New Patient",
    title: "Free skin consultation + 15% off first treatment",
    description:
      "First-time visitors get a complimentary consultation with our dermatologists and 15% off their first in-clinic procedure.",
    cta: "Book consultation",
  },
  {
    badge: "Hair Package",
    title: "PRP + GFC combo for hair regrowth",
    description:
      "Combine PRP and GFC therapy into a single 4-session program for visibly thicker hair at a bundled price.",
    cta: "View package",
  },
];

// ===== Multi-page data =====

export const TEAM = [
  {
    name: "Dr. Rupak Maharjan",
    role: "Founder & Medical Director",
    credentials: "MBBS, MD (Dermatology)",
    bio: "Founded KPC in 2016 after 8 years in hospital dermatology. Specialises in hair disorders and cosmetic dermatology. Believes every consultation should end with a written plan.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b3d45d368c6e.jpg",
  },
  {
    name: "Dr. Sneha Shrestha",
    role: "Consultant Dermatologist",
    credentials: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    bio: "Leads our acne, pigmentation and laser aesthetic practice. Trained at TUTH with fellowships in aesthetic medicine in Mumbai and Bangkok.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8901a17a3177.jpg",
  },
  {
    name: "Dr. Rajesh Maharjan",
    role: "Plastic & Cosmetic Surgeon",
    credentials: "MBBS, MS, MCh (Plastic Surgery)",
    bio: "Board-certified plastic surgeon with 12 years of experience in rhinoplasty, blepharoplasty and scar revision. Performs all surgical procedures in our in-house theatre.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d069a3da3145.jpg",
  },
  {
    name: "Sunita Gurung",
    role: "Head of Patient Care",
    credentials: "BSc Nursing, Aesthetic Nurse Certified",
    bio: "Runs the front desk and our patient care team. The first voice you'll hear on the phone and the last face you'll see before leaving — your go-to person for anything.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91cc97c0d4e3.jpg",
  },
];

export const VALUES = [
  {
    title: "Honesty first",
    description:
      "If you don't need a procedure, we tell you. If a cheaper alternative works as well, we recommend that. We lose money this way — and we sleep fine.",
  },
  {
    title: "Doctors, not salespeople",
    description:
      "Every consultation and every procedure is performed by a qualified doctor. No technicians doing medical work, no sales targets guiding treatment plans.",
  },
  {
    title: "Written plans, always",
    description:
      "After your consultation you leave with a written treatment plan: what you have, what we recommend, what it costs, what to expect. No ambiguity.",
  },
  {
    title: "Sterile, every time",
    description:
      "Single-use disposables where it matters, autoclaved instruments otherwise, and a theatre you can walk through any day without an appointment.",
  },
];

export const STATS_FULL = [
  { value: "2016", label: "Founded in Kathmandu" },
  { value: "15,000+", label: "Procedures performed" },
  { value: "4", label: "Full-time doctors" },
  { value: "6", label: "Service categories" },
  { value: "28", label: "Treatments on offer" },
  { value: "9 yrs", label: "Of continuous care" },
];

// Expanded pricing — one starting price per service category
export const PRICING_FULL = [
  {
    category: "Hair Transplant",
    items: [
      { name: "FUE Hair Transplant", price: "NPR 60,000+", unit: "per session", note: "Price depends on graft count" },
      { name: "Beard Transplant", price: "NPR 45,000+", unit: "per session", note: "" },
      { name: "Eyebrow Transplant", price: "NPR 35,000+", unit: "per session", note: "" },
    ],
  },
  {
    category: "Hair Clinic",
    items: [
      { name: "PRP Hair Treatment", price: "NPR 8,000", unit: "per session", note: "Package of 4 recommended" },
      { name: "GFC Treatment", price: "NPR 6,000", unit: "per session", note: "" },
      { name: "Dandruff & Scalp Treatment", price: "NPR 2,500", unit: "consultation + meds", note: "" },
      { name: "Hair Loss (Minoxidil/Finasteride)", price: "NPR 1,500", unit: "per month", note: "Prescription only" },
    ],
  },
  {
    category: "Surgery",
    items: [
      { name: "Rhinoplasty", price: "NPR 1,50,000+", unit: "procedure", note: "" },
      { name: "Blepharoplasty (Eyelid)", price: "NPR 80,000+", unit: "procedure", note: "Upper or lower" },
      { name: "Scar Revision", price: "NPR 25,000+", unit: "procedure", note: "Depends on size" },
      { name: "Anti Aging Surgery", price: "NPR 1,20,000+", unit: "procedure", note: "" },
    ],
  },
  {
    category: "Cosmetic Concerns — Face",
    items: [
      { name: "Acne & Acne Scars", price: "NPR 3,500+", unit: "per session", note: "Multi-session program" },
      { name: "Melasma Treatment", price: "NPR 4,000+", unit: "per session", note: "" },
      { name: "Open Pores & Oily Skin", price: "NPR 3,000+", unit: "per session", note: "" },
      { name: "Dark Circles Treatment", price: "NPR 4,500+", unit: "per session", note: "" },
      { name: "Vitiligo Treatment", price: "On consultation", unit: "", note: "Customised plan" },
    ],
  },
  {
    category: "Aesthetic Services",
    items: [
      { name: "Hydra Facial", price: "NPR 4,500", unit: "per session", note: "" },
      { name: "Chemical Peeling", price: "NPR 3,000+", unit: "per session", note: "" },
      { name: "Botox Treatment", price: "NPR 350", unit: "per unit", note: "Area-based" },
      { name: "Dermal Fillers", price: "NPR 18,000+", unit: "per syringe", note: "" },
      { name: "HIFU Lifting", price: "NPR 25,000+", unit: "per area", note: "" },
      { name: "Microneedling", price: "NPR 4,000+", unit: "per session", note: "" },
      { name: "Carbon Laser Peeling", price: "NPR 5,000+", unit: "per session", note: "" },
      { name: "Mole Removal", price: "NPR 2,500+", unit: "per mole", note: "" },
      { name: "Tattoo Removal", price: "NPR 3,000+", unit: "per session", note: "Size-based" },
    ],
  },
  {
    category: "Laser Treatments",
    items: [
      { name: "Laser Hair Removal — Upper Lip", price: "NPR 2,500", unit: "per session", note: "" },
      { name: "Laser Hair Removal — Full Face", price: "NPR 5,000", unit: "per session", note: "" },
      { name: "Laser Hair Removal — Full Body", price: "NPR 15,000+", unit: "per session", note: "Package of 6: 20% off" },
    ],
  },
];

export const FAQ = [
  {
    q: "Do I need to book in advance, or can I walk in?",
    a: "We strongly recommend booking in advance — our doctors' consultation slots fill up 3–4 days ahead. Walk-ins for procedures are not accepted; we need sterilisation and doctor scheduling lead time.",
  },
  {
    q: "Is the first consultation free?",
    a: "A 15-minute orientation chat with our patient care team is free. A full 30–45 minute consultation with a doctor is NPR 1,000, which is adjusted against your treatment if you proceed.",
  },
  {
    q: "Do you offer EMI / instalment plans?",
    a: "Yes — for treatments above NPR 50,000 we offer 3- and 6-month EMI through our partner banks (Nabil, NIC Asia, Global IME). Bring your citizenship and latest payslip.",
  },
  {
    q: "Are the prices negotiable?",
    a: "No. Our prices are transparent and the same for everyone. What you see on the pricing page is what you pay. We don't run 'discount' negotiations.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "Every procedure comes with a clear written outcome expectation agreed before treatment. If a result falls short of that agreed expectation due to our work, we re-do or adjust at no charge. This is in writing.",
  },
  {
    q: "Do you treat both men and women?",
    a: "Yes. We have male and female doctors and a private treatment room for each. Approximately 55% of our patients are women, 45% men.",
  },
];

export const CONTACT_INFO = {
  phone: "+977-1-4XXXXXX",
  phoneHref: "tel:+97714000000",
  mobile: "+977-98XXXXXXXX",
  mobileHref: "tel:+9779800000000",
  whatsapp: "https://wa.me/9779800000000",
  whatsappLabel: "WhatsApp",
  email: "info@kpcskin.com",
  emailHref: "mailto:info@kpcskin.com",
  address: "Prasuti Griha Marg, Thapathali, Kathmandu, Nepal 44600",
  addressShort: "Thapathali, Kathmandu",
  addressMapHref: "https://maps.google.com/?q=Prasuti+Griha+Marg+Thapathali+Kathmandu",
  hours: [
    { day: "Sunday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/kpcskin", handle: "@kpcskin", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com/kpcskin", handle: "KPC Skin Clinic", icon: "facebook" },
    { label: "TikTok", href: "https://tiktok.com/@kpcskin", handle: "@kpcskin", icon: "tiktok" },
    { label: "WhatsApp", href: "https://wa.me/9779800000000", handle: "+977-98XXXXXXXX", icon: "whatsapp" },
  ],
};

export const BEFORE_AFTER_GALLERY = [
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    treatment: "Hair Transplant",
    patient: "Male, 34",
    sessions: "1 session, 8 months ago",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    treatment: "Acne & Scars",
    patient: "Female, 26",
    sessions: "6 sessions over 4 months",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
    treatment: "Laser Hair Removal",
    patient: "Female, 31",
    sessions: "7 sessions over 10 months",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
    treatment: "Hydra Facial",
    patient: "Female, 29",
    sessions: "Monthly for 6 months",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    treatment: "PRP Hair Treatment",
    patient: "Male, 41",
    sessions: "4 sessions over 3 months",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a6cc93c84fc4.jpg",
    treatment: "Skin Rejuvenation",
    patient: "Female, 38",
    sessions: "3 sessions over 2 months",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
    treatment: "Rhinoplasty",
    patient: "Female, 27",
    sessions: "1 procedure, 6 months ago",
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2daf75b22fb4.jpg",
    treatment: "Plastic Surgery",
    patient: "Male, 45",
    sessions: "1 procedure, 1 year ago",
  },
];

// ===== Doctors (6) =====
export const DOCTORS = [
  {
    slug: "dr-rupak-maharjan",
    name: "Dr. Rupak Maharjan",
    role: "Founder & Medical Director",
    credentials: "MBBS, MD (Dermatology)",
    specialties: ["Hair Disorders", "Hair Transplant", "Cosmetic Dermatology"],
    bio: "Founded KPC in 2016 after 8 years in hospital dermatology. Specialises in hair disorders and cosmetic dermatology. Believes every consultation should end with a written plan.",
    fullBio: "Dr. Rupak Maharjan graduated from the Institute of Medicine, Maharajgunj, and completed his MD in Dermatology at TUTH. After 8 years in hospital practice — including 3 years leading the dermatology department at a major Kathmandu hospital — he founded KPC in 2016 with a single rule: never recommend a treatment he wouldn't do on his own family. Nine years on, that rule hasn't changed. He personally oversees every hair transplant case and leads the clinic's medical dermatology practice.",
    education: [
      "MBBS — Institute of Medicine, Tribhuvan University Teaching Hospital (TUTH)",
      "MD (Dermatology, Venereology & Leprosy) — TUTH",
      "Certification in Aesthetic Medicine — American Academy of Aesthetic Medicine",
    ],
    treatments: ["Hair Transplant", "PRP Hair Treatment", "GFC Treatment", "Acne & Acne Scars", "Melasma Treatment"],
    approach: "Every consultation runs 30–45 minutes. You leave with a written plan: what you have, what we recommend, what it costs, what to expect. No verbal estimates.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b3d45d368c6e.jpg",
    experience: "17+ years",
  },
  {
    slug: "dr-sneha-shrestha",
    name: "Dr. Sneha Shrestha",
    role: "Consultant Dermatologist",
    credentials: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    specialties: ["Acne", "Pigmentation", "Laser Aesthetics"],
    bio: "Leads our acne, pigmentation and laser aesthetic practice. Trained at TUTH with fellowships in aesthetic medicine in Mumbai and Bangkok.",
    fullBio: "Dr. Sneha Shrestha completed her MD in Dermatology at TUTH, followed by a fellowship in aesthetic medicine at the Mumbai Institute of Aesthetic Medicine and laser training at Bangkok's laser academy. She leads KPC's acne, pigmentation, and laser aesthetic practice — the clinic's highest-volume area. She's known for her methodical approach to acne scarring: she diagnoses the scar type (there are at least six) before recommending any treatment.",
    education: [
      "MBBS — Institute of Medicine, TUTH",
      "MD (Dermatology, Venereology & Leprosy) — TUTH",
      "Fellowship in Aesthetic Medicine — Mumbai Institute of Aesthetic Medicine",
      "Laser Aesthetics Certification — Bangkok Laser Academy",
    ],
    treatments: ["Acne & Acne Scars", "Melasma Treatment", "Open Pores & Oily Skin", "Laser Hair Removal", "Chemical Peeling", "HydraFacial"],
    approach: "Acne scars are not one condition — they are at least six. I diagnose what you actually have before recommending any treatment. A single laser won't fix all of them.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8901a17a3177.jpg",
    experience: "12+ years",
  },
  {
    slug: "dr-rajesh-maharjan",
    name: "Dr. Rajesh Maharjan",
    role: "Plastic & Cosmetic Surgeon",
    credentials: "MBBS, MS, MCh (Plastic Surgery)",
    specialties: ["Rhinoplasty", "Blepharoplasty", "Scar Revision"],
    bio: "Board-certified plastic surgeon with 12 years of experience in rhinoplasty, blepharoplasty and scar revision. Performs all surgical procedures in our in-house theatre.",
    fullBio: "Dr. Rajesh Maharjan is one of the few MCh-qualified plastic surgeons in private practice in Kathmandu. He completed his super-specialty training at the National Academy of Medical Sciences (NAMS), Bir Hospital. With 12 years of surgical experience, he performs all of KPC's cosmetic and reconstructive procedures — rhinoplasty, blepharoplasty, scar revision, and anti-ageing surgery — in our in-house sterile theatre at Thapathali. He's known for natural-looking results and honest pre-operative counselling.",
    education: [
      "MBBS — Institute of Medicine, TUTH",
      "MS (General Surgery) — National Academy of Medical Sciences (NAMS)",
      "MCh (Plastic Surgery) — NAMS, Bir Hospital",
    ],
    treatments: ["Rhinoplasty", "Blepharoplasty", "Scar Revision", "Anti-Ageing Surgery", "Plastic Surgery"],
    approach: "I show patients photographs of real results — not the best, but the typical. If you want a nose that looks like a celebrity's, I'll tell you whether your anatomy allows it. Natural is the goal.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d069a3da3145.jpg",
    experience: "12+ years",
  },
  {
    slug: "dr-priya-karki",
    name: "Dr. Priya Karki",
    role: "Aesthetic Medicine Specialist",
    credentials: "MBBS, MD, Fellowship in Aesthetic Medicine",
    specialties: ["Botox", "Dermal Fillers", "HIFU", "HydraFacial"],
    bio: "Specialises in non-surgical facial rejuvenation — injectables, energy-based devices, and medical-grade facials. Trained in Seoul and Bangkok.",
    fullBio: "Dr. Priya Karki leads KPC's non-surgical aesthetic practice. After her MD, she completed a fellowship in aesthetic medicine in Seoul — the global capital of non-surgical facial refinement — and advanced training in energy-based devices (HIFU, radiofrequency) in Bangkok. She performs all injectable treatments (Botox, dermal fillers) and energy-based treatments at the clinic. Her philosophy: less is more. A good aesthetic treatment should make you look rested, not 'done'.",
    education: [
      "MBBS — Institute of Medicine, TUTH",
      "MD — Kathmandu University",
      "Fellowship in Aesthetic Medicine — Seoul, South Korea",
      "Advanced Injectable & Energy-Based Device Training — Bangkok, Thailand",
    ],
    treatments: ["Botox Treatment", "Dermal Fillers", "HIFU", "HydraFacial", "Carbon Laser Peel", "Microneedling", "PRP Face Treatment"],
    approach: "A good aesthetic treatment should make you look rested, not 'done'. I start with less and add more if needed — you can always inject more, you can't un-inject.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91cc97c0d4e3.jpg",
    experience: "9+ years",
  },
  {
    slug: "dr-anil-shakya",
    name: "Dr. Anil Shakya",
    role: "Hair Transplant Surgeon",
    credentials: "MBBS, MD, Fellowship in Trichology (FUE)",
    specialties: ["FUE Hair Transplant", "Beard Transplant", "PRP Therapy"],
    bio: "Leads our hair transplant practice. Has performed over 2,000 FUE procedures with a focus on natural density and graft survival.",
    fullBio: "Dr. Anil Shakya leads KPC's hair transplant practice. He completed a fellowship in trichology and FUE technique at a leading hair restoration centre in New Delhi. With over 2,000 FUE procedures performed, he's one of the most experienced hair transplant surgeons in Kathmandu. His focus is on natural density and graft survival — he personally performs both the donor harvest and the implantation, never delegating to a technician.",
    education: [
      "MBBS — Institute of Medicine, TUTH",
      "MD — Kathmandu University",
      "Fellowship in Trichology & FUE — New Delhi, India",
      "Member, International Society of Hair Restoration Surgery (ISHRS)",
    ],
    treatments: ["FUE Hair Transplant", "Beard Transplant", "Eyebrow Transplant", "PRP Hair Treatment", "GFC Treatment"],
    approach: "I personally perform both the harvest and the implantation. The angle, direction, and density of implantation is what makes a transplant look natural — and that's the surgeon's job, not a technician's.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/80b0eb48c72d.jpg",
    experience: "11+ years",
  },
  {
    slug: "sunita-gurung",
    name: "Sunita Gurung",
    role: "Head of Patient Care",
    credentials: "BSc Nursing, Aesthetic Nurse Certified",
    specialties: ["Patient Care", "Treatment Coordination"],
    bio: "Runs the front desk and our patient care team. The first voice you'll hear on the phone and the last face you'll see before leaving — your go-to person for anything.",
    fullBio: "Sunita runs KPC's patient care team — the front desk, the follow-up calls, the treatment coordination, and the small details that make a clinic feel human. She's a BSc Nursing graduate with an aesthetic nurse certification, and she's been with KPC for 8 years. She's the first voice you'll hear when you call, the person who confirms your appointment, and the last face you'll see before you leave. If you have a question about anything — billing, scheduling, aftercare, or just 'is this normal?' — Sunita is your go-to person.",
    education: [
      "BSc Nursing — Tribhuvan University",
      "Aesthetic Nurse Certification — Bangalore, India",
      "Certified in CPR & Basic Life Support",
    ],
    treatments: ["Treatment Coordination", "Patient Follow-up", "Aftercare Guidance"],
    approach: "No question is too small. If something worries you after a treatment — call. I'd rather answer 100 calls about nothing than miss one call about something.",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/edf0e5648f32.jpg",
    experience: "8+ years",
  },
];

// ===== STD/STI Pricing =====
export const STD_STI_PACKAGES = [
  {
    name: "Basic STI",
    price: "NPR 3,500",
    composition: "HIV ab + ag, HBsAg, Anti-HCV, Urine RE/ME",
    tests: 4,
    recommended: false,
  },
  {
    name: "STI R-10",
    price: "NPR 6,500",
    composition: "HIV I&II, HSV-1/2 IgG + IgM, VDRL, TPHA, HBsAg, Anti-HCV, Urine RE/ME",
    tests: 10,
    recommended: true,
  },
  {
    name: "STD Panel 1",
    price: "NPR 13,100",
    composition: "6-test incl. Trichomonas PCR, HSV PCR",
    tests: 6,
    recommended: false,
  },
  {
    name: "STD Panel 2",
    price: "NPR 19,999",
    composition: "Broad PCR + TPHA, includes HPV",
    tests: 8,
    recommended: false,
  },
  {
    name: "STD Panel 3",
    price: "NPR 22,500",
    composition: "Broadest — all of the above",
    tests: 12,
    recommended: false,
  },
];

export const STD_STI_INDIVIDUAL_TESTS = [
  { name: "HIV antibody + antigen", price: "NPR 1,200" },
  { name: "HBsAg (Hepatitis B surface antigen)", price: "NPR 650" },
  { name: "Anti-HCV (Hepatitis C antibody)", price: "NPR 850" },
  { name: "HIV I & II (rapid)", price: "NPR 500" },
  { name: "HSV-1/2 IgG + IgM", price: "NPR 1,500" },
  { name: "VDRL (Syphilis screening)", price: "NPR 400" },
  { name: "TPHA (Syphilis confirmatory)", price: "NPR 700" },
  { name: "Urine RE/ME", price: "NPR 300" },
  { name: "Trichomonas PCR", price: "NPR 2,500" },
  { name: "HSV PCR", price: "NPR 3,200" },
  { name: "HPV DNA PCR", price: "NPR 4,500" },
  { name: "Chlamydia PCR", price: "NPR 2,800" },
  { name: "Gonorrhoea PCR (NG)", price: "NPR 2,800" },
  { name: "Mycoplasma PCR", price: "NPR 3,000" },
  { name: "Ureaplasma PCR", price: "NPR 3,000" },
];

// ===== Treatment pages (dynamic /services/[slug]) =====
export type TreatmentSubsection = {
  heading: string;
  body: string;
  image?: string;
};

export type Treatment = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  heroImage: string;
  tagline: string;
  intro: string;
  comparisonTable?: {
    caption: string;
    columns: string[];
    rows: { label: string; values: string[] }[];
  };
  subsections: TreatmentSubsection[];
  resultsReality: string;
  suitability: {
    ideal: string[];
    notIdeal: string[];
  };
  faq: { q: string; a: string }[];
  pricing: {
    startingPrice: string;
    sessions: string;
    note: string;
  };
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "acne-scar-treatment",
    title: "Acne & Acne Scar Treatment",
    category: "Cosmetic Concerns",
    metaDescription:
      "Acne and acne scar treatment at KPC Skin Clinic Thapathali. FUE, fractional CO2 laser, subcision, chemical peels and TCA cross for boxcar, ice pick and rolling scars. Real results, written plans.",
    heroImage: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    tagline: "Clear active acne and smooth scars with a plan written for your skin.",
    intro:
      "Acne scars are not one condition — they are at least six. Boxcar, ice pick, rolling, hypertrophic, post-inflammatory hyperpigmentation and erythema each respond to different treatments. A single approach (one laser, one peel) will not work for all of them. We diagnose what you actually have, write it down, and treat accordingly.",
    comparisonTable: {
      caption: "Acne scar types and the treatments that work for each",
      columns: ["Scar type", "Appearance", "First-line treatment", "Typical sessions"],
      rows: [
        { label: "Ice pick", values: ["Deep, narrow, V-shaped", "TCA cross / radiofrequency microneedling", "3–5"] },
        { label: "Boxcar", values: ["Wide, square-edged, U-shaped", "Fractional CO2 laser / subcision", "3–5"] },
        { label: "Rolling", values: ["Broad, wave-like, tethered", "Subcision + microneedling", "2–4"] },
        { label: "Hypertrophic", values: ["Raised, firm, on jawline/back", "Intralesional steroid + silicone", "Ongoing"] },
        { label: "PIH (dark marks)", values: ["Flat brown/purple marks", "Chemical peel + topical", "4–6"] },
        { label: "Erythema (red marks)", values: ["Flat red marks", "Vascular laser + time", "3–4"] },
      ],
    },
    subsections: [
      {
        heading: "Fractional CO2 Laser",
        body: "The workhorse for boxcar and atrophic scars. Creates controlled micro-injuries that trigger collagen remodelling. We use a fractional (not fully ablative) approach to minimise downtime — expect 5–7 days of redness and peeling per session.",
        image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
      },
      {
        heading: "Subcision",
        body: "For rolling scars that are tethered beneath the skin. A fine needle releases the fibrous bands pulling the skin down, allowing it to rise back to surface level. Often combined with filler or microneedling for best results.",
      },
      {
        heading: "TCA Cross",
        body: "The gold standard for deep ice-pick scars. High-strength trichloroacetic acid is applied precisely into each scar, triggering localised resurfelling. Done carefully, one scar at a time.",
      },
      {
        heading: "Radiofrequency Microneedling",
        body: "Delivers heat energy at precise depths to stimulate collagen. Good for diffuse atrophic scarring and skin texture refinement. Less downtime than CO2 laser, suitable for darker skin types.",
      },
      {
        heading: "Chemical Peels",
        body: "For active acne and post-inflammatory pigmentation. Salicylic acid for oily/acne-prone skin, glycolic for texture, mandelic for sensitive and darker skin. A series of 4–6 sessions is typical.",
      },
      {
        heading: "Topical & Oral Therapy",
        body: "For active acne that precedes scarring: retinoids, benzoyl peroxide, topical antibiotics, and oral isotretinoin where indicated. We manage the acne first, the scars second.",
      },
    ],
    resultsReality:
      "Realistic improvement is 40–70% reduction in scar visibility after a full course of treatment, not 100% elimination. Anyone promising you perfect skin is lying. The goal is significant, visible improvement that holds up under normal lighting — not studio lighting. We photograph your skin before, during and after so we both measure honestly.",
    suitability: {
      ideal: [
        "Adults with stable acne scars (acne controlled for 6+ months)",
        "Realistic expectations — improvement, not perfection",
        "Able to commit to a 3–6 month treatment timeline",
        "Willing to follow post-treatment sun protection",
      ],
      notIdeal: [
        "Active cystic acne (treat the acne first)",
        "Pregnant or breastfeeding (some treatments contraindicated)",
        "Unrealistic expectations of scar elimination",
        "Unable to avoid sun exposure during treatment",
      ],
    },
    faq: [
      { q: "How many sessions will I need?", a: "Most patients need 3–5 sessions of their primary treatment (e.g. fractional CO2 laser) spaced 4–6 weeks apart, plus supportive treatments. We give you a written plan after the first consultation." },
      { q: "Does it hurt?", a: "We use topical numbing cream for all laser and microneedling procedures. Most patients describe it as uncomfortable, not painful. TCA cross and subcision use local anaesthetic." },
      { q: "What's the downtime?", a: "Fractional CO2: 5–7 days redness/peeling. Microneedling: 1–2 days redness. Peels: 2–3 days flaking. TCA cross: 7–10 days per scar. We schedule around your life." },
      { q: "Can you treat dark skin?", a: "Yes — we adjust laser settings, use radiofrequency microneedling instead of CO2 where appropriate, and prefer mandelic/salicylic peels. Dark skin needs more sessions, not fewer, and careful energy settings." },
      { q: "Will my scars come back?", a: "Treated scars do not return. New scars can form if acne recurs — which is why we manage active acne first. We give you a maintenance skincare plan to prevent new breakouts." },
      { q: "How much does it cost?", a: "Starting from NPR 3,500 per session for peels, NPR 8,000+ for fractional CO2 laser, NPR 6,000+ for microneedling. A full course of 5 sessions typically ranges NPR 25,000–60,000 depending on the combination. Written quote provided before any treatment." },
      { q: "Are the results permanent?", a: "The collagen remodelling is permanent. Your skin continues to age normally. Sun protection and a basic skincare routine preserve results for years." },
      { q: "Can I combine this with other treatments?", a: "Yes — and we often recommend it. Acne scar treatment pairs well with HydraFacial (maintenance), PRP face (collagen boost), and topical retinoids (ongoing). Your doctor will sequence these." },
      { q: "What if I'm not happy with the result?", a: "Every treatment plan has a written expected outcome. If results fall short of that expectation due to our work, we continue treatment at no additional charge until the agreed outcome is reached." },
    ],
    pricing: {
      startingPrice: "NPR 3,500+",
      sessions: "3–5 sessions typical",
      note: "Combination programs available. Written quote before any treatment.",
    },
  },
  // ---- Hair Transplant ----
  {
    slug: "hair-transplant",
    title: "Hair Transplant (FUE)",
    category: "Hair Transplant",
    metaDescription:
      "FUE hair transplant at KPC Skin Clinic Thapathali. Natural density, permanent results, experienced surgeons. Beard and eyebrow transplant available. Written graft count and price before surgery.",
    heroImage: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    tagline: "Natural, permanent hair restoration — performed by doctors, not technicians.",
    intro:
      "Follicular Unit Extraction (FUE) is the modern gold standard for hair restoration. Individual follicular units are harvested from the donor area (back of the scalp) and implanted one by one into the recipient area. No linear scar, fast recovery, and natural-looking density when done by an experienced surgeon.",
    subsections: [
      { heading: "Consultation & Planning", body: "We assess your hair loss pattern (Norwood scale), donor density, and scalp laxity. We map out the recipient area, design a natural hairline, and give you a written graft count and price before you commit." },
      { heading: "Donor Harvesting", body: "Individual follicular units (1–4 hairs each) are extracted using a 0.8–0.9mm punch. No linear scar, no stitches. The donor area heals in days, not weeks." },
      { heading: "Slit Making & Implantation", body: "The surgeon makes recipient sites at the precise angle, direction and density to mimic natural hair growth. This is the step that determines naturalness — and it is done by the surgeon, not a technician." },
      { heading: "Graft Survival Protocol", body: "Grafts are stored in a holding solution at controlled temperature. We use a 'no-touch' implantation technique to maximise survival. Our graft survival rate exceeds 95%." },
      { heading: "Post-Op Care", body: "Detailed written aftercare. First hair wash at the clinic on day 3. Shedding phase at 2–4 weeks. New growth starts at 3–4 months. Final result visible at 12 months." },
      { heading: "Beard & Eyebrow Transplant", body: "The same FUE technique applied to beard, moustache and eyebrow restoration. Used for patchy beards, scar camouflage, and over-plucked eyebrows." },
    ],
    resultsReality:
      "Hair transplant is surgery, not magic. You will see shedding at 2–4 weeks (this is normal), then nothing for 2 months, then gradual growth. Final density is visible at 12 months. We photograph and measure at every stage. A transplant restores hair in bald areas — it does not stop ongoing hair loss. You may need medical therapy (finasteride/minoxidil) to keep the rest.",
    suitability: {
      ideal: [
        "Men with Norwood III–VII pattern hair loss",
        "Adequate donor density at the back of the scalp",
        "Stable hair loss for 6+ months",
        "Realistic expectations about timeline (12 months to final result)",
      ],
      notIdeal: [
        "Active, rapid hair loss (stabilise first with medication)",
        "Very poor donor density (we'll tell you if you're not a candidate)",
        "Unrealistic expectations of a full head of teenage hair",
        "Under 25 with progressive loss (we may defer)",
      ],
    },
    faq: [
      { q: "Is FUE better than FUT?", a: "FUE leaves no linear scar and has faster recovery. FUT can yield more grafts in one session. We offer FUE as the default; FUT is available for very large sessions. The surgeon recommends based on your case." },
      { q: "How many grafts do I need?", a: "Depends on the area: hairline ~1,500–2,000, frontal third ~2,500–3,500, full top ~4,000–6,000. We give you a written count and price after assessment." },
      { q: "Does it hurt?", a: "Local anaesthetic makes the procedure painless. Post-op pain is mild — paracetamol for 1–2 days. Most patients return to work in 3–5 days." },
      { q: "Will the transplanted hair fall out?", a: "No. Donor hair is genetically resistant to DHT (the hormone that causes hair loss). It grows for life. However, your existing non-transplanted hair may continue to thin — we manage this with medication." },
      { q: "How long until I see results?", a: "Shedding at 2–4 weeks. New growth at 3–4 months. Noticeable density at 6–8 months. Final result at 12 months." },
      { q: "Can women get hair transplants?", a: "Yes, for female pattern hair loss and certain scarring alopecias. The technique differs (more diffuse, lower hairline). Dr. Sneha assesses female candidates." },
      { q: "What does it cost?", a: "Starting from NPR 60,000, priced per graft. A typical session of 2,500–3,500 grafts ranges NPR 1,50,000–2,50,000. Written quote before surgery, EMI available." },
      { q: "Do you guarantee results?", a: "We guarantee graft survival (>95%) and surgical technique. We cannot guarantee the final aesthetic density, as it depends on your biology and aftercare." },
      { q: "Can I shave my head after?", a: "Yes, after full healing (4 weeks). FUE leaves no linear scar, so short cuts are fine." },
    ],
    pricing: {
      startingPrice: "NPR 60,000+",
      sessions: "Single session (8–10 hours)",
      note: "Priced per graft. Written graft count and quote before surgery. EMI available.",
    },
  },
  // ---- Beard Transplant ----
  {
    slug: "beard-transplant",
    title: "Beard Transplant",
    category: "Hair Transplant",
    metaDescription:
      "Beard transplant at KPC Skin Clinic Thapathali. FUE technique to fill patchy beards, moustache and sideburns. Natural angle and density. Written graft count before surgery.",
    heroImage: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2eebe27adf.jpg",
    tagline: "Fill patchy beards with your own hair — natural angle, permanent result.",
    intro:
      "Beard transplant uses the same FUE technique as hair transplant, but the artistry is in the angle and direction of implantation. Facial hair grows at a flatter, more acute angle than scalp hair, and the surgeon places each graft to match your natural beard pattern.",
    subsections: [
      { heading: "Assessment", body: "We map the areas to fill — moustache, chin, sideburns, jawline. We assess donor hair quality from the scalp." },
      { heading: "Donor Harvesting", body: "Follicles harvested from the back of the scalp using FUE. Scalp hair is slightly finer but blends naturally with beard hair." },
      { heading: "Implantation", body: "Grafts implanted at a 30–45 degree angle to match natural beard growth direction. Density is built up gradually to avoid a 'pluggy' look." },
      { heading: "Recovery", body: "Redness for 3–5 days. Shedding at 2–4 weeks. New growth at 3–4 months. Full beard at 9–12 months. You can shave after 4 weeks." },
    ],
    resultsReality:
      "A beard transplant fills gaps; it does not create a forest where none was meant to grow. Final density matches your genetic potential. The transplanted hair is permanent and grows like a normal beard — shave, trim, style as you wish.",
    suitability: {
      ideal: [
        "Men with patchy beards but adequate donor hair",
        "Scarring from acne or injury in the beard area",
        "Stable expectations (need 9–12 months for full result)",
      ],
      notIdeal: [
        "Active folliculitis (treat infection first)",
        "Very sparse body hair and poor scalp donor",
        "Expecting overnight results",
      ],
    },
    faq: [
      { q: "Will the transplanted beard hair grow like normal?", a: "Yes. Once it starts growing (3–4 months), it grows like your natural beard — same texture, same growth rate. Shave, trim, style freely." },
      { q: "Does it look natural?", a: "The angle and direction of implantation is the key. Our surgeon places each graft individually at the natural beard angle (30–45 degrees, flat to the skin). No 'pluggy' look." },
      { q: "How many grafts for a full beard?", a: "Moustache ~300–500, chin ~500–800, full beard ~1,500–2,500. Written count after assessment." },
      { q: "Can I shave after the transplant?", a: "Wait 4 weeks for full healing, then shave or trim normally. The transplanted hair regrows." },
      { q: "What does it cost?", a: "Starting from NPR 45,000, priced per graft. A typical beard session of 1,000–1,500 grafts ranges NPR 60,000–1,20,000." },
    ],
    pricing: {
      startingPrice: "NPR 45,000+",
      sessions: "Single session (4–6 hours)",
      note: "Priced per graft. Written quote before surgery.",
    },
  },
];

// Helper: get a treatment by slug
export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

// All treatment slugs for the dynamic route
export const ALL_TREATMENT_SLUGS = TREATMENTS.map((t) => t.slug);

// Lightweight data for the remaining treatments (those without full template content yet).
// These use the shared template with generated content.
export const REMAINING_TREATMENT_SLUGS: { slug: string; title: string; category: string }[] = [
  { slug: "eyebrow-transplant", title: "Eyebrow Transplant", category: "Hair Transplant" },
  { slug: "dandruff-scalp-treatment", title: "Dandruff & Scalp Treatment", category: "Hair Clinic" },
  { slug: "gfc-treatment", title: "GFC Treatment", category: "Hair Clinic" },
  { slug: "prp-hair-treatment", title: "PRP Hair Treatment", category: "Hair Clinic" },
  { slug: "hair-loss-treatment", title: "Hair Loss Treatment", category: "Hair Clinic" },
  { slug: "minoxidil-finasteride", title: "Minoxidil / Finasteride Treatment", category: "Hair Clinic" },
  { slug: "laser-hair-removal", title: "Laser Hair Removal", category: "Laser" },
  { slug: "fractional-co2-laser", title: "Fractional CO2 Laser", category: "Laser" },
  { slug: "tattoo-removal", title: "Tattoo Removal", category: "Laser" },
  { slug: "open-pores-oily-skin", title: "Open Pores & Oily Skin", category: "Cosmetic Concerns" },
  { slug: "melasma-treatment", title: "Melasma Treatment", category: "Cosmetic Concerns" },
  { slug: "vitiligo-treatment", title: "Vitiligo Treatment", category: "Cosmetic Concerns" },
  { slug: "dark-circles-treatment", title: "Dark Circles Treatment", category: "Cosmetic Concerns" },
  { slug: "freckles-discolouration", title: "Freckles & Discolouration", category: "Cosmetic Concerns" },
  { slug: "hydrafacial", title: "HydraFacial", category: "Aesthetic" },
  { slug: "chemical-peeling", title: "Chemical Peeling", category: "Aesthetic" },
  { slug: "carbon-laser-peel", title: "Carbon Laser Peel", category: "Aesthetic" },
  { slug: "botox-treatment", title: "Botox Treatment", category: "Aesthetic" },
  { slug: "microneedling", title: "Microneedling", category: "Aesthetic" },
  { slug: "hifu", title: "HIFU (High-Intensity Focused Ultrasound)", category: "Aesthetic" },
  { slug: "dermal-fillers", title: "Dermal Fillers", category: "Aesthetic" },
  { slug: "facials", title: "Facial Treatments", category: "Aesthetic" },
  { slug: "prp-face-treatment", title: "PRP – Face Treatment", category: "Aesthetic" },
  { slug: "mole-removal", title: "Mole Removal", category: "Aesthetic" },
  { slug: "weight-loss-body-sculpting", title: "Weight Loss / Body Sculpting", category: "Aesthetic" },
  { slug: "anti-ageing-surgery", title: "Anti-Ageing Surgery", category: "Surgery" },
  { slug: "plastic-surgery", title: "Plastic Surgery", category: "Surgery" },
  { slug: "rhinoplasty", title: "Rhinoplasty", category: "Surgery" },
  { slug: "blepharoplasty", title: "Blepharoplasty (Upper & Lower)", category: "Surgery" },
  { slug: "scar-revision", title: "Scar Revision", category: "Surgery" },
];

// ===== Blog articles (full content for /blog/[slug]) =====
export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "is-hair-transplant-right-for-you",
    title: "Is a hair transplant right for you? An honest checklist.",
    excerpt:
      "Before you spend NPR 2 lakh on a transplant, read this. We break down who benefits, who should wait, and who should never have one.",
    date: "20 Sep 2026",
    author: "Dr. Rupak Maharjan",
    category: "Hair Transplant",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08c48029878f.jpg",
    readTime: "6 min read",
    body: `Hair transplant is surgery, not magic. It's also the most effective permanent solution for hair loss — when it's done on the right person, at the right time, by the right surgeon.

This article is a checklist. If you're considering a transplant, read it before you book a consultation. It will save you money and disappointment.

## Who benefits from a hair transplant

A hair transplant works best for men with **stable, patterned hair loss** (Norwood III to VII). "Stable" means your hair loss has roughly plateaued for 6+ months. "Patterned" means it follows the classic male baldness pattern — receding hairline, thinning crown, or both.

You also need **adequate donor hair**. The back and sides of your scalp are genetically resistant to DHT (the hormone that causes hair loss). If your donor area is dense and healthy, we can harvest follicles from there and implant them where you've lost hair. The transplanted hair is permanent — it grows for life.

## Who should wait

If your hair loss is **rapid and active**, a transplant now is premature. You'll get density in the transplanted area, but the surrounding native hair will continue to thin — leaving you with an unnatural "island" of transplanted hair. We'd rather stabilise your loss first (with finasteride/minoxidil) and transplant later.

If you're **under 25 with aggressive loss**, we usually defer. Pattern baldness at 22 often means severe baldness by 30. Transplanting too early uses up your donor supply before we know the final pattern.

## Who should never have one

If your donor area is **very sparse** (diffuse unpatterned alopecia), there isn't enough healthy hair to harvest. We'll tell you this honestly — a good surgeon will turn you away.

If you have **alopecia areata, lichen planopilaris, or frontal fibrosing alopecia** — these are inflammatory conditions that destroy follicles. Transplanting into an active inflammatory area is a waste of grafts. Treat the inflammation first.

If you expect a **full head of teenage hair back**, a transplant can't deliver that. It restores hair in bald areas; it doesn't give you the density of a 16-year-old.

## The honest checklist

1. Is your hair loss stable (6+ months)?
2. Is it patterned (not patchy)?
3. Is your donor area dense?
4. Are you over 25 (or have stable loss if younger)?
5. Are your expectations realistic (improvement, not perfection)?
6. Can you take 8–10 hours for surgery and 5–7 days to recover?
7. Can you wait 12 months for the final result?
8. Are you willing to take finasteride/minoxidil to keep your existing hair?

If you answered yes to all 8, book a consultation. If you answered no to any, come anyway — we'll tell you what to do instead.`,
  },
  {
    slug: "acne-scar-types-explained",
    title: "Acne scars are six different conditions. Here's how we treat each.",
    excerpt:
      "Ice pick, boxcar, rolling, hypertrophic, PIH, erythema — each responds to different treatments. A single laser won't fix all of them.",
    date: "15 Sep 2026",
    author: "Dr. Sneha Shrestha",
    category: "Acne & Scars",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    readTime: "8 min read",
    body: `Most patients who come to me for "acne scar treatment" expect a single procedure — usually a laser — to fix everything. The truth is that acne scars are at least six different conditions, and each responds to a different treatment. A fractional CO2 laser that works beautifully on boxcar scars will do nothing for an ice pick scar.

This article explains the six types and what works for each. If you have acne scars, this is what your consultation should cover.

## 1. Ice pick scars

These are deep, narrow, V-shaped scars that look like large open pores. They extend into the dermis. **First-line treatment: TCA cross** (trichloroacetic acid chemical reconstruction of skin scars). High-strength TCA is applied precisely into each scar, triggering localised resurfelling. Done carefully, one scar at a time. Radiofrequency microneedling also helps.

## 2. Boxcar scars

Wide, square-edged, U-shaped depressions. **First-line: fractional CO2 laser** and/or subcision. The laser creates controlled micro-injuries that trigger collagen remodelling. Expect 5–7 days of redness per session, 3–5 sessions for significant improvement.

## 3. Rolling scars

Broad, wave-like depressions that make the skin look uneven. They're caused by fibrous bands tethering the skin down. **First-line: subcision** — a fine needle releases the bands, allowing the skin to rise. Often combined with filler or microneedling.

## 4. Hypertrophic scars

Raised, firm scars — usually on the jawline, chest, or back. **First-line: intralesional steroid injections** plus silicone gel sheeting. These scars over-produce collagen; steroids calm that down. Ongoing treatment, not one-and-done.

## 5. Post-inflammatory hyperpigmentation (PIH)

Flat brown or purple marks left after acne heals. These are not "scars" in the structural sense — they're pigment. **First-line: chemical peels** (salicylic or glycolic) plus a prescription topical (azelaic acid, hydroquinone, or retinoid). Fades over 4–6 sessions.

## 6. Post-inflammatory erythema (PIE)

Flat red marks — caused by dilated blood vessels near the surface. **First-line: vascular laser** (pulsed dye laser or IPL). Also responds to time — PIE fades on its own over 6–12 months, but laser speeds it up.

## Why a single treatment won't work

If you have three ice pick scars, two boxcar scars, and some PIH — no single device treats all of them. You need TCA cross for the ice pick, fractional CO2 for the boxcar, and a peel for the PIH. A clinic that offers "one laser for all your scars" is either lying or doesn't understand the difference.

## What to expect at your consultation

I will examine your skin under good lighting, identify which scar types you have, and write down a treatment plan that names each scar type and the treatment for it. I'll give you a realistic expectation — typically 40–70% improvement, not 100% elimination. And I'll photograph your skin so we can measure honestly, month by month.

Book a consultation if you're ready. If you're not, come for a 15-minute orientation chat — it's free.`,
  },
  {
    slug: "laser-hair-removal-myths",
    title: "Five laser hair removal myths we hear every week — debunked.",
    excerpt:
      "Does it hurt? Does it work on dark skin? Is it permanent? We answer the questions we get asked most often.",
    date: "8 Sep 2026",
    author: "Dr. Sneha Shrestha",
    category: "Laser",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e150530fd2cf.jpg",
    readTime: "5 min read",
    body: `Laser hair removal is one of our most popular treatments — and one of the most misunderstood. Here are the five myths we hear every week, and the truth behind each.

## Myth 1: "Laser hair removal is permanent after one session"

**Reality:** No. Hair grows in cycles (anagen, catagen, telogen). Laser only effectively treats hair in the active growth (anagen) phase — about 20–30% of your hair at any time. That's why you need 6–8 sessions, spaced 4–8 weeks apart, to catch each cycle. After a full course, you'll see 80–90% permanent reduction. Maintenance sessions (1–2 per year) keep it that way.

## Myth 2: "Laser doesn't work on dark skin"

**Reality:** It does — but you need the right laser. Older Nd:YAG lasers were designed specifically for darker skin types (Fitzpatrick IV–VI) because they bypass the melanin in the skin and target the hair follicle directly. At KPC we use a diode laser with adjustable settings that works safely on all skin types. Dark skin needs more sessions and lower energy, not fewer and higher.

## Myth 3: "Laser hurts a lot"

**Reality:** Modern lasers have built-in cooling tips that numb the skin as they work. Most patients describe the sensation as a rubber band snap — uncomfortable, not painful. Sensitive areas (bikini, upper lip) are more sensitive than arms or legs. We apply numbing cream for sensitive areas on request.

## Myth 4: "Laser causes cancer"

**Reality:** No. Laser hair removal uses non-ionising radiation — the same type of light energy as a lightbulb, just focused. It does not damage DNA or cause cancer. The wavelengths used (800–1064nm) penetrate only 1–4mm into the skin, reaching the hair follicle but not deeper tissue.

## Myth 5: "Laser is the same as waxing"

**Reality:** Waxing pulls hair out by the root — it grows back in 3–6 weeks. Laser destroys the follicle's ability to produce hair — permanently. Waxing is temporary; laser is permanent reduction. The upfront cost of laser is higher, but over 5 years (vs. monthly waxing), laser is cheaper.

## The honest summary

Laser hair removal works. It's one of the most evidence-based aesthetic treatments available. It's not magic — you need multiple sessions, some maintenance, and realistic expectations. But for most people, it's a genuinely life-changing treatment.

Book a free patch test to see how your skin responds.`,
  },
  {
    slug: "prp-vs-gfc-for-hair",
    title: "PRP vs GFC for hair loss: which is actually better?",
    excerpt:
      "Both use your own blood. Both claim to regrow hair. We explain the difference in cost, process, and evidence.",
    date: "1 Sep 2026",
    author: "Dr. Anil Shakya",
    category: "Hair Clinic",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    readTime: "6 min read",
    body: `PRP (Platelet-Rich Plasma) and GFC (Growth Factor Concentrate) are two hair loss treatments that both use your own blood. Patients ask me every week which is better. The honest answer: they're similar in effectiveness, but differ in process, cost, and convenience.

## What is PRP?

PRP involves drawing about 20–30ml of your blood, centrifuging it to separate the platelet-rich plasma, and injecting it into your scalp. The platelets release growth factors that stimulate dormant hair follicles. PRP has been used for 15+ years and has good clinical evidence behind it.

## What is GFC?

GFC is a newer technique. We draw a smaller amount of blood (about 10–16ml), use a special kit to extract a concentrated growth factor solution, and inject it. The key difference: GFC removes red and white blood cells (which can cause inflammation) and delivers a higher concentration of pure growth factors.

## The comparison

**Effectiveness:** Both work. Studies show 30–40% improvement in hair density after 3–4 sessions of either. GFC may have a slight edge in hair calibre (thickness) but the difference is not dramatic. Anyone claiming one is dramatically better than the other is selling you something.

**Sessions:** Both require 3–4 initial sessions, spaced 3–4 weeks apart, then maintenance every 6 months.

**Process time:** PRP takes about 45 minutes. GFC takes about 60 minutes (the kit processing takes longer).

**Cost:** PRP is NPR 8,000 per session. GFC is NPR 6,000 per session — it's slightly cheaper because the kit is more efficient with less blood.

**Pain:** Both involve scalp injections with a very fine needle. We use numbing cream. Most patients describe it as mild discomfort.

## Which should you choose?

If cost is your concern: **GFC** is slightly cheaper and equally effective.

If you want the most-established treatment: **PRP** has 15+ years of evidence; GFC is newer (5–6 years).

If you have a low pain tolerance: **GFC** uses fewer injections (smaller volume).

If your hair loss is early-stage: either works. We usually start with GFC and switch to PRP if response is slow.

## What neither will do

Neither PRP nor GFC will regrow hair in completely bald areas. They stimulate thinning follicles — they don't create new ones. If you have a smooth bald spot (no vellus hair), the only option is a hair transplant.

Both treatments also need to be combined with medical therapy (finasteride/minoxidil) for best results. Injections alone won't stop the underlying hormone-driven hair loss.

Book a consultation and we'll tell you honestly which (if either) is right for your specific case.`,
  },
  {
    slug: "rhinoplasty-recovery-timeline",
    title: "Rhinoplasty recovery: what to expect week by week.",
    excerpt:
      "From day 1 swelling to month 12 final shape — a surgeon's honest guide to what happens after nose surgery.",
    date: "25 Aug 2026",
    author: "Dr. Rajesh Maharjan",
    category: "Surgery",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05f6a1478943.jpg",
    readTime: "7 min read",
    body: `Rhinoplasty (nose surgery) is one of the most common cosmetic procedures we perform — and the one patients ask most about recovery. Here's an honest, week-by-week timeline of what to expect.

## Day 1–2: The hard part

You'll wake up with a splint on your nose and packing inside (we remove packing on day 2). Your face will be swollen, especially around the eyes — bruising is common. You'll breathe through your mouth. Pain is moderate — managed with oral painkillers. Sleep elevated, don't blow your nose, and don't wear glasses.

## Week 1: Splint on

We remove the splint at day 7. This is the moment patients see the initial result — but it's not the final shape. Swelling is still significant, especially at the tip. Bruising has mostly faded. You can return to work (desk job) at day 7–10, but you'll look "puffy."

## Weeks 2–4: Visible improvement

Swelling reduces noticeably. Most people won't notice you had surgery by week 3, but you will — the tip still feels firm and slightly swollen. Avoid strenuous exercise, contact sports, and sun exposure. Don't wear heavy glasses.

## Months 1–3: The long middle

Swelling continues to reduce slowly. The tip starts to soften. You'll see 60–70% of the final result by month 3. This is when patients sometimes worry — "Is it still swollen?" Yes, it is. This is normal.

## Months 3–6: Refining

The bridge settles. The tip definition improves. 80% of the final result is visible. Fine details emerge.

## Months 6–12: Final shape

The last 20% of swelling resolves. The tip reaches its final definition. The skin re-drapes fully. **Month 12 is the "final result" we photograph for your records.**

## What affects your recovery

- **Skin thickness:** Thick skin takes longer to show the final result (12+ months). Thin skin shows results sooner but reveals every underlying detail.
- **Open vs closed:** Open rhinoplasty (with an incision at the columella) has slightly more tip swelling. Closed has less.
- **Grafts:** If we used cartilage grafts (for tip support or bridge building), swelling lasts longer.
- **Your biology:** Some people heal in 6 months; others take 14. We can't speed this up.

## What to avoid

- Blowing your nose for 2 weeks
- Strenuous exercise for 3 weeks
- Contact sports for 6 weeks
- Glasses resting on the bridge for 4 weeks
- Sun exposure without SPF 50 for 6 months

## The honest summary

Rhinoplasty recovery is a marathon, not a sprint. The first week is uncomfortable. The first month looks "puffy." The final result takes a year. If you can't commit to that timeline, this isn't the right procedure for you.

Book a consultation and I'll show you real before-and-after timelines from our patients — not the best ones, but the typical ones.`,
  },
  {
    slug: "hydrafacial-vs-chemical-peel",
    title: "HydraFacial vs chemical peel: which should you choose?",
    excerpt:
      "Both exfoliate. Both give you a glow. But they work differently and suit different skin types. Here's how to decide.",
    date: "18 Aug 2026",
    author: "Dr. Priya Karki",
    category: "Aesthetic",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f594f0615e20.jpg",
    readTime: "5 min read",
    body: `HydraFacial and chemical peels are two of our most popular treatments. Both exfoliate, both give you a glow, and patients often ask which they should choose. The answer depends on your skin, your goals, and your timeline.

## What is a HydraFacial?

A HydraFacial is a three-step medical-grade treatment: cleanse and exfoliate, extract impurities, and hydrate. It uses a specialised vortex device to do all three in one session. There's no downtime — you walk out glowing. A session takes 30–45 minutes.

**Best for:** Instant glow before an event, maintenance between deeper treatments, sensitive skin, first-time facial patients.

**Not for:** Deep acne scarring, significant pigmentation, anyone wanting dramatic results from one session.

## What is a chemical peel?

A chemical peel applies an acid solution (salicylic, glycolic, mandelic, or TCA) to the skin, causing controlled exfoliation. The top layer sheds over 3–7 days, revealing smoother skin underneath. Peels range from superficial (no downtime) to deep (1–2 weeks recovery).

**Best for:** Acne, pigmentation, uneven texture, acne scars, oily skin. Peels are "active" treatments — they change the skin, not just refresh it.

**Not for:** The day before your wedding, very sensitive skin (choose mandelic), anyone who can't avoid sun exposure during healing.

## The comparison

| | HydraFacial | Chemical Peel |
|---|---|---|
| **Downtime** | None | 2–7 days flaking |
| **Pain** | None | Mild tingling |
| **Results** | Instant glow, lasts 1–2 weeks | Gradual, lasts months |
| **Best for** | Maintenance, events | Active skin concerns |
| **Cost** | NPR 4,500 | NPR 3,000+ |
| **Frequency** | Monthly | Every 4–6 weeks |

## Which should you choose?

**Choose HydraFacial if:** You want a glow for a specific event. You have sensitive skin. You're new to facials. You want zero downtime. You want maintenance between peels.

**Choose a peel if:** You have active acne. You have pigmentation. You want to improve texture over time. You can handle 3–5 days of flaking. You're treating a specific skin concern.

**Choose both:** Many of our patients do a monthly HydraFacial for maintenance and a series of peels (4–6, spaced monthly) for active treatment. They complement each other — the peel does the work, the HydraFacial maintains the result.

## The honest take

Neither is "better." They do different things. If you're unsure, book a consultation — we'll look at your skin and recommend the right one (or both, sequenced correctly).

Don't choose based on price alone. A NPR 3,000 peel that's right for your skin is better value than a NPR 4,500 HydraFacial that doesn't address your concern.`,
  },
];
