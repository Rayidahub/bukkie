import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GALLERY,
  INSIGHTS,
  SERVICES,
  TESTIMONIALS,
  type GalleryItem,
  type Insight,
  type Service,
} from "./data";

export type Testimonial = (typeof TESTIMONIALS)[number];

export interface ContentState {
  services: Service[];
  projects: GalleryItem[];
  articles: Insight[];
  testimonials: Testimonial[];
}

const STORAGE_KEY = "eb-portfolio-cms-v1";

function defaults(): ContentState {
  return {
    services: SERVICES,
    projects: GALLERY,
    articles: INSIGHTS,
    testimonials: TESTIMONIALS,
  };
}

function load(): ContentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<ContentState>;
      const d = defaults();
      return {
        services: Array.isArray(p.services) && p.services.length ? p.services : d.services,
        projects: Array.isArray(p.projects) && p.projects.length ? p.projects : d.projects,
        articles: Array.isArray(p.articles) && p.articles.length ? p.articles : d.articles,
        testimonials:
          Array.isArray(p.testimonials) && p.testimonials.length ? p.testimonials : d.testimonials,
      };
    }
  } catch {
    /* corrupted storage → fall back to defaults */
  }
  return defaults();
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

interface ContentApi extends ContentState {
  isCustomized: boolean;
  saveService: (s: Service) => void;
  deleteService: (no: string) => void;
  saveProject: (p: GalleryItem) => void;
  deleteProject: (id: string) => void;
  saveArticle: (a: Insight) => void;
  deleteArticle: (id: string) => void;
  saveTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (org: string) => void;
  resetAll: () => void;
  exportJson: () => string;
}

const Ctx = createContext<ContentApi | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(load);
  const [isCustomized, setIsCustomized] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== null
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setIsCustomized(true);
    } catch {
      /* storage full / unavailable */
    }
  }, [state]);

  const api = useMemo<ContentApi>(
    () => ({
      ...state,
      isCustomized,
      saveService: (s) =>
        setState((prev) => {
          const exists = prev.services.some((x) => x.no === s.no);
          return {
            ...prev,
            services: exists
              ? prev.services.map((x) => (x.no === s.no ? s : x))
              : [...prev.services, s],
          };
        }),
      deleteService: (no) =>
        setState((prev) => ({
          ...prev,
          services: prev.services.filter((x) => x.no !== no),
        })),
      saveProject: (p) =>
        setState((prev) => {
          const exists = prev.projects.some((x) => x.id === p.id);
          return {
            ...prev,
            projects: exists
              ? prev.projects.map((x) => (x.id === p.id ? p : x))
              : [...prev.projects, p],
          };
        }),
      deleteProject: (id) =>
        setState((prev) => ({
          ...prev,
          projects: prev.projects.filter((x) => x.id !== id),
        })),
      saveArticle: (a) =>
        setState((prev) => {
          const exists = prev.articles.some((x) => x.id === a.id);
          return {
            ...prev,
            articles: exists
              ? prev.articles.map((x) => (x.id === a.id ? a : x))
              : [...prev.articles, a],
          };
        }),
      deleteArticle: (id) =>
        setState((prev) => ({
          ...prev,
          articles: prev.articles.filter((x) => x.id !== id),
        })),
      saveTestimonial: (t) =>
        setState((prev) => {
          const exists = prev.testimonials.some((x) => x.org === t.org);
          return {
            ...prev,
            testimonials: exists
              ? prev.testimonials.map((x) => (x.org === t.org ? t : x))
              : [...prev.testimonials, t],
          };
        }),
      deleteTestimonial: (org) =>
        setState((prev) => ({
          ...prev,
          testimonials: prev.testimonials.filter((x) => x.org !== org),
        })),
      resetAll: () => {
        localStorage.removeItem(STORAGE_KEY);
        setIsCustomized(false);
        setState(defaults());
      },
      exportJson: () => JSON.stringify(state, null, 2),
    }),
    [state, isCustomized]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useContent(): ContentApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useContent must be used inside ContentProvider");
  return v;
}
