import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONTACT, FOOTER_LINKS, NAV_LINKS, SERVICES } from "../data";
import {
  IcArrowUp,
  IcArrowUpRight,
  IcBehance,
  IcClose,
  IcDribbble,
  IcFacebook,
  IcInstagram,
  IcLinkedIn,
  IcMail,
  IcMenu,
  IcMoon,
  IcPhone,
  IcPin,
  IcSpark,
  IcSun,
  IcTwitter,
  IcWhatsApp,
} from "../lib";
import { useContent } from "../store";
import { useTheme } from "../ThemeContext";
import { useSwipe } from "../hooks/useSwipe";
import { NewsletterSignup } from "./NewsletterSignup";

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Esther Bukola — home">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold transition-transform duration-300 group-hover:rotate-12">
        <span className="font-display text-lg font-black text-pine">EB</span>
        <IcSpark className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-pine" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[17px] font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Esther Bukola
        </span>
        <span className={`block text-[10.5px] font-bold uppercase tracking-[0.18em] ${light ? "text-white/55" : "text-slate"}`}>
          Design & Media
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar + mobile menu                                               */
/* ------------------------------------------------------------------ */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Swipe gesture handlers for mobile menu
  const swipeHandlers = useSwipe({
    onSwipeRight: () => setOpen(false),
  }, { threshold: 80 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
          window.scrollTo(0, 0);
        }}
        className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-pine transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-[100] border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-pine/95 shadow-[0_12px_32px_-16px_rgb(0_67_154/0.6)] backdrop-blur-sm"
            : "border-white/10 bg-pine"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo light />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `group relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                    isActive ? "text-gold" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <IcMoon className="h-5 w-5" /> : <IcSun className="h-5 w-5" />}
            </button>
            <Link
              to="/contact"
              className={`hidden !px-6 !py-2.5 text-[14px] lg:inline-flex btn ${
                pathname === "/contact" ? "btn-outline-light" : "btn-gold"
              }`}
            >
              Contact Me
              <IcArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <IcMenu />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="animate-fade-in fixed inset-0 z-[110] flex flex-col bg-pine"
          {...swipeHandlers}
        >
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo light />
            <button
              ref={closeRef}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <IcClose />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x mt-6 flex flex-col">
            {[...NAV_LINKS, { path: "/contact", label: "Contact" }].map((link, i) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-bold transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-white"
                  }`
                }
              >
                {link.label}
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                  0{i + 1}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="container-x mt-auto pb-10">
            <div className="rounded-2xl border border-white/15 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Let's talk</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 block text-[15px] font-semibold text-white underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                className="mt-1 block text-sm text-white/70 hover:text-white"
              >
                {CONTACT.phone1}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Social icon renderer                                               */
/* ------------------------------------------------------------------ */
function SocialIcon({ platform, className = "h-5 w-5" }: { platform: string; className?: string }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    linkedin: IcLinkedIn,
    instagram: IcInstagram,
    behance: IcBehance,
    dribbble: IcDribbble,
    twitter: IcTwitter,
    facebook: IcFacebook,
    whatsapp: IcWhatsApp,
  };
  const Icon = icons[platform];
  return Icon ? <Icon className={className} /> : null;
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { socialLinks } = useContent();
  const activeLinks = socialLinks.filter((s) => s.url.trim());

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-pine text-white">
      <div className="dots-light pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-72 w-72 rounded-full border border-gold/20" />

      {/* Newsletter Section */}
      <div className="container-x relative border-b border-white/10 py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">Newsletter</p>
            <h3 className="font-display text-3xl font-bold">Stay in the loop</h3>
            <p className="mt-2 text-[15px] text-white/65">
              Get updates on new projects, design insights, and creative tips. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="md:max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
            Creative Graphics Designer & Digital Media Specialist — building
            brands through visual storytelling, strategic communication, and
            print that survives the real world.
          </p>
          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[12.5px] font-semibold text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-soft absolute h-2 w-2 rounded-full bg-gold" />
              <span className="h-2 w-2 rounded-full bg-gold" />
            </span>
            Open for projects — {CONTACT.location.split(",")[0]}, Lagos
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Sitemap</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white/70 transition-colors hover:text-gold"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Contact</p>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-[14.5px] font-medium text-white/80 transition-colors hover:text-gold"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                  <IcMail className="h-4 w-4" />
                </span>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-[14.5px] font-medium text-white/80 transition-colors hover:text-gold"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                  <IcPhone className="h-4 w-4" />
                </span>
                {CONTACT.phone1}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[14.5px] text-white/60">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                <IcPin className="h-4 w-4" />
              </span>
              {CONTACT.location}
            </li>
          </ul>

          {activeLinks.length > 0 && (
            <>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-gold">Follow Me</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {activeLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-pine"
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-gold">Specialties</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li
                key={s.no}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] font-semibold text-white/70"
              >
                {s.title.split(" & ")[0]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-[13px] text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="flex items-center gap-2">
              Designed with <IcSpark className="h-3 w-3 text-gold" /> in Lagos, Nigeria
            </p>
            <Link to="/admin" className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/45 transition-colors hover:border-gold hover:text-gold">
              Admin Studio
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-4 right-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full bg-gold text-pine shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-honey md:bottom-6 md:right-6 md:h-12 md:w-12 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <IcArrowUp className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </footer>
  );
}
