import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react";

/* ------------------------------------------------------------------ */
/*  Motion preferences                                                 */
/* ------------------------------------------------------------------ */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal wrapper                                              */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "figure" | "article" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVis(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: vis ? "translateY(0)" : `translateY(${y}px)`,
    opacity: vis ? 1 : 0,
  };

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={style}
      className={`transition-[transform,opacity] duration-700 ease-out will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Scramble / decode text                                             */
/* ------------------------------------------------------------------ */
const GLYPHS = "AKXZMRESTHB#*+/=%?";

function maskText(text: string) {
  return text
    .split("")
    .map((c) => (c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");
}

export function Scramble({
  text,
  className = "",
  delay = 0,
  duration = 950,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(() => (reduced ? text : maskText(text)));

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const total = Math.max(18, Math.round(duration / 16));
    let frame = 0;
    const tick = (t: number) => {
      if (start === null) start = t + delay;
      if (t < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame += 1;
      const p = Math.min(1, frame / total);
      const lock = Math.floor(p * text.length);
      let s = text.slice(0, lock);
      for (let i = lock; i < text.length; i++) {
        s +=
          text[i] === " "
            ? " "
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduced, delay, duration]);

  return (
    <span className={className} aria-label={text}>
      {out}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Line-mask reveal for headings                                      */
/* ------------------------------------------------------------------ */
export function MaskText({
  lines,
  className = "",
  delay = 0,
  step = 110,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVis(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
          <span
            className="block transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              transform: vis ? "translateY(0)" : "translateY(110%)",
              transitionDelay: reduced ? "0ms" : `${delay + i * step}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Count-up number                                                    */
/* ------------------------------------------------------------------ */
export function CountUp({
  to,
  suffix = "",
  className = "",
  duration = 1300,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        let start: number | null = null;
        const step = (t: number) => {
          if (start === null) start = t;
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Active nav section                                                 */
/* ------------------------------------------------------------------ */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActive(id);
        },
        { rootMargin: "-38% 0px -55% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Custom inline icon set                                             */
/* ------------------------------------------------------------------ */
type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const IcSpark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1.5 L14.4 9.6 L22.5 12 L14.4 14.4 L12 22.5 L9.6 14.4 L1.5 12 L9.6 9.6 Z" />
  </svg>
);
export const IcArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 17.5 L17.5 6.5 M8 6.5 h9.5 V16" />
  </svg>
);
export const IcArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4 v16 M5.5 13.5 L12 20 L18.5 13.5" />
  </svg>
);
export const IcArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12 h16 M13.5 5.5 L20 12 L13.5 18.5" />
  </svg>
);
export const IcPlay = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5.5 L19 12 L8 18.5 Z" />
  </svg>
);
export const IcClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6 L18 18 M18 6 L6 18" />
  </svg>
);
export const IcCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" />
  </svg>
);
export const IcMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="1" />
    <path d="M3.5 7 L12 13.5 L20.5 7" />
  </svg>
);
export const IcPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 4 h4 l1.5 4.5 -2.2 1.7 a12.5 12.5 0 0 0 5 5 l1.7 -2.2 L20 14.5 v4 a1.5 1.5 0 0 1 -1.7 1.5 C10.5 19.4 4.6 13.5 4 5.7 A1.5 1.5 0 0 1 5.5 4 Z" />
  </svg>
);
export const IcPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21.5 C12 21.5 5 14.8 5 9.8 a7 7 0 0 1 14 0 c0 5 -7 11.7 -7 11.7 Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </svg>
);
export const IcCopy = (p: P) => (
  <svg {...base(p)}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="1" />
    <path d="M15.5 8.5 v-5 h-12 v12 h5" />
  </svg>
);
export const IcMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 8.5 h17 M3.5 15.5 h17" />
  </svg>
);
export const IcPen = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8 L18.2 9 L8.5 18.7 L3 20.9 L5.2 15.4 Z M15 6 L18 9" />
  </svg>
);
export const IcChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5 h16 v11 h-9.5 L6 20 v-4 H4 Z" />
    <path d="M8 9.5 h8 M8 12.5 h5" />
  </svg>
);
export const IcChip = (p: P) => (
  <svg {...base(p)}>
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M10 7 V3.5 M14 7 V3.5 M10 20.5 V17 M14 20.5 V17 M7 10 H3.5 M7 14 H3.5 M20.5 10 H17 M20.5 14 H17" />
  </svg>
);
export const IcQuote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4 13.2 C4 8.8 6.8 5.8 10.4 4.8 L11 6.6 C8.8 7.5 7.4 9 7.2 10.8 C7.6 10.6 8 10.5 8.6 10.5 C10.6 10.5 12 12 12 14.1 C12 16.3 10.3 18 8 18 C5.6 18 4 16.1 4 13.2 Z M13.5 13.2 C13.5 8.8 16.3 5.8 19.9 4.8 L20.5 6.6 C18.3 7.5 16.9 9 16.7 10.8 C17.1 10.6 17.5 10.5 18.1 10.5 C20.1 10.5 21.5 12 21.5 14.1 C21.5 16.3 19.8 18 17.5 18 C15.1 18 13.5 16.1 13.5 13.2 Z" />
  </svg>
);
