import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONTACT, NAV_LINKS } from "../data";
import {
  IcArrowUpRight,
  IcClose,
  IcMail,
  IcMenu,
  IcPhone,
  IcPin,
  IcSpark,
  useReducedMotion,
} from "../lib";

/* ------------------------------------------------------------------ */
/*  Decorative layers                                                  */
/* ------------------------------------------------------------------ */
export function Noise() {
  return (
    <div
      aria-hidden
      className="noise pointer-events-none fixed inset-0 z-[110] opacity-[0.055]"
    />
  );
}

export function Cursor() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const dotRef = (el: HTMLDivElement | null) => {
    (Cursor as unknown as { _d: HTMLDivElement | null })._d = el;
  };
  const ringRef = (el: HTMLDivElement | null) => {
    (Cursor as unknown as { _r: HTMLDivElement | null })._r = el;
  };

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hot = false;
    const store = Cursor as unknown as {
      _d: HTMLDivElement | null;
      _r: HTMLDivElement | null;
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      hot = !!t?.closest?.("a,button,[data-hot]");
      if (store._d) store._d.style.transform = `translate(${x}px, ${y}px)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (store._r) {
        store._r.style.transform = `translate(${rx}px, ${ry}px) scale(${
          hot ? 2.1 : 1
        })`;
        store._r.style.borderColor = hot
          ? "var(--color-flame)"
          : "rgb(27 23 18 / 0.4)";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[130] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-flame"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[129] -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[border-color] duration-200"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation (router-aware)                                          */
/* ------------------------------------------------------------------ */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close the mobile menu whenever the route changes */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          scrolled || open
            ? "border-b border-ink/15 bg-paper"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-tight"
          >
            <IcSpark className="h-5 w-5 text-flame transition-transform duration-500 group-hover:rotate-90" />
            <span>
              Esther<span className="text-flame">&nbsp;B.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.id}
                to={`/${l.id}`}
                className={({ isActive }) =>
                  `font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-flame ${
                    isActive ? "text-flame" : "text-ink/70"
                  }`
                }
              >
                <span className="mr-1.5 opacity-50">/</span>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-ink sm:flex"
            >
              Let's talk
              <IcArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center border border-ink/25 transition-colors hover:border-flame hover:text-flame lg:hidden"
            >
              {open ? <IcClose className="h-5 w-5" /> : <IcMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-paper transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? "60ms" : "0ms" }}
            className={({ isActive }) =>
              `group flex items-baseline gap-4 border-b border-paper/10 py-4 font-display text-4xl font-bold uppercase tracking-tight transition-all duration-500 hover:text-flame ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${isActive ? "text-flame" : ""}`
            }
          >
            <span className="font-mono text-xs text-flame">00</span>
            Home
          </NavLink>
          {NAV_LINKS.map((l, i) => (
            <NavLink
              key={l.id}
              to={`/${l.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${110 + i * 55}ms` : "0ms" }}
              className={({ isActive }) =>
                `group flex items-baseline gap-4 border-b border-paper/10 py-4 font-display text-4xl font-bold uppercase tracking-tight transition-all duration-500 hover:text-flame ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${isActive ? "text-flame" : ""}`
              }
            >
              <span className="font-mono text-xs text-flame">0{i + 1}</span>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="space-y-2 font-mono text-xs text-paper/60">
          <p className="flex items-center gap-2">
            <IcMail className="h-3.5 w-3.5 text-flame" /> {CONTACT.email}
          </p>
          <p className="flex items-center gap-2">
            <IcPhone className="h-3.5 w-3.5 text-flame" /> {CONTACT.phone1}
          </p>
          <p className="flex items-center gap-2">
            <IcPin className="h-3.5 w-3.5 text-flame" /> {CONTACT.location}
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="blueprint-dark relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-flame">
              <IcSpark className="h-3.5 w-3.5" /> Studio
            </p>
            <h3 className="mt-4 max-w-sm font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
              Let's create visuals that communicate,{" "}
              <span className="text-flame">connect</span> & make an impact.
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-6 inline-flex items-center gap-2 border border-paper/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-ink"
            >
              {CONTACT.email} <IcArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
              Sitemap
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              <li>
                <Link
                  to="/"
                  className="group flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-flame"
                >
                  <span className="h-px w-3 bg-paper/30 transition-all group-hover:w-5 group-hover:bg-flame" />
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <Link
                    to={`/${l.id}`}
                    className="group flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-flame"
                  >
                    <span className="h-px w-3 bg-paper/30 transition-all group-hover:w-5 group-hover:bg-flame" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40">
              Reach me
            </p>
            <ul className="mt-4 space-y-3 text-sm text-paper/70">
              <li className="flex items-start gap-3">
                <IcPin className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                {CONTACT.location}
              </li>
              <li className="flex items-start gap-3">
                <IcPhone className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                <span>
                  {CONTACT.phone1}
                  <br />
                  {CONTACT.phone2}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IcMail className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                {CONTACT.email}
              </li>
            </ul>
            <p className="mt-5 inline-flex items-center gap-2 border border-paper/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-dot absolute h-2 w-2 rounded-full bg-flame" />
                <span className="h-2 w-2 rounded-full bg-flame" />
              </span>
              Open for projects — 2026
            </p>
          </div>
        </div>

        {/* giant wordmark */}
        <div aria-hidden className="select-none overflow-hidden pb-2">
          <p className="text-outline-paper whitespace-nowrap text-center font-display text-[clamp(3.2rem,13.5vw,12rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
            Esther Bukola
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-paper/10 py-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper/45 md:flex-row md:items-center">
          <p>© {year} Olowomakan Esther Bukola — All rights reserved</p>
          <p className="flex items-center gap-2">
            <IcSpark className="h-3 w-3 text-flame" />
            Portfolio continuously updated with selected projects & case studies
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 transition-colors hover:text-flame"
          >
            Back to top
            <IcArrowUpRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
