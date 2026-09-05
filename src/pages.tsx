import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AboutSection, SectionHead, ServicesSection } from "./components/about";
import { ExperienceSection } from "./components/career";
import { CtaBanner, Contact, Insights, Philosophy, Testimonials } from "./components/closing";
import { Hero, Ticker } from "./components/hero";
import { FeaturedProjects, Gallery, ToolsSection } from "./components/work";
import {
  CATEGORIES,
  IMG,
  ORGS,
  yearsOfExperience,
  type AboutContent,
  type AboutStat,
  type GalleryCat,
  type GalleryItem,
  type HeroContent,
  type Insight,
  type Service,
} from "./data";
import {
  IcArrowRight,
  IcArrowUp,
  IcArrowUpRight,
  IcChat,
  IcCheck,
  IcChip,
  IcClose,
  IcPen,
  IcQuote,
  IcSpark,
  MaskLines,
  portraitFallback,
  Reveal,
} from "./lib";
import { uid, useContent, type Testimonial } from "./store";

const SERVICE_ICONS = { pen: IcPen, chat: IcChat, chip: IcChip } as const;

/* ------------------------------------------------------------------ */
/*  Shared page header                                                 */
/* ------------------------------------------------------------------ */
function PageHeader({
  crumb,
  title,
  blurb,
}: {
  crumb: string;
  title: ReactNode[];
  blurb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-pine py-16 text-white md:py-24">
      <div aria-hidden className="dots-light pointer-events-none absolute right-10 top-10 h-40 w-40 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-8 h-80 w-80 rounded-full border border-gold/20" />
      <div className="container-x relative">
        <Reveal>
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-white/55">
            <Link to="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span className="text-gold">/</span>
            <span className="text-gold">{crumb}</span>
          </p>
        </Reveal>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-black leading-[1.04] tracking-[-0.015em]">
          <MaskLines lines={title} />
        </h1>
        {blurb && (
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.75] text-white/70">{blurb}</p>
          </Reveal>
        )}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gold" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */
function ServicesIndex() {
  const { services } = useContent();
  return (
    <section aria-label="Services overview" className="relative bg-white py-20 md:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="01"
            eyebrow="What I Do"
            title={[
              <>The services I</>,
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
              <Reveal key={`${s.no}-${s.title}`} delay={i * 90}>
                <Link
                  to="/services"
                  className="group grid items-center gap-4 border-t border-line px-2 py-7 transition-all duration-300 hover:bg-mist md:grid-cols-12 md:gap-6 md:py-8"
                >
                  <span className="font-display text-3xl font-black text-gold md:col-span-1">0{i + 1}</span>
                  <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-sage text-pine transition-transform duration-300 group-hover:rotate-6 group-hover:bg-pine group-hover:text-gold md:col-span-1 md:flex">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-[22px] font-bold leading-snug text-ink transition-colors group-hover:text-pine">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate">{s.kicker}</p>
                  </div>
                  <p className="line-clamp-2 text-[14px] leading-[1.6] text-slate md:col-span-5">{s.desc}</p>
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
                    <IcArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-pine">{g.org}</p>
                  <h3 className="mt-1.5 font-display text-[21px] font-bold leading-snug text-ink">{g.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-slate">{g.study.objective}</p>
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-[15px] font-black text-pine">
              {t.role
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <div>
              <p className="text-[14.5px] font-bold">{t.name}</p>
              <p className="text-[12.5px] text-white/60">
                {t.role} — <span className="text-gold">{t.org}</span>
              </p>
            </div>
          </figcaption>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-4">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
            <p className="font-display text-5xl font-black text-gold">{years}+</p>
            <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.14em] text-white/70">Years of practice</p>
            <p className="mt-5 text-[14px] leading-[1.65] text-white/65">
              From ministry IT desks to print floors to digital media teams — design that has been tested in the real world.
            </p>
            <Link
              to="/testimonials"
              className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-bold text-gold transition-colors hover:text-honey"
            >
              More kind words <IcArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OrgSection() {
  return (
    <section aria-label="Organizations" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="03"
          eyebrow="Trusted By"
          title={[
            <>Organizations I've</>,
            <>
              <span className="italic text-pine">designed for.</span>
            </>,
          ]}
          right="Campaigns, newsletters, outreach materials, and brand systems for teams across faith, business, and civic life."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ORGS.map((o, i) => (
            <Reveal key={o} delay={i * 100}>
              <div className="group flex h-32 flex-col items-center justify-center rounded-2xl border border-line bg-mist text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-pine hover:bg-pine hover:shadow-lift">
                <IcSpark className="h-5 w-5 text-gold transition-transform duration-300 group-hover:rotate-90" />
                <p className="mt-3 px-4 font-display text-[18px] font-bold leading-snug text-ink transition-colors group-hover:text-white">
                  {o}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <ServicesIndex />
      <WorkPreview />
      <OrgSection />
      <TestimonialTeaser />
      <section className="relative bg-mist py-20 md:py-24">
        <div className="container-x">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Services page                                                      */
/* ------------------------------------------------------------------ */
function ProcessSection() {
  const steps = [
    { n: "01", t: "Listen & Brief", d: "Understand the goal, the audience, and the message before any pixel moves." },
    { n: "02", t: "Design & Iterate", d: "Concept, refine, and align every piece to one consistent visual voice." },
    { n: "03", t: "Produce & Ship", d: "Files prepared for screen and press — vendor coordination included." },
    { n: "04", t: "Support & Grow", d: "Measure what lands, then sharpen the system for the next campaign." },
  ];
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
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-mist p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-pine hover:bg-pine hover:shadow-lift">
                <span className="font-display text-5xl font-black text-pine/15 transition-colors duration-300 group-hover:text-gold/40">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-[20px] font-bold text-ink transition-colors duration-300 group-hover:text-white">
                  {s.t}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-slate transition-colors duration-300 group-hover:text-white/70">
                  {s.d}
                </p>
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
          <>Services I</>,
          <>
            <span className="italic text-gold">provide.</span>
          </>,
        ]}
        blurb="Graphic design, digital media, communications, and print production — one consistent partner from idea to finished piece."
      />
      <ServicesSection showHead={false} />
      <ProcessSection />
      <section className="relative bg-white py-20 md:py-24">
        <div className="container-x">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  About page                                                         */
/* ------------------------------------------------------------------ */
export function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title={[
          <>Building brands through</>,
          <>
            <span className="italic text-gold">visual storytelling.</span>
          </>,
        ]}
        blurb="Detail-oriented, result-driven, and based in Ikorodu, Lagos — meet the designer behind the campaigns."
      />
      <AboutSection />
      <ExperienceSection />
      <Philosophy />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects page                                                      */
/* ------------------------------------------------------------------ */
export function ProjectsPage() {
  return (
    <>
      <PageHeader
        crumb="Projects"
        title={[
          <>Selected work &</>,
          <>
            <span className="italic text-gold">case studies.</span>
          </>,
        ]}
        blurb="Campaigns, publications, brand systems, and print production — each with the story of why it was designed."
      />
      <Gallery showHead={false} />
      <FeaturedProjects />
      <ToolsSection />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog page                                                          */
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
        blurb="Practical lessons from campaigns, print floors, and content systems — written for teams who communicate."
      />
      <Insights showHead={false} />
      <section className="relative bg-white py-20 md:py-24">
        <div className="container-x">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials page                                                  */
/* ------------------------------------------------------------------ */
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
        blurb="Feedback from the organizations behind the campaigns, newsletters, and outreach materials in this portfolio."
      />
      <Testimonials showHead={false} />
      <OrgSection />
      <section className="relative bg-mist py-20 md:py-24">
        <div className="container-x">
          <CtaBanner />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact page                                                       */
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
        blurb="Have a project in mind? Send a brief, start a conversation, or grab a contact detail — replies within 24 hours."
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
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-pine py-24 text-white">
      <div aria-hidden className="dots-light pointer-events-none absolute right-10 top-16 h-44 w-44 opacity-60" />
      <div className="container-x text-center">
        <p className="font-display text-[clamp(5rem,16vw,11rem)] font-black leading-none text-gold">404</p>
        <h1 className="mt-4 font-display text-3xl font-black md:text-4xl">This page went to the print shop… and never came back.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-white/65">
          The address doesn't exist — but the portfolio does. Let's get you back to the good stuff.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn btn-gold">
            Back to Home
            <IcArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/projects" className="btn btn-outline-light">
            See the Work
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ADMIN STUDIO                                                       */
/* ================================================================== */
const ADMIN_PASS = "bukkie2026";
const GATE_KEY = "eb-admin-unlocked";

function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const submit = () => {
    if (pass === ADMIN_PASS) onUnlock();
    else {
      setError(true);
      setTimeout(() => setError(false), 1600);
    }
  };
  return (
    <section className="flex min-h-[65vh] items-center bg-mist py-20">
      <div className="container-x">
        <div className="card animate-pop-in mx-auto max-w-md p-8 shadow-lift md:p-10">
          <p className="eyebrow">Admin Studio</p>
          <h1 className="mt-3 font-display text-3xl font-black text-ink">Welcome back, Esther.</h1>
          <p className="mt-2 text-[14px] leading-[1.65] text-slate">
            Enter your passcode to manage services, projects, blog posts, and testimonials.
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Passcode"
            aria-label="Admin passcode"
            className={`input-base mt-6 ${error ? "!border-gold !bg-gold/10" : ""}`}
          />
          {error && <p className="mt-3 text-[13px] font-bold text-pine">Not quite — try again.</p>}
          <button onClick={submit} className="btn btn-pine mt-5 w-full">
            Unlock Studio
            <IcArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-center text-[12px] text-slate">
            Hint for this demo: <span className="font-bold">bukkie2026</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared editor pieces ---------- */
const lbl = "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate";

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input-base" />
    </div>
  );
}

function AreaField({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="input-base resize-y" />
      {hint && <p className="mt-1 text-[11.5px] text-slate/70">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-base cursor-pointer">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_96px] sm:items-end">
      <TextField label={label} value={value} onChange={onChange} placeholder="https://… or /img/file.jpeg" />
      <div className="h-[52px] overflow-hidden rounded-xl border border-line bg-mist">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.opacity = "0.25")} />
        ) : (
          <span className="flex h-full items-center justify-center text-[10px] font-bold uppercase text-slate/50">No image</span>
        )}
      </div>
    </div>
  );
}

function EditorShell({
  title,
  subtitle,
  onClose,
  onSave,
  children,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div
      className="animate-fade-in fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto bg-pine/70 p-4 backdrop-blur-sm md:py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="animate-pop-in w-full max-w-2xl rounded-3xl bg-white p-7 shadow-lift md:p-9" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-black text-ink">{title}</h3>
            <p className="mt-1 text-[13px] text-slate">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close editor"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-slate transition-colors hover:border-pine hover:text-pine"
          >
            <IcClose className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 space-y-4">{children}</div>
        <div className="mt-7 flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-outline !py-2.5 text-[13.5px]">
            Cancel
          </button>
          <button onClick={onSave} className="btn btn-pine !py-2.5 text-[13.5px]">
            <IcCheck className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- editors ---------- */
function ServiceEditor({ initial, onSave, onClose }: { initial: Service; onSave: (s: Service) => void; onClose: () => void }) {
  const [d, setD] = useState(initial);
  const set = (patch: Partial<Service>) => setD((v) => ({ ...v, ...patch }));
  return (
    <EditorShell title={initial.title ? "Edit Service" : "New Service"} subtitle="Changes go live on the site immediately." onClose={onClose} onSave={() => onSave(d)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Title" value={d.title} onChange={(v) => set({ title: v })} />
        <TextField label="Kicker (small label)" value={d.kicker} onChange={(v) => set({ kicker: v })} />
      </div>
      <AreaField label="Description" value={d.desc} onChange={(v) => set({ desc: v })} />
      <AreaField
        label="Tags"
        value={d.tags.join(", ")}
        onChange={(v) => set({ tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
        hint="Separate with commas."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Icon" value={d.icon} onChange={(v) => set({ icon: v as Service["icon"] })} options={["pen", "chat", "chip"]} />
        <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-line bg-mist px-4 py-3">
          <input type="checkbox" checked={!!d.featured} onChange={(e) => set({ featured: e.target.checked })} className="h-4 w-4 accent-[#00439a]" />
          <span className="text-[13.5px] font-bold text-ink">Featured (dark card)</span>
        </label>
      </div>
    </EditorShell>
  );
}

function ProjectEditor({ initial, onSave, onClose }: { initial: GalleryItem; onSave: (p: GalleryItem) => void; onClose: () => void }) {
  const [d, setD] = useState(initial);
  const set = (patch: Partial<GalleryItem>) => setD((v) => ({ ...v, ...patch }));
  const setStudy = (patch: Partial<GalleryItem["study"]>) => setD((v) => ({ ...v, study: { ...v.study, ...patch } }));
  return (
    <EditorShell title={initial.title ? "Edit Project" : "New Project"} subtitle="Fill in the case-study fields shown in the lightbox." onClose={onClose} onSave={() => onSave(d)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Project title" value={d.title} onChange={(v) => set({ title: v })} />
        <TextField label="Client / organization" value={d.org} onChange={(v) => set({ org: v })} />
        <SelectField label="Category" value={d.cat} onChange={(v) => set({ cat: v as GalleryCat })} options={CATEGORIES.filter((c) => c !== "All")} />
        <TextField label="Year" value={d.year} onChange={(v) => set({ year: v })} />
      </div>
      <ImageField label="Cover image URL" value={d.img} onChange={(v) => set({ img: v })} />
      <TextField label="Project type" value={d.study.type} onChange={(v) => setStudy({ type: v })} placeholder="e.g. Social media campaign" />
      <AreaField label="Objective" value={d.study.objective} onChange={(v) => setStudy({ objective: v })} />
      <AreaField
        label="Deliverables"
        value={d.study.deliverables.join("\n")}
        onChange={(v) => setStudy({ deliverables: v.split("\n").map((t) => t.trim()).filter(Boolean) })}
        hint="One per line."
      />
      <AreaField
        label="Tools"
        value={d.study.tools.join(", ")}
        onChange={(v) => setStudy({ tools: v.split(",").map((t) => t.trim()).filter(Boolean) })}
        hint="Separate with commas."
      />
      <AreaField label="Impact / results" value={d.study.impact} onChange={(v) => setStudy({ impact: v })} />
    </EditorShell>
  );
}

function ArticleEditor({ initial, onSave, onClose }: { initial: Insight; onSave: (a: Insight) => void; onClose: () => void }) {
  const [d, setD] = useState(initial);
  const set = (patch: Partial<Insight>) => setD((v) => ({ ...v, ...patch }));
  return (
    <EditorShell title={initial.title ? "Edit Article" : "New Article"} subtitle="Blank lines in the body create new paragraphs." onClose={onClose} onSave={() => onSave(d)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Tag / category" value={d.tag} onChange={(v) => set({ tag: v })} />
        <TextField label="Date" value={d.date} onChange={(v) => set({ date: v })} placeholder="e.g. Feb 2026" />
      </div>
      <TextField label="Title" value={d.title} onChange={(v) => set({ title: v })} />
      <AreaField label="Excerpt" value={d.excerpt} onChange={(v) => set({ excerpt: v })} rows={2} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Read time" value={d.read} onChange={(v) => set({ read: v })} placeholder="4 min read" />
        <ImageField label="Cover image URL" value={d.cover} onChange={(v) => set({ cover: v })} />
      </div>
      <AreaField label="Body" value={d.body.join("\n\n")} onChange={(v) => set({ body: v.split(/\n{2,}/).map((t) => t.trim()).filter(Boolean) })} rows={8} />
    </EditorShell>
  );
}

function TestimonialEditor({ initial, onSave, onClose }: { initial: Testimonial; onSave: (t: Testimonial) => void; onClose: () => void }) {
  const [d, setD] = useState(initial);
  const set = (patch: Partial<Testimonial>) => setD((v) => ({ ...v, ...patch }));
  return (
    <EditorShell title={initial.name ? "Edit Testimonial" : "New Testimonial"} subtitle="Quotes appear on the testimonials page and home page." onClose={onClose} onSave={() => onSave(d)}>
      <AreaField label="Quote" value={d.quote} onChange={(v) => set({ quote: v })} rows={4} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Person" value={d.name} onChange={(v) => set({ name: v })} placeholder="e.g. Programs Director" />
        <TextField label="Role" value={d.role} onChange={(v) => set({ role: v })} />
      </div>
      <TextField label="Organization" value={d.org} onChange={(v) => set({ org: v })} />
    </EditorShell>
  );
}

/* ---------- shared admin pieces ---------- */
function SavedToast({ show, children }: { show: boolean; children: ReactNode }) {
  if (!show) return null;
  return (
    <p className="animate-pop-in fixed bottom-8 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-pine px-6 py-3 text-[13.5px] font-bold text-white shadow-lift">
      <IcCheck className="h-4 w-4 text-gold" /> {children}
    </p>
  );
}

/**
 * Pick a photo from the local computer. The image is downscaled (max 900px),
 * compressed, and handed back as a data URL so it can be embedded straight
 * into the content store.
 */
function ImageUpload({
  value,
  onPick,
  pathFallback,
  label = "Upload from computer",
}: {
  value: string;
  onPick: (dataUrl: string) => void;
  pathFallback?: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const embedded = value.startsWith("data:image/");
  const sizeKb = embedded ? Math.round((value.length * 3) / 4 / 1024) : 0;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image — try a JPG, PNG, or WEBP.");
      return;
    }
    setError("");
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 900;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setBusy(false);
          setError("Couldn't process that image — try a different file.");
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        onPick(canvas.toDataURL("image/jpeg", 0.86));
        setBusy(false);
      };
      img.onerror = () => {
        setBusy(false);
        setError("Couldn't read that image file — it may be corrupted.");
      };
      img.src = String(reader.result);
    };
    reader.onerror = () => {
      setBusy(false);
      setError("Couldn't read that file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" aria-label={label} onChange={handleFile} />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className={`btn btn-gold !py-2.5 text-[13.5px] ${busy ? "cursor-wait opacity-70" : ""}`}
        >
          {busy ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-soft absolute h-2 w-2 rounded-full bg-pine" />
                <span className="h-2 w-2 rounded-full bg-pine" />
              </span>
              Processing…
            </>
          ) : (
            <>
              <IcArrowUp className="h-4 w-4" />
              {label}
            </>
          )}
        </button>
        {embedded && pathFallback && (
          <button
            type="button"
            onClick={() => {
              onPick(pathFallback);
              setError("");
            }}
            className="text-[12.5px] font-bold text-pine underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-pine-dark"
          >
            Use file path instead
          </button>
        )}
      </div>
      {error && (
        <p className="animate-pop-in mt-3 flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2.5 text-[12.5px] font-bold text-pine">
          <IcClose className="h-3.5 w-3.5" /> {error}
        </p>
      )}
      {sizeKb > 0 && !error && (
        <p className="mt-3 flex items-center gap-2 rounded-full bg-pine/8 px-4 py-2 text-[12px] font-bold text-pine">
          <IcCheck className="h-3.5 w-3.5 text-gold" />
          Photo embedded with your content · {sizeKb} KB — included when you save & export
        </p>
      )}
    </div>
  );
}

/* ---------- hero editor ---------- */
function HeroEditor() {
  const store = useContent();
  const [draft, setDraft] = useState<HeroContent>({ ...store.hero });
  const [toast, setToast] = useState(false);
  const set = (patch: Partial<HeroContent>) => setDraft((d) => ({ ...d, ...patch }));

  const save = () => {
    const tags = draft.tags.map((t) => t.trim()).filter(Boolean).slice(0, 3);
    while (tags.length < 3) tags.push("");
    store.setHero({
      ...draft,
      orgs: draft.orgs.map((o) => o.trim()).filter(Boolean),
      tags,
    });
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  const groupTitle = "flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.2em] text-pine";
  const bar = <span className="h-0.5 w-7 rounded bg-gold" />;

  return (
    <div className="card animate-pop-in mt-8 p-6 shadow-soft md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-black text-ink">Hero section editor</h2>
          <p className="mt-1 text-[13.5px] text-slate">Every field updates the homepage hero the moment you save.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn btn-outline !py-2.5 text-[13.5px]">
            View Site
            <IcArrowUpRight className="h-4 w-4" />
          </Link>
          <button onClick={save} className="btn btn-gold !py-2.5 text-[13.5px]">
            <IcCheck className="h-4 w-4" />
            Save Hero
          </button>
        </div>
      </div>

      <div className="mt-9 grid gap-12 lg:grid-cols-12">
        {/* left — text content */}
        <div className="space-y-6 lg:col-span-7">
          <p className={groupTitle}>{bar} Headline</p>
          <TextField label="Eyebrow (small line above the headline)" value={draft.eyebrow} onChange={(v) => set({ eyebrow: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Line 1 — greeting" value={draft.greeting} onChange={(v) => set({ greeting: v })} placeholder="Hello, I'm Bukola" />
            <TextField label="Line 2" value={draft.line2} onChange={(v) => set({ line2: v })} placeholder="I build brands through" />
          </div>
          <TextField label="Line 3 — highlighted (gets the gold underline)" value={draft.highlight} onChange={(v) => set({ highlight: v })} placeholder="visual storytelling." />
          <AreaField label="Introduction paragraph" value={draft.paragraph} onChange={(v) => set({ paragraph: v })} rows={4} />

          <p className={`${groupTitle} pt-4`}>{bar} Buttons</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4 rounded-2xl bg-mist p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate">Primary button</p>
              <TextField label="Label" value={draft.primary.label} onChange={(v) => set({ primary: { ...draft.primary, label: v } })} />
              <TextField label="Link (route like /projects or a full URL)" value={draft.primary.link} onChange={(v) => set({ primary: { ...draft.primary, link: v } })} />
            </div>
            <div className="space-y-4 rounded-2xl bg-mist p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate">Secondary button</p>
              <TextField label="Label" value={draft.secondary.label} onChange={(v) => set({ secondary: { ...draft.secondary, label: v } })} />
              <TextField label="Link" value={draft.secondary.link} onChange={(v) => set({ secondary: { ...draft.secondary, link: v } })} />
            </div>
          </div>

          <p className={`${groupTitle} pt-4`}>{bar} Organization chips</p>
          <TextField label="Label above the chips" value={draft.teamsLabel} onChange={(v) => set({ teamsLabel: v })} />
          <AreaField
            label="Organizations (one per line)"
            value={draft.orgs.join("\n")}
            onChange={(v) => set({ orgs: v.split("\n") })}
            rows={4}
          />
        </div>

        {/* right — image + details */}
        <div className="space-y-6 lg:col-span-5">
          <p className={groupTitle}>{bar} Portrait image</p>
          <div className="flex items-start gap-5">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lift">
              <img
                src={draft.portrait || IMG.portraitRemote}
                alt="Portrait preview"
                className="h-full w-full object-cover"
                onError={portraitFallback}
              />
              <span aria-hidden className="absolute -right-1 -top-1 h-6 w-6 rounded-full border-2 border-white bg-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <TextField label="Image path or URL" value={draft.portrait} onChange={(v) => set({ portrait: v })} placeholder="/img/image1.jpeg" />

              <ImageUpload
                value={draft.portrait}
                onPick={(url) => set({ portrait: url })}
                pathFallback="./img/image1.jpeg"
              />

              <p className="mt-3 rounded-r-xl border-l-4 border-gold bg-mist p-3 text-[12.5px] font-semibold leading-[1.6] text-slate">
                <span className="font-bold text-pine">Easiest:</span> hit <span className="font-bold text-pine">Upload from computer</span> — the photo is
                automatically resized and stored right inside your content. Alternatively, place a file in{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-[11.5px] text-pine">public/img/</code> and use{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-[11.5px] text-pine">/img/yourfile.jpeg</code>, or paste any full https:// URL.
              </p>
            </div>
          </div>

          <p className={`${groupTitle} pt-4`}>{bar} Floating skill tags</p>
          <AreaField
            label="Three tags (one per line)"
            value={draft.tags.join("\n")}
            onChange={(v) => set({ tags: v.split("\n").slice(0, 3) })}
            rows={3}
          />

          <p className={`${groupTitle} pt-4`}>{bar} Badges</p>
          <TextField label="Experience badge label (under the years)" value={draft.badgeLabel} onChange={(v) => set({ badgeLabel: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Availability text" value={draft.availability} onChange={(v) => set({ availability: v })} />
            <TextField label="Coordinates / location line" value={draft.coords} onChange={(v) => set({ coords: v })} />
          </div>

          <div className="rounded-2xl border border-dashed border-pine/30 bg-pine/5 p-5">
            <p className="text-[13px] font-semibold leading-[1.65] text-slate">
              <span className="font-bold text-pine">Preview tip:</span> after saving, the homepage updates instantly — hit{" "}
              <span className="font-bold text-pine">View Site</span> to see it live. Use <span className="font-bold text-pine">Export JSON</span>{" "}
              in the toolbar to take your hero changes permanent.
            </p>
          </div>
        </div>
      </div>

      <SavedToast show={toast}>Hero saved — live on the homepage</SavedToast>
    </div>
  );
}

/* ---------- about editor ---------- */
function AboutEditor() {
  const store = useContent();
  const [draft, setDraft] = useState<AboutContent>({
    ...store.about,
    stats: store.about.stats.map((s) => ({ ...s })),
  });
  const [toast, setToast] = useState(false);
  const set = (patch: Partial<AboutContent>) => setDraft((d) => ({ ...d, ...patch }));

  const updateStat = (i: number, patch: Partial<AboutStat>) =>
    setDraft((d) => ({ ...d, stats: d.stats.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));
  const addStat = () =>
    setDraft((d) =>
      d.stats.length >= 6 ? d : { ...d, stats: [...d.stats, { value: 0, suffix: "", label: "" }] }
    );
  const removeStat = (i: number) =>
    setDraft((d) => (d.stats.length <= 1 ? d : { ...d, stats: d.stats.filter((_, j) => j !== i) }));

  const save = () => {
    store.setAbout({
      ...draft,
      tag1: draft.tag1.trim(),
      tag2: draft.tag2.trim(),
      stats: draft.stats.map((s) => ({ ...s, label: s.label.trim() })).filter((s) => s.label),
    });
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  const groupTitle = "flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.2em] text-pine";
  const bar = <span className="h-0.5 w-7 rounded bg-gold" />;
  const lbl = "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate";

  return (
    <div className="card animate-pop-in mt-8 p-6 shadow-soft md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-black text-ink">About page editor</h2>
          <p className="mt-1 text-[13.5px] text-slate">Everything in the dark-blue About block — photo, words, numbers, buttons.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/about" className="btn btn-outline !py-2.5 text-[13.5px]">
            View Page
            <IcArrowUpRight className="h-4 w-4" />
          </Link>
          <button onClick={save} className="btn btn-gold !py-2.5 text-[13.5px]">
            <IcCheck className="h-4 w-4" />
            Save About
          </button>
        </div>
      </div>

      <div className="mt-9 grid gap-12 lg:grid-cols-12">
        {/* left — copy & stats */}
        <div className="space-y-6 lg:col-span-7">
          <p className={groupTitle}>{bar} Heading</p>
          <TextField label="Eyebrow (after the “02 —”)" value={draft.eyebrow} onChange={(v) => set({ eyebrow: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Heading line 1" value={draft.heading1} onChange={(v) => set({ heading1: v })} placeholder="Who is" />
            <TextField label="Heading line 2 (gold italic)" value={draft.heading2} onChange={(v) => set({ heading2: v })} placeholder="Esther Bukola?" />
          </div>

          <p className={`${groupTitle} pt-4`}>{bar} Biography</p>
          <AreaField label="Introduction paragraph" value={draft.intro} onChange={(v) => set({ intro: v })} rows={4} />
          <AreaField label="Approach paragraph (leads into the mission)" value={draft.approach} onChange={(v) => set({ approach: v })} rows={3} />
          <TextField label="Mission line (gold highlight)" value={draft.mission} onChange={(v) => set({ mission: v })} />

          <p className={`${groupTitle} pt-4`}>{bar} Statistics</p>
          <div className="space-y-3">
            {draft.stats.map((s, i) => (
              <div key={i} className="flex items-end gap-2.5 rounded-2xl bg-mist p-3.5">
                <div className="w-24 shrink-0">
                  <label className={lbl}>Number</label>
                  <input
                    type="number"
                    value={s.value}
                    onChange={(e) => updateStat(i, { value: Number(e.target.value) || 0 })}
                    className="input-base"
                  />
                </div>
                <div className="w-20 shrink-0">
                  <label className={lbl}>Suffix</label>
                  <input
                    value={s.suffix}
                    onChange={(e) => updateStat(i, { suffix: e.target.value })}
                    placeholder="+"
                    className="input-base"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <label className={lbl}>Label</label>
                  <input
                    value={s.label}
                    onChange={(e) => updateStat(i, { label: e.target.value })}
                    placeholder="e.g. Certifications"
                    className="input-base"
                  />
                </div>
                <button
                  onClick={() => removeStat(i)}
                  disabled={draft.stats.length <= 1}
                  aria-label={`Remove stat ${i + 1}`}
                  className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-slate transition-colors enabled:hover:border-gold enabled:hover:bg-gold enabled:hover:text-pine disabled:opacity-40"
                >
                  <IcClose className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {draft.stats.length < 6 && (
              <button
                onClick={addStat}
                className="rounded-full border border-dashed border-pine/40 px-5 py-2.5 text-[13px] font-bold text-pine transition-all duration-300 hover:-translate-y-0.5 hover:border-pine hover:bg-sage"
              >
                + Add statistic
              </button>
            )}
            <p className="text-[12px] font-semibold text-slate">Stats count up with animation on the live page.</p>
          </div>

          <p className={`${groupTitle} pt-4`}>{bar} Buttons</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="CV button label" value={draft.cvLabel} onChange={(v) => set({ cvLabel: v })} />
            <TextField label="Experience button label" value={draft.expLabel} onChange={(v) => set({ expLabel: v })} />
          </div>
        </div>

        {/* right — image & tags */}
        <div className="space-y-6 lg:col-span-5">
          <p className={groupTitle}>{bar} About image</p>
          <div className="relative mx-auto max-w-[300px]">
            <div aria-hidden className="absolute -left-3 -top-3 h-full w-full rounded-[24px] bg-gold" />
            <div className="relative overflow-hidden rounded-[24px] border border-line shadow-lift">
              <img
                src={draft.image || IMG.portraitRemote}
                alt="About image preview"
                className="w-full object-cover object-top"
                onError={portraitFallback}
              />
            </div>
            <span className="absolute -right-3 top-6 z-10 rounded-full bg-pine px-3.5 py-1.5 text-[11px] font-bold text-white shadow-soft">
              {draft.tag1 || "Tag one"}
            </span>
            <span className="absolute -left-3 bottom-8 z-10 rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-bold text-pine shadow-soft">
              {draft.tag2 || "Tag two"}
            </span>
          </div>

          <ImageUpload
            value={draft.image}
            onPick={(url) => set({ image: url })}
            pathFallback="./img/image1.jpeg"
            label="Upload photo from computer"
          />
          <TextField label="…or use an image path / URL" value={draft.image} onChange={(v) => set({ image: v })} placeholder="/img/image1.jpeg" />
          <p className="rounded-r-xl border-l-4 border-gold bg-mist p-3 text-[12.5px] font-semibold leading-[1.6] text-slate">
            <span className="font-bold text-pine">Upload</span> embeds the photo straight into your content. Or place a file in{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-[11.5px] text-pine">public/img/</code> and use{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-[11.5px] text-pine">/img/yourfile.jpeg</code> — any https:// URL works too.
          </p>

          <p className={`${groupTitle} pt-4`}>{bar} Floating tags</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Tag 1 (pine chip, top right)" value={draft.tag1} onChange={(v) => set({ tag1: v })} />
            <TextField label="Tag 2 (white chip, bottom left)" value={draft.tag2} onChange={(v) => set({ tag2: v })} />
          </div>

          <div className="rounded-2xl border border-dashed border-pine/30 bg-pine/5 p-5">
            <p className="text-[13px] font-semibold leading-[1.65] text-slate">
              <span className="font-bold text-pine">Preview tip:</span> saving updates the About page instantly — hit{" "}
              <span className="font-bold text-pine">View Page</span> to see it live. Use{" "}
              <span className="font-bold text-pine">Export JSON</span> in the toolbar to make it permanent.
            </p>
          </div>
        </div>
      </div>

      <SavedToast show={toast}>About page saved — live on the site</SavedToast>
    </div>
  );
}

/* ---------- admin page ---------- */
const TABS = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "About Page" },
  { key: "services", label: "Services" },
  { key: "projects", label: "Projects" },
  { key: "articles", label: "Blog Posts" },
  { key: "testimonials", label: "Testimonials" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(GATE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState<TabKey>("hero");
  const [editing, setEditing] = useState<{ kind: TabKey; id: string } | null>(null);
  const store = useContent();

  if (!authed)
    return (
      <AdminGate
        onUnlock={() => {
          try {
            sessionStorage.setItem(GATE_KEY, "1");
          } catch {
            /* fine */
          }
          setAuthed(true);
        }}
      />
    );

  const counts: Record<TabKey, number | string> = {
    hero: "✎",
    about: "✎",
    services: store.services.length,
    projects: store.projects.length,
    articles: store.articles.length,
    testimonials: store.testimonials.length,
  };

  const exportJson = () => {
    const data = {
      services: store.services,
      projects: store.projects,
      articles: store.articles,
      testimonials: store.testimonials,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const confirmReset = () => {
    if (window.confirm("Reset all content back to the original portfolio data? Your saved changes will be lost.")) {
      store.reset();
      setEditing(null);
    }
  };

  const blankService = (): Service => ({
    no: String(store.services.length + 1).padStart(2, "0"),
    title: "",
    kicker: "",
    desc: "",
    tags: [],
    icon: "pen",
  });
  const blankProject = (): GalleryItem => ({
    id: uid(),
    title: "",
    org: "",
    cat: "Social Media",
    year: String(new Date().getFullYear()),
    img: IMG.bramble,
    ratio: "aspect-[4/3]",
    study: { type: "", objective: "", deliverables: [], tools: [], impact: "" },
  });
  const blankArticle = (): Insight => ({
    id: uid(),
    tag: "",
    title: "",
    excerpt: "",
    cover: IMG.flyer,
    date: new Date().toLocaleString("en-GB", { month: "short", year: "numeric" }),
    read: "3 min read",
    body: [],
  });
  const blankTestimonial = (): Testimonial => ({ quote: "", name: "", role: "", org: "" });

  const startAdd = () => {
    const id = uid();
    if (tab === "services") store.setServices([...store.services, { ...blankService(), no: String(store.services.length + 1).padStart(2, "0") }]);
    if (tab === "projects") store.setProjects([...store.projects, blankProject()]);
    if (tab === "articles") store.setArticles([...store.articles, blankArticle()]);
    if (tab === "testimonials") store.setTestimonials([...store.testimonials, blankTestimonial()]);
    setEditing({ kind: tab, id: tab === "services" ? String(store.services.length) : id });
  };

  const items: { id: string; title: string; sub: string; img?: string }[] =
    tab === "services"
      ? store.services.map((s, i) => ({ id: String(i), title: s.title || "Untitled service", sub: s.kicker }))
      : tab === "projects"
        ? store.projects.map((p) => ({ id: p.id, title: p.title || "Untitled project", sub: `${p.org} · ${p.cat}`, img: p.img }))
        : tab === "articles"
          ? store.articles.map((a) => ({ id: a.id, title: a.title || "Untitled article", sub: `${a.tag} · ${a.date}`, img: a.cover }))
          : store.testimonials.map((t, i) => ({ id: String(i), title: t.name || "Untitled testimonial", sub: t.org }));

  const removeItem = (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    if (tab === "services") store.setServices(store.services.filter((_, i) => String(i) !== id));
    if (tab === "projects") store.setProjects(store.projects.filter((p) => p.id !== id));
    if (tab === "articles") store.setArticles(store.articles.filter((a) => a.id !== id));
    if (tab === "testimonials") store.setTestimonials(store.testimonials.filter((_, i) => String(i) !== id));
  };

  const saveItem = (updated: Service | GalleryItem | Insight | Testimonial) => {
    if (!editing) return;
    if (tab === "services") {
      const next = [...store.services];
      next[Number(editing.id)] = updated as Service;
      store.setServices(next);
    } else if (tab === "projects") {
      store.setProjects(store.projects.map((p) => (p.id === editing.id ? (updated as GalleryItem) : p)));
    } else if (tab === "articles") {
      store.setArticles(store.articles.map((a) => (a.id === editing.id ? (updated as Insight) : a)));
    } else {
      const next = [...store.testimonials];
      next[Number(editing.id)] = updated as Testimonial;
      store.setTestimonials(next);
    }
    setEditing(null);
  };

  const editingItem =
    editing &&
    (tab === "services"
      ? store.services[Number(editing.id)]
      : tab === "projects"
        ? store.projects.find((p) => p.id === editing.id)
        : tab === "articles"
          ? store.articles.find((a) => a.id === editing.id)
          : store.testimonials[Number(editing.id)]);

  return (
    <section className="min-h-screen bg-mist py-14 md:py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Admin Studio</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-ink">
              Content <span className="italic text-pine">control room.</span>
            </h1>
            <p className="mt-2 max-w-xl text-[14.5px] leading-[1.7] text-slate">
              Everything you save here updates the live site instantly in this browser. Export the JSON to publish it permanently.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={exportJson} className="btn btn-pine !py-2.5 text-[13.5px]">
              Export JSON
            </button>
            <button
              onClick={() => {
                const data = JSON.stringify(
                  { services: store.services, projects: store.projects, articles: store.articles, testimonials: store.testimonials },
                  null,
                  2
                );
                navigator.clipboard?.writeText(data).catch(() => {});
              }}
              className="btn btn-outline !py-2.5 text-[13.5px]"
            >
              Copy JSON
            </button>
            <button onClick={confirmReset} className="btn btn-outline !py-2.5 text-[13.5px]">
              Reset
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setEditing(null);
              }}
              aria-pressed={tab === t.key}
              className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
                tab === t.key ? "bg-pine text-white shadow-soft" : "border border-line bg-white text-slate hover:border-pine hover:text-pine"
              }`}
            >
              {t.label}
              <sup className={`ml-1.5 text-[10px] ${tab === t.key ? "text-gold" : "text-pine"}`}>{counts[t.key]}</sup>
            </button>
          ))}
        </div>

        {/* content area */}
        {tab === "hero" ? (
          <HeroEditor />
        ) : tab === "about" ? (
          <AboutEditor />
        ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.id} className="card group flex items-center gap-4 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              {it.img && (
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img src={it.img} alt="" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-[17px] font-bold text-ink">{it.title}</h3>
                <p className="truncate text-[12.5px] font-semibold text-slate">{it.sub}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditing({ kind: tab, id: it.id })}
                  className="rounded-full border border-line px-4 py-2 text-[12px] font-bold text-pine transition-colors hover:border-pine hover:bg-pine hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeItem(it.id)}
                  aria-label={`Delete ${it.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-slate transition-colors hover:border-gold hover:bg-gold hover:text-pine"
                >
                  <IcClose className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={startAdd}
            className="flex min-h-[92px] items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line text-[14px] font-bold text-slate transition-all duration-300 hover:-translate-y-0.5 hover:border-pine hover:text-pine md:col-span-2"
          >
            <IcSpark className="h-4 w-4 text-gold" />
            Add {TABS.find((t) => t.key === tab)?.label.replace(/s$/, "") ?? "item"}
          </button>
        </div>
        )}

        <div className="mt-10 rounded-r-2xl border-l-4 border-gold bg-white p-5 shadow-soft">
          <p className="text-[13.5px] font-semibold leading-[1.65] text-slate">
            <span className="font-bold text-ink">Publishing:</span> edits are saved to this browser and preview live on the site.
            Click <span className="font-bold text-pine">Export JSON</span> and paste the content into <code className="rounded bg-mist px-1.5 py-0.5 text-[12px]">src/data.tsx</code> (or send it to your developer) to make changes permanent for every visitor.
          </p>
        </div>
      </div>

      {/* active editor */}
      {editing && editingItem && tab === "services" && (
        <ServiceEditor initial={editingItem as Service} onSave={saveItem} onClose={() => setEditing(null)} />
      )}
      {editing && editingItem && tab === "projects" && (
        <ProjectEditor initial={editingItem as GalleryItem} onSave={saveItem} onClose={() => setEditing(null)} />
      )}
      {editing && editingItem && tab === "articles" && (
        <ArticleEditor initial={editingItem as Insight} onSave={saveItem} onClose={() => setEditing(null)} />
      )}
      {editing && editingItem && tab === "testimonials" && (
        <TestimonialEditor initial={editingItem as Testimonial} onSave={saveItem} onClose={() => setEditing(null)} />
      )}
    </section>
  );
}
