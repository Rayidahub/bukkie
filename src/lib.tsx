import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Scroll-spy: returns the id of the section currently in view. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
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
/*  Motion primitives                                                  */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "article" | "figure";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const Tag = as as "div";
  const shown = inView || reduced;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/** Line-mask reveal for display headings. */
export function MaskLines({
  lines,
  className = "",
  delay = 0,
  stagger = 120,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            className="block"
            style={{
              transform: inView || reduced ? "none" : "translateY(112%)",
              transition: reduced
                ? "none"
                : `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Animated counter that starts when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon set (custom inline SVG, stroke = currentColor)                */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IcSpark = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="currentColor"
      d="M12 1.8l2.5 7.7 7.7 2.5-7.7 2.5-2.5 7.7-2.5-7.7-7.7-2.5 7.7-2.5z"
    />
  </svg>
);

export const IcStar = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="currentColor"
      d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.5 6.9L12 17.6l-6.1 3.6 1.5-6.9-5.3-4.7 7-.7z"
    />
  </svg>
);

export const IcArrowUpRight = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M6.5 17.5L17.5 6.5M9 6.5h8.5V15" />
  </svg>
);

export const IcArrowRight = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M3.5 12h17M14.5 6l6 6-6 6" />
  </svg>
);

export const IcArrowDown = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M12 3.5v17M6 14.5l6 6 6-6" />
  </svg>
);

export const IcArrowUp = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M12 20.5v-17M6 9.5l6-6 6 6" />
  </svg>
);

export const IcCheck = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke} strokeWidth={2.2}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const IcClose = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke} strokeWidth={2}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IcMenu = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke} strokeWidth={2}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IcQuote = ({ className = "h-8 w-8" }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path
      fill="currentColor"
      d="M13.6 6.5v6.2c0 7.1-3.7 11.5-10.1 12.8l-1.3-3c3.4-1 5.4-3.3 5.9-6.5H2.9V6.5h10.7zm15.5 0v6.2c0 7.1-3.7 11.5-10.1 12.8l-1.3-3c3.4-1 5.4-3.3 5.9-6.5h-5.2V6.5H29.1z"
      transform="scale(0.92)"
    />
  </svg>
);

export const IcPlay = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="currentColor" d="M7 4.8l12 7.2-12 7.2z" />
  </svg>
);

export const IcCopy = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M5.5 15.5h-1a2 2 0 01-2-2v-9a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

export const IcMail = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </svg>
);

export const IcPhone = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 006 6l1.5-2.5L20 15v4a1.5 1.5 0 01-1.6 1.5A16.5 16.5 0 013.5 5.6 1.5 1.5 0 015 4z" />
  </svg>
);

export const IcPin = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IcPrinter = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M7 8V3.5h10V8M7 17H4a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 014 8h16a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0120 17h-3" />
    <rect x="7" y="14" width="10" height="6.5" rx="1" />
  </svg>
);

export const IcDownload = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M12 3.5v11M7.5 10l4.5 4.5L16.5 10M4.5 19.5h15" />
  </svg>
);

/* service icons */
export const IcPen = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M3.5 20.5l1-4.5L16.2 4.3a2.1 2.1 0 013 3L7.5 19l-4 1.5z" />
    <path d="M14 6.5l3.5 3.5M3.5 20.5L7.5 19" />
  </svg>
);

export const IcChat = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M20.5 11.5a8 8 0 01-11.6 7.1L4 20l1.4-4.6a8 8 0 1115.1-3.9z" />
    <path d="M8.5 10.5h7M8.5 13.5h4.5" />
  </svg>
);

export const IcChip = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3.5V7M14 3.5V7M10 17v3.5M14 17v3.5M3.5 10H7M3.5 14H7M17 10h3.5M17 14h3.5" />
  </svg>
);

/* tool glyphs */
export const IcPs = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 16V8h3.2a2.4 2.4 0 010 4.8H8M14.5 16v-4.2c0-2.4 4-2.4 4 0" strokeWidth={1.7} />
  </svg>
);

export const IcCanva = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.2 9.3A3.8 3.8 0 1015.2 14.7" strokeWidth={1.7} />
  </svg>
);

export const IcFigma = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M12 3.5H9a2.75 2.75 0 000 5.5h3zM12 9H9a2.75 2.75 0 000 5.5h3zM12 3.5h3a2.75 2.75 0 010 5.5h-3z" />
    <circle cx="15" cy="11.75" r="2.75" />
    <path d="M12 14.5H9a2.75 2.75 0 102.75 2.75v-2.75z" />
  </svg>
);

export const IcCapCut = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path fill="currentColor" stroke="none" d="M10 8.5l6 3.5-6 3.5z" />
  </svg>
);

export const IcOffice = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1.5" />
    <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="3.6" />
    <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="3.6" />
    <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="1.5" />
  </svg>
);

export const IcPress = ({ className = "h-7 w-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
    <path d="M6.5 8V3.5h11V8M6.5 16.5H4A1.5 1.5 0 012.5 15V9.5A1.5 1.5 0 014 8h16a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5h-2.5" />
    <rect x="6.5" y="13.5" width="11" height="7" rx="1" />
    <path d="M18 11h.01" strokeWidth={2.6} />
  </svg>
);

/* misc */
export function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="inline-flex gap-1 text-gold" aria-label={`${n} star rating`}>
      {Array.from({ length: n }).map((_, i) => (
        <IcStar key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  );
}

export function GoldUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 12"
      preserveAspectRatio="none"
      className={`absolute -bottom-1 left-0 h-[0.18em] w-full ${className}`}
      aria-hidden
    >
      <path
        d="M3 9c40-6 140-6 214-3"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type { CSSProperties };
