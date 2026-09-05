import type { ReactNode } from "react";
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
import { GALLERY, ORGS, SERVICES, TESTIMONIALS, yearsOfExperience } from "./data";
import {
  IcArrowRight,
  IcArrowUpRight,
  IcChat,
  IcChip,
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
          {SERVICES.map((s, i) => {
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
  const items = GALLERY.slice(0, 3);
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
  const t = TESTIMONIALS[0];
  const years = yearsOfExperience();
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
            <Link to="/projects" className="btn btn-outline-light">
              See the Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
