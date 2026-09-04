/* ------------------------------------------------------------------ */
/*  Content model — Olowomakan Esther Bukola portfolio                 */
/* ------------------------------------------------------------------ */

export const IMG = {
  /** Local photo — lives in public/img/buk.jpeg */
  portrait: "./img/buk.jpeg",
  /** Fallback used automatically if buk.jpeg is not found. */
  portraitRemote:
    "https://image.qwenlm.ai/generated-images/9b7f2d14-5301-45b7-8310-df0b3938b59c/_result.png",
  bramble:
    "https://image.qwenlm.ai/generated-images/5051024a-f111-4152-905c-8a4770145914/_result.png",
  newsletter:
    "https://image.qwenlm.ai/generated-images/afb52df4-7529-4f59-9133-8bf3190a3b9f/_result.png",
  flyer:
    "https://image.qwenlm.ai/generated-images/c60e4938-0eb8-4f23-bb5b-d7cc906cba1d/_result.png",
  brand:
    "https://image.qwenlm.ai/generated-images/f08bf2f3-63fd-4bcd-9135-aa8f0978f687/_result.png",
  banner:
    "https://image.qwenlm.ai/generated-images/268d9c95-49ed-4edc-98b4-9156f012f887/_result.png",
  nugget:
    "https://image.qwenlm.ai/generated-images/422cafe9-d3b2-458f-bc3c-429c1fa5ab50/_result.png",
  video:
    "https://image.qwenlm.ai/generated-images/fc522498-c5ad-4f4c-ab3c-3bb8fa7805e8/_result.png",
};

export const CONTACT = {
  name: "Olowomakan Esther Bukola",
  email: "esther.olowomakan@gmail.com",
  phone1: "+234 814 590 4088",
  phone2: "+234 701 492 1004",
  location: "Ikorodu, Lagos State, Nigeria",
  coords: "6.6191° N — 3.5123° E",
};

/** First professional role started Oct 2021 — used to derive honest stats. */
export const CAREER_START = new Date(2021, 9, 1);

export function yearsOfExperience(): number {
  return Math.max(1, Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000)));
}

/* ---------------- navigation --------------------------------------- */
export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "insights", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
];

export const FOOTER_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "case-studies", label: "Case Studies" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "insights", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/* ---------------- services / professional focus ------------------- */
export type Service = {
  no: string;
  title: string;
  kicker: string;
  desc: string;
  tags: string[];
  icon: "pen" | "chat" | "chip";
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    no: "01",
    title: "Graphic Design & Digital Media",
    kicker: "Primary specialization",
    desc: "Visually engaging design that helps organizations communicate ideas, promote activities, strengthen brands, and connect with their audiences — from a single post to a full campaign system.",
    tags: [
      "Social media graphics",
      "Flyers & posters",
      "Banners",
      "Brochures",
      "Newsletters",
      "Event materials",
      "Branding materials",
      "Publication design",
      "Digital campaigns",
      "Blog graphics",
      "Ad creatives",
    ],
    icon: "pen",
    featured: true,
  },
  {
    no: "02",
    title: "Customer Service & Communications",
    kicker: "People & message",
    desc: "Clear, empathetic communication that turns audiences into communities — managing relationships, coordinating stakeholders, and keeping every public touchpoint on-brand.",
    tags: [
      "Customer relationship management",
      "Stakeholder communication",
      "Social media communication",
      "Content creation",
      "Community engagement",
      "Volunteer engagement",
      "Digital communication",
    ],
    icon: "chat",
  },
  {
    no: "03",
    title: "IT Support & Print Operations",
    kicker: "Technical backbone",
    desc: "Hands-on production experience — from preparing files for large-format output and ID card machines to keeping the digital workplace running without hiccups.",
    tags: [
      "Technical support",
      "Microsoft Office",
      "Printing operations",
      "Large-format printing",
      "ID card production",
      "IT troubleshooting",
      "Digital workplace support",
    ],
    icon: "chip",
  },
];

/* ---------------- tools -------------------------------------------- */
export type Tool = {
  name: string;
  icon: "ps" | "canva" | "figma" | "capcut" | "office" | "press";
};

export const TOOLS: Tool[] = [
  { name: "Adobe Photoshop", icon: "ps" },
  { name: "Canva", icon: "canva" },
  { name: "Figma", icon: "figma" },
  { name: "CapCut", icon: "capcut" },
  { name: "MS Office Suite", icon: "office" },
  { name: "Print Press & Large Format", icon: "press" },
];

/* ---------------- gallery / selected works ------------------------ */
export type GalleryCat =
  | "Social Media"
  | "Print Design"
  | "Branding"
  | "Video & Motion";

export type GalleryItem = {
  id: string;
  title: string;
  org: string;
  cat: GalleryCat;
  year: string;
  img: string;
  ratio: string;
  study: {
    type: string;
    objective: string;
    deliverables: string[];
    tools: string[];
    impact: string;
  };
};

export const GALLERY: GalleryItem[] = [
  {
    id: "bramble-summit",
    title: "Volunteer Summit '25",
    org: "Bramble Network",
    cat: "Social Media",
    year: "2024",
    img: IMG.bramble,
    ratio: "aspect-[4/3]",
    study: {
      type: "Social media campaign",
      objective:
        "Drive awareness, volunteer sign-ups and fundraising momentum for Bramble Network's flagship summit through a consistent stream of bold campaign visuals.",
      deliverables: [
        "Instagram & Facebook campaign creatives",
        "Volunteer recruitment ads",
        "Event announcement series",
        "Fundraising appeal graphics",
      ],
      tools: ["Adobe Photoshop", "Canva"],
      impact:
        "Contributed to measurable audience growth, higher volunteer turnout and award-recognised organisational campaigns.",
    },
  },
  {
    id: "purity-nugget",
    title: "Purity Is Power — Daily Nuggets",
    org: "Sexual Purity Movement",
    cat: "Social Media",
    year: "2024",
    img: IMG.nugget,
    ratio: "aspect-[4/3]",
    study: {
      type: "Awareness content series",
      objective:
        "Translate values-based messaging into scroll-stopping typographic cards that educate and encourage a young audience, one nugget at a time.",
      deliverables: [
        "Daily motivational quote cards",
        "Educational carousel covers",
        "Scripture & reflection graphics",
        "Story-format variations",
      ],
      tools: ["Canva", "Adobe Photoshop"],
      impact:
        "Built a recognizable daily content ritual that kept the movement top-of-mind and steadily grew community engagement.",
    },
  },
  {
    id: "bwh-newsletter",
    title: "Q3 Newsletter Spread",
    org: "Business Women Hub",
    cat: "Print Design",
    year: "2025",
    img: IMG.newsletter,
    ratio: "aspect-[4/3]",
    study: {
      type: "Newsletter & editorial design",
      objective:
        "Give the Hub's quarterly newsletter a premium editorial voice — structured grids, confident typography and photography that celebrates women in business.",
      deliverables: [
        "12-page newsletter layout",
        "Feature article spreads",
        "Pull-quote & infographic treatments",
        "Print-ready production files",
      ],
      tools: ["Adobe Photoshop", "Canva", "Print vendor coordination"],
      impact:
        "Established a repeatable editorial system now used across the Hub's print and digital publications.",
    },
  },
  {
    id: "shapers-flyer",
    title: "National Summit Flyer",
    org: "Shapers of Nation",
    cat: "Print Design",
    year: "2024",
    img: IMG.flyer,
    ratio: "aspect-[4/3]",
    study: {
      type: "Event outreach material",
      objective:
        "Announce a youth empowerment summit with an expressive torn-paper visual language that feels energetic, national and impossible to ignore.",
      deliverables: [
        "A4 & A5 event flyers",
        "Roll-up banner artwork",
        "Social announcement variants",
        "Daily countdown graphics",
      ],
      tools: ["Adobe Photoshop", "Canva"],
      impact:
        "Supported outreach that filled sessions and gave the summit a consistent visual identity across every touchpoint.",
    },
  },
  {
    id: "brand-system",
    title: "Identity System — Rebrand",
    org: "Women's Enterprise Collective",
    cat: "Branding",
    year: "2025",
    img: IMG.brand,
    ratio: "aspect-[4/3]",
    study: {
      type: "Brand identity & stationery",
      objective:
        "Refresh a growing collective's identity with a minimal geometric mark and a warm, professional palette that scales from business card to banner.",
      deliverables: [
        "Logo suite & mark variations",
        "Business card & letterhead",
        "Envelope & invoice templates",
        "Brand usage one-pager",
      ],
      tools: ["Adobe Photoshop", "Figma", "Canva"],
      impact:
        "Unified every public touchpoint under one confident identity, raising perceived professionalism with partners and funders.",
    },
  },
  {
    id: "ndlea-banner",
    title: "Community Awareness Banner",
    org: "NDLEA Outreach — Ikorodu",
    cat: "Print Design",
    year: "2024",
    img: IMG.banner,
    ratio: "aspect-[4/3]",
    study: {
      type: "Large-format print production",
      objective:
        "Design and produce a street-level awareness banner for a drug-free community campaign — legible at speed, unmistakable up close.",
      deliverables: [
        "12ft × 8ft vinyl banner artwork",
        "Colour & bleed prep for large format",
        "Vendor liaison & print supervision",
        "Installation-ready finishing spec",
      ],
      tools: ["Adobe Photoshop", "Large-format press", "D.I machines"],
      impact:
        "Earned a Certificate of Appreciation from NDLEA for design support to the community outreach campaign.",
    },
  },
  {
    id: "promo-film",
    title: "Behind The Brand — Promo Cut",
    org: "Independent Studio Project",
    cat: "Video & Motion",
    year: "2025",
    img: IMG.video,
    ratio: "aspect-[4/3]",
    study: {
      type: "Short-form video content",
      objective:
        "Show the human side of a creative practice — a fast, warm behind-the-scenes cut built for reels, status and story placements.",
      deliverables: [
        "30s vertical promo edit",
        "Caption & sticker overlays",
        "Cover frames for each platform",
        "Sound-synced cutdowns",
      ],
      tools: ["CapCut", "Canva", "Adobe Photoshop"],
      impact:
        "Gave the studio a repeatable short-form video workflow now applied to client promotional content.",
    },
  },
];

export const CATEGORIES: ("All" | GalleryCat)[] = [
  "All",
  "Social Media",
  "Print Design",
  "Branding",
  "Video & Motion",
];

/* ---------------- featured case studies --------------------------- */
export type CaseStudy = {
  no: string;
  kind: string;
  client: string;
  role: string;
  objective: string;
  responsibilities: string[];
  tools: string[];
  impact: string;
  theme: "forest" | "paper" | "gold";
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    no: "01",
    kind: "Social Media Campaign",
    client: "Bramble Network",
    role: "Graphics Designer / Communications",
    objective:
      "Create engaging visual content that supports organizational communication, audience engagement, volunteer participation, and fundraising initiatives.",
    responsibilities: [
      "Designed campaign graphics end-to-end",
      "Created social media content calendars in visuals",
      "Supported communication & awareness campaigns",
      "Developed promotional visuals for events",
      "Maintained visual consistency across platforms",
      "Collaborated with the comms team on messaging",
    ],
    tools: ["Adobe Photoshop", "Canva"],
    impact:
      "Contributed to organizational growth, stronger audience engagement, active volunteer participation, and recognition through awards.",
    theme: "forest",
  },
  {
    no: "02",
    kind: "Newsletter & Brochure Design",
    client: "Business Women Hub",
    role: "Graphics Designer & Digital Media Associate",
    objective:
      "Create professional visual materials for newsletters, blog posts, websites, social media, and organizational communication.",
    responsibilities: [
      "Designed quarterly newsletters",
      "Created brochure layouts & one-pagers",
      "Developed social media graphic systems",
      "Designed website & blog visuals",
      "Prepared materials for physical printing",
      "Coordinated with external printing vendors",
    ],
    tools: ["Adobe Photoshop", "Canva", "Figma"],
    impact:
      "Delivered a consistent brand voice across print and digital, tightening how the Hub presents itself to members and partners.",
    theme: "paper",
  },
  {
    no: "03",
    kind: "Event Outreach Materials",
    client: "Sexual Purity Movement & Shapers of Nation",
    role: "Graphics Designer / Digital Content Support",
    objective:
      "Develop creative materials that communicate event information clearly and energize grassroots outreach initiatives.",
    responsibilities: [
      "Designed event flyers & handbills",
      "Created large-format banners",
      "Developed daily content nuggets",
      "Produced promotional graphic series",
      "Supported end-to-end event communication",
      "Built digital materials for engagement",
    ],
    tools: ["Adobe Photoshop", "Canva", "CapCut"],
    impact:
      "Kept outreach consistent and visible before, during and after events — strengthening turnout and online conversation.",
    theme: "gold",
  },
];

/* ---------------- experience -------------------------------------- */
export type Role = {
  period: string;
  title: string;
  org: string;
  note: string;
  current?: boolean;
};

export const EXPERIENCE: Role[] = [
  {
    period: "Mar 2025 — Present",
    title: "Graphics Designer & Digital Media Associate",
    org: "Business Women Hub",
    note: "Newsletters, brochures, web & social visuals, print vendor coordination.",
    current: true,
  },
  {
    period: "Nov 2024 — Mar 2025",
    title: "Communications Officer",
    org: "Bramble Network",
    note: "Campaign graphics, volunteer comms, fundraising visuals, platform consistency.",
  },
  {
    period: "Jan 2024 — Oct 2024",
    title: "NYSC Member — Design & Print",
    org: "Valuemax Communication Enterprises",
    note: "Large-format printing, D.I machines, ID card production, client-facing design.",
  },
  {
    period: "Oct 2021 — Mar 2022",
    title: "IT Support Intern",
    org: "Ministry of Petroleum Resources",
    note: "Technical support, Microsoft Office operations, digital workplace assistance.",
  },
];

/* ---------------- skills ------------------------------------------- */
export const DESIGN_SKILLS: { name: string; level: number; note: string }[] = [
  { name: "Adobe Photoshop", level: 95, note: "Daily driver — campaigns, retouching, print prep" },
  { name: "Canva", level: 95, note: "Rapid content systems & brand kits" },
  { name: "Figma", level: 80, note: "UI/UX training applied to web & blog visuals" },
  { name: "CapCut", level: 68, note: "Short-form video & motion content" },
];

export const COMM_SKILLS = [
  "Customer Relationship Management",
  "Social Media Strategy",
  "Content Creation",
  "Stakeholder Engagement",
  "Community Communication",
  "Digital Communication",
];

export const TECH_SKILLS = [
  "Microsoft Word",
  "Microsoft Excel",
  "Microsoft PowerPoint",
  "Printing Press Operations",
  "Large-Format Printing Machines",
  "D.I Machines",
  "ID Card Machines",
  "Basic IT Support",
];

export const SOFT_SKILLS = [
  "Attention to Detail",
  "Time Management",
  "Adaptability",
  "Interpersonal Skills",
  "Communication",
  "Team Collaboration",
  "Problem Solving",
];

/* ---------------- certifications ----------------------------------- */
export const CERTS: { year: string; title: string; org: string }[] = [
  { year: "2024", title: "National Youth Service Corps", org: "NYSC — Certificate of Completion" },
  { year: "2024", title: "Certificate of Appreciation", org: "NDLEA — design support, community outreach" },
  { year: "2024", title: "UI/UX Design Training", org: "Product design foundations & prototyping" },
  { year: "2022", title: "Introduction to LinkedIn Marketing", org: "Professional brand & audience building" },
  { year: "2021", title: "Jobberman Soft-Skills Training", org: "Workplace readiness & communication" },
];

/* ---------------- philosophy --------------------------------------- */
export const PRINCIPLES: { word: string; title: string; body: string }[] = [
  {
    word: "Clarity",
    title: "Clarity",
    body: "Every design should communicate its message clearly — before it decorates, it must inform.",
  },
  {
    word: "Creativity",
    title: "Creativity",
    body: "Visual communication should capture attention while remaining purposeful. Bold, never random.",
  },
  {
    word: "Consistency",
    title: "Consistency",
    body: "A strong, consistent visual identity is how organizations build trust and recognition over time.",
  },
];

/* ---------------- testimonials -------------------------------------- */
export const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  org: string;
}[] = [
  {
    quote:
      "Esther gave our campaigns a visual voice. Turnaround was fast, the work was always on-brand, and her designs played a real part in our award-winning volunteer drives.",
    name: "Programs Director",
    role: "Volunteer & Campaign Lead",
    org: "Bramble Network",
  },
  {
    quote:
      "Our newsletters finally look like the organisation we are becoming. She manages everything — layout, blog visuals, even the print vendors — with remarkable attention to detail.",
    name: "Founder",
    role: "Membership & Partnerships",
    org: "Business Women Hub",
  },
  {
    quote:
      "From flyers to daily content nuggets, every piece felt intentional. Her outreach materials made our events impossible to miss, online and on the streets.",
    name: "Event Coordinator",
    role: "Outreach & Communications",
    org: "Shapers of Nation",
  },
];

/* ---------------- insights / blog ----------------------------------- */
export type Insight = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  read: string;
  body: string[];
};

export const INSIGHTS: Insight[] = [
  {
    id: "outreach-design",
    tag: "Campaign Design",
    title: "Designing outreach that moves Lagos communities",
    excerpt:
      "What a youth summit flyer must do in the three seconds someone glances at it — and the visual decisions that earn the second look.",
    cover: IMG.flyer,
    date: "Jan 2026",
    read: "4 min read",
    body: [
      "Street-level outreach in Lagos competes with a lot of noise: traffic, signage, phones, and a hundred other flyers. When I designed the Shapers of Nation summit materials, the first decision wasn't a colour — it was hierarchy. One promise, one date, one action. Everything else had to earn its place or leave.",
      "Expressive typography does heavy lifting in campaign work. A torn-paper collage with oversized letters communicates energy before a single word is read. But expressiveness without structure reads as chaos, so every piece in the series shared the same grid, the same palette anchors, and the same call-to-action placement.",
      "The second lesson was format discipline. The same announcement had to live as an A5 handbill, a roll-up banner, an Instagram post, and a WhatsApp status. Designing the master layout first, then adapting outward, kept the campaign recognizable everywhere it appeared — which is exactly what outreach needs.",
      "If your organization is planning an event, my advice: decide the one thing a passerby must remember, design that first and loudest, and let consistency across formats do the persuading.",
    ],
  },
  {
    id: "screen-to-press",
    tag: "Print Production",
    title: "From screen to press: preparing files for print vendors",
    excerpt:
      "Bleed, colour mode, resolution, and the vendor conversation that saves your banner — a practical checklist from large-format production work.",
    cover: IMG.banner,
    date: "Nov 2025",
    read: "4 min read",
    body: [
      "During my NYSC year at Valuemax Communication Enterprises, I learned that a beautiful file can still become a disappointing print. The gap between screen and press is measured in bleed settings, colour profiles, and resolution — and it closes long before the machine starts running.",
      "My checklist today: work in CMYK from the start for anything physical, add at least 3mm bleed (more for large-format vinyl), keep critical text away from trim edges, and export at a resolution matched to viewing distance. A banner read from across the street doesn't need 300dpi — but it does need crisp vectors and honest contrast.",
      "The most underrated step is the conversation with the vendor. Confirm the machine, the material, the finishing, and request a proof for anything large. On the NDLEA awareness banner, walking the file through production with the press operator is what kept the greens deep and the type sharp at twelve feet wide.",
      "Designing for print taught me more about digital design than the other way around — constraints make you deliberate. When you know your work has to survive a machine, you stop decorating and start communicating.",
    ],
  },
  {
    id: "daily-content-systems",
    tag: "Content Systems",
    title: "A daily content system that keeps communities engaged",
    excerpt:
      "How the Sexual Purity Movement's daily nuggets became a ritual people wait for — templates, themes, and the discipline of showing up.",
    cover: IMG.nugget,
    date: "Sep 2025",
    read: "3 min read",
    body: [
      "Daily content fails when every post starts from a blank canvas. For the Sexual Purity Movement, we built the opposite: a small system of templates, a rotating set of themes, and a strict typographic voice. Creativity went into the message; the system handled the speed.",
      "Each nugget followed three rules. One idea per card. Type large enough to read on a cracked phone screen in bright sunlight. And a consistent footer, so a new follower could tell within a second where the post came from. Familiarity is a feature, not a limitation.",
      "The result surprised even the team: the daily card became a ritual. People began quoting the nuggets in conversations and sharing them in group chats — the kind of engagement no single 'viral' post ever guarantees, because it compounds instead of spiking.",
      "If you post for an organization, resist the pressure to reinvent every day. Build two or three strong templates, write a month of ideas in one sitting, and let consistency do what virality never will: build trust.",
    ],
  },
];

/* ---------------- marquee words ------------------------------------- */
export const MARQUEE = [
  "Social Media Design",
  "Branding",
  "Print Production",
  "Newsletters",
  "Campaigns",
  "Video Content",
  "Event Graphics",
  "Digital Media",
];

export const ORGS = [
  "Business Women Hub",
  "Bramble Network",
  "Shapers of Nation",
  "Sexual Purity Movement",
];
