// Centralized site content for KPC Skin Hair & Aesthetic Clinic
// Site copy modeled on the original KPC clinic brand.

export type ServiceItem = {
  title: string;
  href: string;
  description: string;
};

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
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
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
    accent: "from-brand/80 to-brand",
  },
  {
    title: "Plastic Surgery",
    description:
      "Refined cosmetic and reconstructive procedures performed by board-certified plastic surgeons.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2daf75b22fb4.jpg",
    href: "#services",
    accent: "from-gold/80 to-gold",
  },
  {
    title: "Acne & Acne Scars",
    description:
      "Clear active acne and smooth acne scars with clinically proven, personalized protocols.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f2f4132eed2f.jpg",
    href: "#services",
    accent: "from-brand/70 to-ink",
  },
  {
    title: "Hair Loss Treatment",
    description:
      "Diagnosis-driven plans combining medical therapy, PRP, GFC and lifestyle guidance.",
    image:
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8bbcc4c8c06c.jpg",
    href: "#services",
    accent: "from-ink/80 to-brand",
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
  mobile: "+977-9800000000",
  mobileHref: "tel:+9779800000000",
  whatsapp: "https://wa.me/9779800000000",
  email: "info@kpcskin.com",
  emailHref: "mailto:info@kpcskin.com",
  address: "Maharajgunj, Kathmandu, Nepal 44600",
  addressMapHref: "https://maps.google.com/?q=Maharajgunj+Kathmandu",
  hours: [
    { day: "Sunday – Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "#", handle: "@kpcskin" },
    { label: "Facebook", href: "#", handle: "KPC Skin Clinic" },
    { label: "TikTok", href: "#", handle: "@kpcskin" },
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
