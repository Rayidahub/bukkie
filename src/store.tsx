import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GALLERY,
  HERO,
  INSIGHTS,
  SERVICES,
  TESTIMONIALS,
  type GalleryItem,
  type HeroContent,
  type Insight,
  type Service,
} from "./data";

const LS_KEY = "eb-portfolio-content-v1";

export type Testimonial = (typeof TESTIMONIALS)[number];

export type SiteContent = {
  hero: HeroContent;
  services: Service[];
  projects: GalleryItem[];
  articles: Insight[];
  testimonials: Testimonial[];
};

const defaults = (): SiteContent => ({
  hero: HERO,
  services: SERVICES,
  projects: GALLERY,
  articles: INSIGHTS,
  testimonials: TESTIMONIALS,
});

function load(): SiteContent {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      return { ...defaults(), ...parsed };
    }
  } catch {
    /* corrupted storage — fall through to defaults */
  }
  return defaults();
}

type ContentCtx = SiteContent & {
  setHero: (v: HeroContent) => void;
  setServices: (v: Service[]) => void;
  setProjects: (v: GalleryItem[]) => void;
  setArticles: (v: Insight[]) => void;
  setTestimonials: (v: Testimonial[]) => void;
  reset: () => void;
};

const Ctx = createContext<ContentCtx | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(load);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(content));
    } catch {
      /* storage full or unavailable */
    }
  }, [content]);

  const api: ContentCtx = {
    ...content,
    setHero: (hero) => setContent((c) => ({ ...c, hero })),
    setServices: (services) => setContent((c) => ({ ...c, services })),
    setProjects: (projects) => setContent((c) => ({ ...c, projects })),
    setArticles: (articles) => setContent((c) => ({ ...c, articles })),
    setTestimonials: (testimonials) => setContent((c) => ({ ...c, testimonials })),
    reset: () => setContent(defaults()),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useContent(): ContentCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}

export const uid = () => Math.random().toString(36).slice(2, 10);
