import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AboutSection, SectionHead, ServicesSection } from "./components/about";
import { ExperienceSection } from "./components/career";
import {
  CtaBanner,
  Contact,
  Insights,
  Philosophy,
  Testimonials,
} from "./components/closing";
import { Hero, Ticker } from "./components/hero";
import { FeaturedProjects, Gallery, ToolsSection } from "./components/work";
import { CATEGORIES, IMG, ORGS, yearsOfExperience, type GalleryCat, type GalleryItem, type Insight, type Service } from "./data";
import { uid, useContent, type Testimonial } from "./store";
import {
  IcArrowRight,
  IcArrowUpRight,
  IcChat,
  IcCheck,
  IcChip,
  IcClose,
  IcPen,
  IcQuote,
  IcSpark,
  MaskLines,
  Reveal,
} from "./lib";

const SERVICE_ICONS = { pen: IcPen, chat: IcChat, chip: IcChip } as const;

/* ------------------------------------------------------------------ */
/*  Shared page header                                                 */
/* ------------------------------------------------------------------ */
function PageHeader({
  crumb,
  title,
  desc,
}: {
  crumb: string;
  title: ReactNode[];
  desc?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-pine text-white">
      <div aria-hidden className="dots-light pointer-events-none absolute right-10 top-10 h-40 w-40 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-80 w-80 rounded-full border border-gold/20" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full border border-white/8" />

      <div className="container-x grid gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span aria-hidden className="text-gold">/</span>
            <span className="text-gold">{crumb}</span>
          </nav>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.3rem)] font-black leading-[1.02] tracking-[-0.015em]">
            <MaskLines lines={title} />
          </h1>
        </div>
        {desc && (
          <Reveal delay={200} className="lg:col-span-4">
            <p className="max-w-sm text-[15px] leading-[1.7] text-white/65 lg:ml-auto">{desc}</p>
          </Reveal>
        )}
      </div>
      <div className="h-1.5 bg-gold" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOME                                                               */
/* ------------------------------------------------------------------ */
function ServicesIndex() {
  const { services } = useContent();
  return (
    <section aria-label="Services overview" className="relative bg-white py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="01"
            eyebrow="Services"
            title={[
              <>What I can</>,
              <>
                <span className="italic text-pine">do for you.</span>
              </>,
            ]}
          />
          <Reveal delay={200} className="-mt-6 mb-12 md:-mt-8 lg:mb-16">
            <Link to="/services" className="btn btn-outline !py-3 text-[14px]">
              All Services
              <IcArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="border-b border-line">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal key={s.no} delay={i * 90}>
                <Link
                  to="/services"
                  className="group grid items-center gap-4 border-t border-line px-2 py-7 transition-all duration-300 hover:bg-mist md:grid-cols-12 md:gap-6 md:py-8"
                >
                  <span className="font-display text-3xl font-black text-gold md:col-span-1">
                    0{i + 1}
                  </span>
                  <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-sage text-pine transition-transform duration-300 group-hover:rotate-6 group-hover:bg-pine group-hover:text-gold md:col-span-1 md:flex">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-[22px] font-bold leading-snug text-ink transition-colors group-hover:text-pine">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate">
                      {s.kicker}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-[14px] leading-[1.6] text-slate md:col-span-5">
                    {s.desc}
                  </p>
                  <span className="flex h-12 w-12 items-center justify-center justify-self-start rounded-full border border-line text-pine transition-all duration-300 group-hover:border-pine group-hover:bg-pine group-hover:text-gold md:col-span-1 md:justify-self-end">
                    <IcArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkPreview() {
  const navigate = useNavigate();
  const { projects } = useContent();
  const items = projects.slice(0, 3);
  return (
    <section aria-label="Featured work preview" className="relative bg-mist py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="02"
            eyebrow="Selected Work"
            title={[
              <>Recent campaigns</>,
              <>
                <span className="italic text-pine">& print.</span>
              </>,
            ]}
          />
          <Reveal delay={200} className="-mt-6 mb-12 md:-mt-8 lg:mb-16">
            <Link to="/projects" className="btn btn-pine !py-3 text-[14px]">
              View All Projects
              <IcArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={i * 120}>
              <button
                onClick={() => navigate("/projects")}
                className="group h-full w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className={`relative overflow-hidden ${g.ratio}`}>
                  <img
                    src={g.img}
                    alt={`${g.title} — ${g.org}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                    {g.cat}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-pine text-gold opacity-0 shadow-lift transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <IcArrowUpRight className="h-4.5 w-4.5" />
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-pine">
                    {g.org}
                  </p>
                  <h3 className="mt-1.5 font-display text-[21px] font-bold leading-snug text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-slate">
                    {g.study.objective}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-[13px] font-bold text-pine">
                    Open case study
                    <IcArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialTeaser() {
  const { testimonials } = useContent();
  const t = testimonials[0];
  const years = yearsOfExperience();
  if (!t) return null;
  return (
    <section aria-label="Testimonial highlight" className="relative overflow-hidden bg-pine py-20 text-white md:py-24">
      <div aria-hidden className="dots-light pointer-events-none absolute left-8 top-12 h-36 w-36 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full border border-gold/20" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <IcQuote className="h-10 w-10 text-gold" />
          <blockquote className="mt-6 font-display text-[clamp(1.4rem,2.8vw,2.2rem)] font-bold leading-[1.3] tracking-tight">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-4">
            <span className="flex h-13 w-13 items-center justify-center rounded-full bg-gold p-3.5 font-display text-[15px] font-black text-pine">
              {t.role.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div>
              <p className="text-[14.5px] font-bold">{t.name}</p>
              <p className="text-[12.5px] text-white/60">
                {t.role} — <span className="text-gold">{t.org}</span>
              </p>
            </div>
          </figcaption>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-4">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
            <p className="font-display text-5xl font-black text-gold">{years}+</p>
            <p className="mt-1 text-[12.5px] font-bold uppercase tracking-[0.14em] text-white/70">
              Years of creative work
            </p>
            <p className="mt-4 border-t border-white/12 pt-4 text-[14px] leading-[1.65] text-white/65">
              From volunteer campaigns to award-recognized communications —
              the teams behind the work say it best.
            </p>
            <Link to="/testimonials" className="btn btn-gold mt-6 w-full !py-3 text-[13.5px]">
              Read All Testimonials
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ServicesIndex />
      <Ticker words={ORGS} className="border-y border-pine-dark bg-pine-dark text-white" />
      <WorkPreview />
      <TestimonialTeaser />
      <CtaBanner />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */
const PROCESS = [
  {
    step: "01",
    title: "Brief & goals",
    body: "We pin down the objective, audience and message — what the design must achieve, not just how it should look.",
  },
  {
    step: "02",
    title: "Concept & direction",
    body: "Palette, type and layout routes explored against your brand — one clear direction chosen together.",
  },
  {
    step: "03",
    title: "Design & iterate",
    body: "Drafts, structured feedback and polish — every detail checked against the brief before sign-off.",
  },
  {
    step: "04",
    title: "Deliver & produce",
    body: "Screen-ready files plus print production support — vendor liaison, proofs and press checks included.",
  },
];

function ProcessSection() {
  return (
    <section aria-label="Working process" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="02"
          eyebrow="Process"
          title={[
            <>How we'll work</>,
            <>
              <span className="italic text-pine">together.</span>
            </>,
          ]}
          right="A simple, transparent process refined across campaigns, newsletters and print production — so you always know what happens next."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 110}>
              <div className="group flex h-full gap-6 rounded-2xl border border-line bg-mist p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-pine hover:bg-white hover:shadow-lift md:p-8">
                <span className="font-display text-5xl font-black leading-none text-pine/15 transition-colors duration-300 group-hover:text-gold md:text-6xl">
                  {p.step}
                </span>
                <div>
                  <h3 className="font-display text-[21px] font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-slate">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title={[
          <>Services built to make</>,
          <>
            <span className="italic text-gold">brands impossible</span>
          </>,
          <>to ignore.</>,
        ]}
        desc="Three disciplines under one roof — visual design, strategic communication, and the technical production that gets work into the world."
      />
      <ServicesSection showHead={false} />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */
export function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title={[
          <>The designer behind</>,
          <>
            <span className="italic text-gold">the work.</span>
          </>,
        ]}
        desc="Detail-oriented, result-driven, and relentlessly curious about how audiences read, feel, and respond."
      />
      <AboutSection />
      <ExperienceSection />
      <Philosophy />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */
export function ProjectsPage() {
  return (
    <>
      <PageHeader
        crumb="Projects"
        title={[
          <>Selected work,</>,
          <>
            <span className="italic text-gold">told properly.</span>
          </>,
        ]}
        desc="Campaigns, publications, brand systems and video content — each with the objective, deliverables and impact behind it."
      />
      <Gallery showHead={false} />
      <FeaturedProjects />
      <ToolsSection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BLOG                                                               */
/* ------------------------------------------------------------------ */
export function BlogPage() {
  return (
    <>
      <PageHeader
        crumb="Blog"
        title={[
          <>Notes from the</>,
          <>
            <span className="italic text-gold">studio desk.</span>
          </>,
        ]}
        desc="Short, practical lessons from real campaigns, print floors and content systems — the thinking behind the portfolio."
      />
      <Insights showHead={false} />
      <CtaBanner />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
const ORG_CARDS = [
  { name: "Business Women Hub", role: "Graphics & Digital Media Associate", period: "2025 — Present" },
  { name: "Bramble Network", role: "Communications Officer", period: "2024 — 2025" },
  { name: "Shapers of Nation", role: "Event outreach design", period: "2024" },
  { name: "Sexual Purity Movement", role: "Daily content series", period: "2024" },
  { name: "Valuemax Communication", role: "Design & print — NYSC", period: "2024" },
  { name: "Ministry of Petroleum", role: "IT support intern", period: "2021 — 2022" },
];

function OrgSection() {
  return (
    <section aria-label="Organizations" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="02"
          eyebrow="Organizations"
          title={[
            <>Teams I've worked</>,
            <>
              <span className="italic text-pine">with.</span>
            </>,
          ]}
          right="Every testimonial is rooted in real collaboration — here are the organizations behind the words."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ORG_CARDS.map((o, i) => (
            <Reveal key={o.name} delay={i * 90}>
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-line bg-mist p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-pine hover:bg-white hover:shadow-lift">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pine font-display text-lg font-black text-gold transition-transform duration-300 group-hover:rotate-6">
                  {o.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div>
                  <h3 className="font-display text-[19px] font-bold leading-snug text-ink">
                    {o.name}
                  </h3>
                  <p className="mt-1 text-[13.5px] font-semibold text-slate">{o.role}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                    <IcSpark className="h-3 w-3 text-gold" />
                    {o.period}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <PageHeader
        crumb="Testimonials"
        title={[
          <>Kind words from</>,
          <>
            <span className="italic text-gold">the teams.</span>
          </>,
        ]}
        desc="Feedback from the organizations behind the campaigns, newsletters and outreach materials in this portfolio."
      />
      <Testimonials showHead={false} />
      <OrgSection />
      <CtaBanner />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */
export function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title={[
          <>Let's build something</>,
          <>
            <span className="italic text-gold">meaningful together.</span>
          </>,
        ]}
        desc="Currently accepting graphic design, digital media, branding and communications projects. Response within 24 hours on weekdays."
      />
      <Contact />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  404                                                                */
/* ------------------------------------------------------------------ */
export function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-pine text-white">
      <div aria-hidden className="dots-light pointer-events-none absolute right-10 top-10 h-40 w-40 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full border border-white/10" />
      <div className="container-x grid items-center gap-10 py-24 lg:grid-cols-2">
        <div>
          <p className="font-display text-[clamp(6rem,18vw,12rem)] font-black leading-none text-gold">
            404
          </p>
        </div>
        <div>
          <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
            This page took a
            <br />
            <span className="italic text-gold">creative detour.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-[1.7] text-white/65">
            The page you're looking for doesn't exist — but the portfolio,
            services and case studies are all one click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/" className="btn btn-gold">
              Back to Home
              <IcArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/projects" className="btn btn-outline">
              See the Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ADMIN STUDIO — local content manager                               */
/*  Passcode lives here; change ADMIN_PASS to your own.                */
/* ================================================================== */
const ADMIN_PASS = "bukkie2026";
const UNLOCK_KEY = "eb-admin-unlocked";

type AdminTab = "services" | "projects" | "articles" | "testimonials";

const ADMIN_TABS: { id: AdminTab; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "articles", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
];

const fld = "mb-1.5 block text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate";

type EditorState =
  | { tab: "services"; item?: Service }
  | { tab: "projects"; item?: GalleryItem }
  | { tab: "articles"; item?: Insight }
  | { tab: "testimonials"; item?: Testimonial };

/* ---------------- editors ------------------------------------------ */
function ServiceEditor({
  initial,
  nextNo,
  onSave,
  onClose,
}: {
  initial?: Service;
  nextNo: string;
  onSave: (s: Service) => void;
  onClose: () => void;
}) {
  const [no] = useState(initial?.no ?? nextNo);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [kicker, setKicker] = useState(initial?.kicker ?? "");
  const [icon, setIcon] = useState<Service["icon"]>(initial?.icon ?? "pen");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [desc, setDesc] = useState(initial?.desc ?? "");
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "");

  const submit = () => {
    if (!title.trim()) return;
    onSave({
      no,
      title: title.trim(),
      kicker: kicker.trim() || "Service",
      icon,
      featured,
      desc: desc.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <EditorShell title={initial ? "Edit Service" : "New Service"} onClose={onClose} onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={fld}>Service name *</label>
          <input className="input-base" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Motion & Reels Production" />
        </div>
        <div>
          <label className={fld}>Kicker (small label)</label>
          <input className="input-base" value={kicker} onChange={(e) => setKicker(e.target.value)} placeholder="e.g. New capability" />
        </div>
        <div>
          <label className={fld}>Icon</label>
          <select className="input-base cursor-pointer" value={icon} onChange={(e) => setIcon(e.target.value as Service["icon"])}>
            <option value="pen">Pen — design</option>
            <option value="chat">Chat — communication</option>
            <option value="chip">Chip — technical</option>
          </select>
        </div>
        <div>
          <label className={fld}>Highlight card</label>
          <button
            type="button"
            onClick={() => setFeatured((v) => !v)}
            className={`input-base cursor-pointer text-left font-bold transition-colors ${featured ? "!bg-pine !text-white" : ""}`}
          >
            {featured ? "★ Featured (dark card)" : "Standard card — click to feature"}
          </button>
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Description</label>
          <textarea rows={3} className="input-base resize-none" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Tags (comma separated)</label>
          <input className="input-base" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Flyers, Banners, Campaigns" />
        </div>
      </div>
    </EditorShell>
  );
}

function ProjectEditor({
  initial,
  onSave,
  onClose,
}: {
  initial?: GalleryItem;
  onSave: (p: GalleryItem) => void;
  onClose: () => void;
}) {
  const [id] = useState(initial?.id ?? uid("proj"));
  const [title, setTitle] = useState(initial?.title ?? "");
  const [org, setOrg] = useState(initial?.org ?? "");
  const [cat, setCat] = useState<GalleryCat>(initial?.cat ?? "Social Media");
  const [year, setYear] = useState(initial?.year ?? String(new Date().getFullYear()));
  const [img, setImg] = useState(initial?.img ?? "");
  const [ratio, setRatio] = useState(initial?.ratio ?? "aspect-[4/3]");
  const [objective, setObjective] = useState(initial?.study.objective ?? "");
  const [deliverables, setDeliverables] = useState(initial?.study.deliverables.join("\n") ?? "");
  const [tools, setTools] = useState(initial?.study.tools.join(", ") ?? "");
  const [impact, setImpact] = useState(initial?.study.impact ?? "");

  const submit = () => {
    if (!title.trim()) return;
    onSave({
      id,
      title: title.trim(),
      org: org.trim() || "Independent",
      cat,
      year: year.trim(),
      img: img.trim() || IMG.brand,
      ratio,
      study: {
        type: cat,
        objective: objective.trim(),
        deliverables: deliverables.split("\n").map((d) => d.trim()).filter(Boolean),
        tools: tools.split(",").map((t) => t.trim()).filter(Boolean),
        impact: impact.trim(),
      },
    });
    onClose();
  };

  return (
    <EditorShell title={initial ? "Edit Project" : "New Project"} onClose={onClose} onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={fld}>Project title *</label>
          <input className="input-base" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Independence Campaign" />
        </div>
        <div>
          <label className={fld}>Client / Organization</label>
          <input className="input-base" value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>
        <div>
          <label className={fld}>Category</label>
          <select className="input-base cursor-pointer" value={cat} onChange={(e) => setCat(e.target.value as GalleryCat)}>
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={fld}>Year</label>
          <input className="input-base" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <label className={fld}>Image URL</label>
          <input className="input-base" value={img} onChange={(e) => setImg(e.target.value)} placeholder="https://… or /img/your-file.jpg" />
        </div>
        <div>
          <label className={fld}>Image ratio</label>
          <select className="input-base cursor-pointer" value={ratio} onChange={(e) => setRatio(e.target.value)}>
            <option value="aspect-[4/3]">Landscape 4:3 (recommended)</option>
            <option value="aspect-square">Square</option>
            <option value="aspect-video">Wide 16:9</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Objective / short description</label>
          <textarea rows={2} className="input-base resize-none" value={objective} onChange={(e) => setObjective(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Deliverables (one per line)</label>
          <textarea rows={3} className="input-base resize-none" value={deliverables} onChange={(e) => setDeliverables(e.target.value)} />
        </div>
        <div>
          <label className={fld}>Tools (comma separated)</label>
          <input className="input-base" value={tools} onChange={(e) => setTools(e.target.value)} placeholder="Photoshop, Canva" />
        </div>
        <div>
          <label className={fld}>Impact</label>
          <input className="input-base" value={impact} onChange={(e) => setImpact(e.target.value)} />
        </div>
      </div>
    </EditorShell>
  );
}

function ArticleEditor({
  initial,
  onSave,
  onClose,
}: {
  initial?: Insight;
  onSave: (a: Insight) => void;
  onClose: () => void;
}) {
  const [id] = useState(initial?.id ?? uid("post"));
  const [tag, setTag] = useState(initial?.tag ?? "Insight");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }));
  const [read, setRead] = useState(initial?.read ?? "3 min read");
  const [cover, setCover] = useState(initial?.cover ?? "");
  const [body, setBody] = useState(initial?.body.join("\n\n") ?? "");

  const submit = () => {
    if (!title.trim()) return;
    onSave({
      id,
      tag: tag.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      cover: cover.trim() || IMG.flyer,
      date: date.trim(),
      read: read.trim(),
      body: body.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <EditorShell title={initial ? "Edit Article" : "New Article"} onClose={onClose} onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={fld}>Title *</label>
          <input className="input-base" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className={fld}>Category tag</label>
          <input className="input-base" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Branding" />
        </div>
        <div>
          <label className={fld}>Date</label>
          <input className="input-base" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className={fld}>Read time</label>
          <input className="input-base" value={read} onChange={(e) => setRead(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Cover image URL</label>
          <input className="input-base" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://… or /img/your-file.jpg" />
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Excerpt</label>
          <textarea rows={2} className="input-base resize-none" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className={fld}>Article body (blank line = new paragraph)</label>
          <textarea rows={7} className="input-base resize-y" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
      </div>
    </EditorShell>
  );
}

function TestimonialEditor({
  initial,
  onSave,
  onClose,
}: {
  initial?: Testimonial;
  onSave: (t: Testimonial) => void;
  onClose: () => void;
}) {
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [org, setOrg] = useState(initial?.org ?? "");

  const submit = () => {
    if (!quote.trim() || !org.trim()) return;
    onSave({
      quote: quote.trim(),
      name: name.trim() || "Client",
      role: role.trim() || "Partner",
      org: org.trim(),
    });
    onClose();
  };

  return (
    <EditorShell title={initial ? "Edit Testimonial" : "New Testimonial"} onClose={onClose} onSubmit={submit}>
      <div className="grid gap-4">
        <div>
          <label className={fld}>Quote *</label>
          <textarea rows={4} className="input-base resize-none" value={quote} onChange={(e) => setQuote(e.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={fld}>Person / title</label>
            <input className="input-base" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Founder" />
          </div>
          <div>
            <label className={fld}>Role</label>
            <input className="input-base" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Programs Lead" />
          </div>
          <div>
            <label className={fld}>Organization *</label>
            <input className="input-base" value={org} onChange={(e) => setOrg(e.target.value)} />
          </div>
        </div>
      </div>
    </EditorShell>
  );
}

function EditorShell({
  title,
  onClose,
  onSubmit,
  children,
}: {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}) {
  return (
    <div className="animate-fade-in fixed inset-0 z-[140] flex items-start justify-center overflow-y-auto bg-pine/70 p-4 backdrop-blur-sm md:py-10" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="animate-pop-in relative w-full max-w-2xl rounded-3xl bg-white p-7 shadow-lift md:p-9" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-black text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Close editor" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-slate transition-colors hover:border-pine hover:text-pine">
            <IcClose className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
        <div className="mt-7 flex items-center justify-end gap-3 border-t border-line pt-5">
          <button onClick={onClose} className="btn btn-outline !py-2.5 text-[14px]">Cancel</button>
          <button onClick={onSubmit} className="btn btn-pine !py-2.5 text-[14px]">
            <IcCheck className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- admin page ---------------------------------------- */
export function AdminPage() {
  const cms = useContent();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === "1");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<AdminTab>("services");
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [copied, setCopied] = useState(false);

  const unlock = () => {
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      setAuthed(true);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const exportJson = () => {
    const blob = new Blob([cms.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(cms.exportJson());
    } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const counts: Record<AdminTab, number> = {
    services: cms.services.length,
    projects: cms.projects.length,
    articles: cms.articles.length,
    testimonials: cms.testimonials.length,
  };

  /* -------- gate -------- */
  if (!authed) {
    return (
      <section className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-pine py-20 text-white">
        <div aria-hidden className="dots-light pointer-events-none absolute left-10 top-16 h-44 w-44 opacity-60" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full border border-gold/25" />
        <div className="container-x flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold font-display text-xl font-black text-pine">EB</span>
            <h1 className="mt-6 font-display text-3xl font-black leading-tight">Admin Studio</h1>
            <p className="mt-2 text-[14.5px] leading-[1.65] text-white/65">
              Manage services, projects, blog posts and testimonials. Enter the
              studio passcode to continue.
            </p>
            <label className="mt-7 mb-1.5 block text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-white/50">
              Passcode
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setErr(false); }}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="••••••••••"
              className="w-full rounded-xl border border-white/20 bg-pine-dark/60 px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-colors focus:border-gold focus:outline-none"
              autoFocus
            />
            {err && <p className="mt-3 text-[13px] font-bold text-gold">Incorrect passcode — try again.</p>}
            <button onClick={unlock} className="btn btn-gold mt-5 w-full">Unlock Studio</button>
            <p className="mt-5 text-center text-[12px] leading-relaxed text-white/40">
              Default passcode: <span className="font-mono text-gold/80">bukkie2026</span>
              <br />Change it in <span className="font-mono">src/pages.tsx</span> (ADMIN_PASS)
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* -------- dashboard -------- */
  const rowBtn = "flex h-9 w-9 items-center justify-center rounded-full border border-line text-slate transition-colors hover:border-pine hover:text-pine";
  const delBtn = "flex h-9 items-center justify-center gap-1.5 rounded-full border border-line px-3.5 text-[12px] font-bold text-slate transition-colors hover:border-[#c2382f] hover:text-[#c2382f]";

  return (
    <section className="relative min-h-[calc(100vh-72px)] bg-mist py-12 md:py-16">
      <div className="container-x">
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft md:p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine font-display text-lg font-black text-gold">EB</span>
            <div>
              <h1 className="font-display text-2xl font-black text-ink">Admin Studio</h1>
              <p className="flex items-center gap-2 text-[12.5px] font-semibold text-slate">
                <span className={`h-2 w-2 rounded-full ${cms.isCustomized ? "bg-gold" : "bg-sage"}`} />
                {cms.isCustomized ? "Draft mode — changes saved in this browser" : "Showing default content"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button onClick={copyJson} className="btn btn-outline !px-5 !py-2.5 text-[13px]">
              {copied ? "Copied ✓" : "Copy JSON"}
            </button>
            <button onClick={exportJson} className="btn btn-outline !px-5 !py-2.5 text-[13px]">Export JSON</button>
            <button
              onClick={() => { if (window.confirm("Reset all content back to the original defaults? Your local edits will be removed.")) cms.resetAll(); }}
              className="btn btn-outline !px-5 !py-2.5 text-[13px] !text-[#c2382f] hover:!border-[#c2382f]"
            >
              Reset
            </button>
            <button
              onClick={() => { sessionStorage.removeItem(UNLOCK_KEY); setAuthed(false); }}
              className="btn btn-pine !px-5 !py-2.5 text-[13px]"
            >
              Lock
            </button>
          </div>
        </div>

        {/* notice */}
        <div className="mt-5 flex items-start gap-3 rounded-r-2xl border-l-4 border-gold bg-gold/10 p-4">
          <IcSpark className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="text-[13.5px] leading-[1.6] text-ink/80">
            <strong>How publishing works:</strong> edits save instantly to this
            browser so you can preview them on the live site. To publish
            changes for every visitor, click <strong>Export JSON</strong> and
            send the file to your developer (or replace the matching arrays in{" "}
            <span className="font-mono text-[12.5px]">src/data.tsx</span>).
          </p>
        </div>

        {/* tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {ADMIN_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all duration-300 ${
                tab === t.id ? "bg-pine text-white shadow-soft" : "border border-line bg-white text-slate hover:-translate-y-0.5 hover:border-pine hover:text-pine"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${tab === t.id ? "bg-gold text-pine" : "bg-mist text-slate"}`}>
                {counts[t.id]}
              </span>
            </button>
          ))}
        </div>

        {/* list */}
        <div className="mt-6 space-y-3.5">
          {tab === "services" && (
            <>
              <AddButton label="Add Service" onClick={() => setEditor({ tab: "services" })} />
              {cms.services.map((s) => {
                const Icon = SERVICE_ICONS[s.icon];
                return (
                  <div key={s.no} className="card group flex items-center gap-4 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage text-pine"><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 font-display text-[17px] font-bold text-ink">
                        {s.title}
                        {s.featured && <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-pine">Featured</span>}
                      </p>
                      <p className="truncate text-[13px] text-slate">{s.kicker} · {s.tags.length} tags</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button className={rowBtn} aria-label={`Edit ${s.title}`} onClick={() => setEditor({ tab: "services", item: s })}><IcPen className="h-4 w-4" /></button>
                      <button className={delBtn} onClick={() => { if (window.confirm(`Delete service "${s.title}"?`)) cms.deleteService(s.no); }}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {tab === "projects" && (
            <>
              <AddButton label="Add Project" onClick={() => setEditor({ tab: "projects" })} />
              {cms.projects.map((p) => (
                <div key={p.id} className="card group flex items-center gap-4 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-5">
                  <img src={p.img} alt="" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[17px] font-bold text-ink">{p.title}</p>
                    <p className="truncate text-[13px] text-slate">{p.org} · <span className="font-bold text-pine">{p.cat}</span> · {p.year}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className={rowBtn} aria-label={`Edit ${p.title}`} onClick={() => setEditor({ tab: "projects", item: p })}><IcPen className="h-4 w-4" /></button>
                    <button className={delBtn} onClick={() => { if (window.confirm(`Delete project "${p.title}"?`)) cms.deleteProject(p.id); }}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === "articles" && (
            <>
              <AddButton label="Add Article" onClick={() => setEditor({ tab: "articles" })} />
              {cms.articles.map((a) => (
                <div key={a.id} className="card group flex items-center gap-4 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-5">
                  <img src={a.cover} alt="" className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[17px] font-bold text-ink">{a.title}</p>
                    <p className="truncate text-[13px] text-slate"><span className="font-bold text-pine">{a.tag}</span> · {a.date} · {a.read}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className={rowBtn} aria-label={`Edit ${a.title}`} onClick={() => setEditor({ tab: "articles", item: a })}><IcPen className="h-4 w-4" /></button>
                    <button className={delBtn} onClick={() => { if (window.confirm(`Delete article "${a.title}"?`)) cms.deleteArticle(a.id); }}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === "testimonials" && (
            <>
              <AddButton label="Add Testimonial" onClick={() => setEditor({ tab: "testimonials" })} />
              {cms.testimonials.map((t) => (
                <div key={t.org} className="card group flex items-center gap-4 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine font-display text-[14px] font-black text-gold">
                    {t.role.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-[14.5px] font-semibold italic text-ink">“{t.quote}”</p>
                    <p className="truncate text-[13px] text-slate">{t.name} · {t.role} · <span className="font-bold text-pine">{t.org}</span></p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className={rowBtn} aria-label={`Edit ${t.org} testimonial`} onClick={() => setEditor({ tab: "testimonials", item: t })}><IcPen className="h-4 w-4" /></button>
                    <button className={delBtn} onClick={() => { if (window.confirm(`Delete testimonial from ${t.org}?`)) cms.deleteTestimonial(t.org); }}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* editors */}
      {editor?.tab === "services" && (
        <ServiceEditor
          initial={editor.item}
          nextNo={String(Math.max(0, ...cms.services.map((s) => parseInt(s.no, 10) || 0)) + 1).padStart(2, "0")}
          onSave={cms.saveService}
          onClose={() => setEditor(null)}
        />
      )}
      {editor?.tab === "projects" && (
        <ProjectEditor initial={editor.item} onSave={cms.saveProject} onClose={() => setEditor(null)} />
      )}
      {editor?.tab === "articles" && (
        <ArticleEditor initial={editor.item} onSave={cms.saveArticle} onClose={() => setEditor(null)} />
      )}
      {editor?.tab === "testimonials" && (
        <TestimonialEditor initial={editor.item} onSave={cms.saveTestimonial} onClose={() => setEditor(null)} />
      )}
    </section>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pine/30 bg-white/60 py-5 text-[14.5px] font-bold text-pine transition-all duration-300 hover:border-pine hover:bg-white hover:shadow-soft"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pine text-gold transition-transform duration-300 group-hover:rotate-90">+</span>
      {label}
    </button>
  );
}
