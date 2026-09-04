import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { About, Services } from "./components/about";
import { Experience, Skills } from "./components/career";
import { Contact, Philosophy, Testimonials } from "./components/closing";
import { Hero } from "./components/hero";
import { FeaturedProjects, Gallery } from "./components/work";
import { GALLERY } from "./data";
import {
  IcArrowRight,
  IcArrowUpRight,
  IcSpark,
  MaskText,
  Reveal,
} from "./lib";

/* ------------------------------------------------------------------ */
/*  Scroll restoration on route change                                 */
/* ------------------------------------------------------------------ */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }, [pathname]);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Inner-page header                                                  */
/* ------------------------------------------------------------------ */
const PAGE_ORDER = [
  { id: "about", label: "About" },
  { id: "services", label: "Focus" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Case Studies" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function PageHeader({
  no,
  name,
  lines,
  blurb,
  id,
}: {
  no: string;
  name: string;
  lines: string[];
  blurb: string;
  id: string;
}) {
  const idx = PAGE_ORDER.findIndex((p) => p.id === id);
  const prev = idx > 0 ? PAGE_ORDER[idx - 1] : null;
  const next = idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null;

  return (
    <section className="blueprint relative overflow-hidden border-b border-ink/10 bg-coal pb-16 pt-32 text-ink md:pb-24 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center justify-between border-t border-ink/10 pt-5">
          <p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-ink/45">
            <IcSpark className="h-3 w-3 text-flame" /> Folio — {no}
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-ink/45">
            ( {name} )
          </p>
        </div>

        <MaskText
          className="mt-8 font-display text-[clamp(3.2rem,10.5vw,8.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight"
          lines={lines}
        />

        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-xl text-[15.5px] leading-relaxed text-ink/60 md:text-base">
            {blurb}
          </p>
          <div className="flex shrink-0 gap-3">
            {prev && (
              <Link
                to={`/${prev.id}`}
                className="group flex items-center gap-2 border border-ink/25 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-flame hover:text-flame"
              >
                <IcArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
                {prev.label}
              </Link>
            )}
            {next && (
              <Link
                to={`/${next.id}`}
                className="group flex items-center gap-2 border border-ink/25 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-flame hover:text-flame"
              >
                {next.label}
                <IcArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>

        <p
          aria-hidden
          className="text-outline pointer-events-none absolute -bottom-6 right-0 hidden select-none whitespace-nowrap font-display text-[9rem] font-extrabold uppercase leading-none opacity-60 xl:block"
        >
          {name}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Home — folio cover + fresh work + CTA                              */
/* ------------------------------------------------------------------ */
const PREVIEW_IDS = ["bramble-summit", "bwh-newsletter", "brand-system"];
const PREVIEW_LIFT = ["lg:mt-0", "lg:mt-14", "lg:mt-6"];

function HomePreview() {
  const picks = PREVIEW_IDS.map((id) => GALLERY.find((g) => g.id === id)!).filter(
    Boolean
  );
  return (
    <section className="blueprint relative border-t border-ink/10 py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute">
              <IcSpark className="h-3.5 w-3.5 text-flame" />
              ( Fresh off the press )
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
              Recent work,
              <br />
              straight from <span className="text-flame">the studio.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="group flex items-center gap-3 border border-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-ink hover:text-paper"
          >
            View all selected works
            <IcArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((g, i) => (
            <Reveal key={g.id} delay={i * 120} className={PREVIEW_LIFT[i]}>
              <Link
                to="/work"
                className="group block border border-ink/20 bg-white p-3 pb-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[10px_10px_0_0_var(--color-flame)]"
              >
                <div className={`relative overflow-hidden ${g.ratio}`}>
                  <img
                    src={g.img}
                    alt={`${g.title} — ${g.org}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 border border-paper/40 bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper">
                    {g.year}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-coal">
                      {g.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-coal/60">
                      {g.org}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-flame transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <IcArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* quick index of what's inside */}
        <Reveal delay={140}>
          <div className="mt-16 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-3">
            {[
              { to: "/projects", label: "Featured case studies", note: "Bramble Network · BWH · Outreach" },
              { to: "/experience", label: "Experience & certifications", note: "4 roles · 5 certifications" },
              { to: "/services", label: "Professional focus", note: "Design · Comms · IT support" },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group flex items-center justify-between gap-4 bg-paper p-5 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                <span>
                  <span className="block font-display text-base font-bold uppercase tracking-tight">
                    {c.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-mute transition-colors group-hover:text-paper/60">
                    {c.note}
                  </span>
                </span>
                <IcArrowRight className="h-5 w-5 shrink-0 text-flame transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-flame text-ink">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-12">
        <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-extrabold uppercase leading-[0.95] tracking-tight lg:col-span-8">
          Have a brief?
          <br />
          Let's make it visual<span className="align-top">.</span>
        </h2>
        <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
          <Link
            to="/contact"
            className="group flex items-center gap-3 border border-ink bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Start a project
            <IcArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/projects"
            className="group flex items-center gap-3 border border-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            See case studies
            <IcArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <HomePreview />
      <HomeCTA />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Inner pages — each menu item gets its own page                     */
/* ------------------------------------------------------------------ */
export function AboutPage() {
  return (
    <>
      <PageHeader
        no="01"
        name="About"
        id="about"
        lines={["The designer", "behind the work."]}
        blurb="Detail-oriented, result-driven, and endlessly curious — get to know the person turning ideas into visual stories across Lagos and beyond."
      />
      <About />
      <Philosophy />
      <Testimonials />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHeader
        no="02"
        name="Focus"
        id="services"
        lines={["What I can", "do for you."]}
        blurb="Three professional disciplines, one goal — communication that connects. Explore design, communications, and technical capabilities in detail."
      />
      <Services />
    </>
  );
}

export function WorkPage() {
  return (
    <>
      <PageHeader
        no="03"
        name="Work"
        id="work"
        lines={["Selected", "works."]}
        blurb="Campaigns, print production, branding, and video — browse the gallery and open any piece for its full case study."
      />
      <Gallery />
    </>
  );
}

export function ProjectsPage() {
  return (
    <>
      <PageHeader
        no="04"
        name="Case Studies"
        id="projects"
        lines={["Featured", "projects."]}
        blurb="Not just what was designed — why it was designed, and the value it created. Three engagements, documented end to end."
      />
      <FeaturedProjects />
    </>
  );
}

export function ExperiencePage() {
  return (
    <>
      <PageHeader
        no="05"
        name="Experience"
        id="experience"
        lines={["Where I've", "worked."]}
        blurb="From the Ministry of Petroleum Resources to print floors and digital media teams — the roles that shaped the craft."
      />
      <Experience />
    </>
  );
}

export function SkillsPage() {
  return (
    <>
      <PageHeader
        no="06"
        name="Skills"
        id="skills"
        lines={["Tools &", "talents."]}
        blurb="Design proficiency measured honestly, plus the communication and technical skills that keep projects moving from screen to press."
      />
      <Skills />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHeader
        no="07"
        name="Contact"
        id="contact"
        lines={["Let's work", "together."]}
        blurb="Available for graphic design, digital media, branding, marketing design, content creation, communications, and creative support."
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
    <section className="blueprint flex min-h-[70vh] items-center justify-center bg-coal px-5 pb-24 pt-36 text-ink">
      <div className="text-center">
        <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-flame">
          <IcSpark className="h-3.5 w-3.5" /> Error 404
        </p>
        <h1 className="mt-5 font-display text-[clamp(3rem,12vw,9rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
          Page off
          <br />
          the <span className="text-flame">press.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/50">
          This page wasn't part of the print run. Let's get you back to the
          folio.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-flame hover:text-ink"
          >
            Back to home
            <IcArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="group flex items-center gap-3 border border-ink/25 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:border-flame hover:text-flame"
          >
            Contact me
            <IcArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
