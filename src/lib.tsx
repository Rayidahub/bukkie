import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { IMG } from "./data";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Scroll-spy: returns the id of the section currently in view. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Portrait fallback chain                                            */
/* ------------------------------------------------------------------ */
/**
 * Tries ./img/buk.jpeg → ./buk.jpeg → hosted fallback so the
 * portrait always resolves regardless of local file placement.
 */
export function portraitFallback(e: SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  const stage = Number(el.dataset.fb ?? 0);
  const chain = ["/img/image1.jpeg", "/img/buk.jpeg", "/buk.jpeg", IMG.portraitRemote];
  if (stage < chain.length) {
    el.dataset.fb = String(stage + 1);
    el.src = chain[stage];
  }
}

/* ------------------------------------------------------------------ */
/*  Motion primitives                                                  */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  const reduced = useReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView || reduced ? 1 : 0,
        transform: inView || reduced ? "none" : `translateY(${y}px)`,
        transition: reduced
          ? "none"
          : `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function MaskLines({
  lines,
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  const reduced = useReducedMotion();
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            className="block"
            style={{
              transform: inView || reduced ? "none" : "translateY(112%)",
              transition: reduced
                ? "none"
                : `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay + i * 110}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (hand-drawn inline SVG, stroke = currentColor)               */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IcArrowUpRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
);
export const IcArrowRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg>
);
export const IcArrowDown = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M12 4v16" /><path d="M5 13l7 7 7-7" /></svg>
);
export const IcArrowUp = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M12 20V4" /><path d="M5 11l7-7 7 7" /></svg>
);
export const IcMenu = ({ className = "h-5 w-5" }: IconProps) => (
  <svg {...base} className={className}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
);
export const IcClose = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
);
export const IcCheck = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M4 12.5l5 5L20 6.5" /></svg>
);
export const IcSpark = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2c.6 4.8 4.2 8.4 9 9-4.8.6-8.4 4.2-9 9-.6-4.8-4.2-8.4-9-9 4.8-.6 8.4-4.2 9-9z" />
  </svg>
);
export const IcCopy = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>
);
export const IcMail = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const IcPhone = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.8a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.9.5 2.9.6a2 2 0 011.7 2z" /></svg>
);
export const IcPin = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IcQuote = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M10.5 7H6.8A2.8 2.8 0 004 9.8v3.7a2.8 2.8 0 002.8 2.8h1.7v.9a2 2 0 01-2 2H5.6v2h1a4 4 0 004-4V7h-.1zm9.5 0h-3.7A2.8 2.8 0 0013.5 9.8v3.7a2.8 2.8 0 002.8 2.8H18v.9a2 2 0 01-2 2h-.9v2h1a4 4 0 004-4V7H20z" />
  </svg>
);
export const IcPlay = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
export const IcDownload = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M12 3v12" /><path d="M5 10l7 7 7-7" /><path d="M4 21h16" /></svg>
);
export const IcPrinter = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M6 9V3h12v6" /><rect x="4" y="9" width="16" height="8" rx="2" /><path d="M6 14h12v7H6z" /></svg>
);
export const IcPen = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M17 3l4 4L8 20l-5 1 1-5L17 3z" /><path d="M14 6l4 4" /></svg>
);
export const IcChat = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><path d="M21 11.5a8.4 8.4 0 01-8.5 8.3 8.9 8.9 0 01-3.8-.8L3 21l2-5.4a8 8 0 1116-4.1z" /></svg>
);
export const IcChip = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base} className={className}><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
);
export const IcPs = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="800" fontFamily="inherit">Ps</text>
  </svg>
);
export const IcCanva = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="800" fontFamily="inherit">C</text>
  </svg>
);
export const IcFigma = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="800" fontFamily="inherit">Fg</text>
  </svg>
);
export const IcCapCut = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="800" fontFamily="inherit">Cc</text>
  </svg>
);
export const IcOffice = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="800" fontFamily="inherit">Of</text>
  </svg>
);
export const IcPress = ({ className = "h-6 w-6" }: IconProps) => (
  <svg {...base} className={className}><rect x="4" y="3" width="16" height="6" rx="2" /><path d="M5 9h14l-1.5 11h-11L5 9z" /><path d="M9 13h6" /></svg>
);
