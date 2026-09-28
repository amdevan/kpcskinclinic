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
