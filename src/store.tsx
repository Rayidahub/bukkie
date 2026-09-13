import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from './lib/supabase';
import { 
  SERVICES as DEFAULT_SERVICES, 
  GALLERY as DEFAULT_PROJECTS, 
  INSIGHTS as DEFAULT_ARTICLES, 
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  HERO as DEFAULT_HERO,
  ABOUT as DEFAULT_ABOUT,
  SOCIAL_LINKS as DEFAULT_SOCIAL_LINKS,
  FOOTER as DEFAULT_FOOTER,
  CONTACT_CONTENT as DEFAULT_CONTACT,
  DEFAULT_CATEGORIES,
  type Service,
  type GalleryItem,
  type Insight,
  type HeroContent,
  type AboutContent,
  type SocialLink,
  type FooterContent,
  type ContactContent,
  type Category
} from './data';

export type Testimonial = (typeof DEFAULT_TESTIMONIALS)[number];

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  projects: GalleryItem[];
  articles: Insight[];
  testimonials: Testimonial[];
  socialLinks: SocialLink[];
  footer: FooterContent;
  contact: ContactContent;
  categories: Category[];
};

type ContentCtx = SiteContent & {
  loading: boolean;
  setHero: (v: HeroContent) => Promise<void>;
  setAbout: (v: AboutContent) => Promise<void>;
  setServices: (v: Service[]) => Promise<void>;
  setProjects: (v: GalleryItem[]) => Promise<void>;
  setArticles: (v: Insight[]) => Promise<void>;
  setTestimonials: (v: Testimonial[]) => Promise<void>;
  setSocialLinks: (v: SocialLink[]) => Promise<void>;
  setFooter: (v: FooterContent) => Promise<void>;
  setContact: (v: ContactContent) => Promise<void>;
  setCategories: (v: Category[]) => Promise<void>;
  uploadImage: (file: File, folder?: string) => Promise<string>;
  reset: () => Promise<void>;
};

const ContentContext = createContext<ContentCtx | undefined>(undefined);

// Helper to convert database row to Service type
function rowToService(row: any): Service {
  return {
    no: row.no,
    title: row.title,
    kicker: row.kicker,
    desc: row.description,
    tags: row.tags || [],
    icon: row.icon as 'pen' | 'chat' | 'chip',
    featured: row.featured || false,
  };
}

// Helper to convert database row to GalleryItem type
function rowToProject(row: any): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    org: row.org,
    cat: row.category as any,
    year: row.year,
    img: row.image,
    ratio: 'aspect-[4/3]',
    study: {
      type: row.study_type || '',
      objective: row.objective || '',
      deliverables: row.deliverables || [],
      tools: row.tools || [],
      impact: row.impact || '',
    },
  };
}

// Helper to convert database row to Insight type
function rowToArticle(row: any): Insight {
  return {
    id: row.id,
    tag: row.tag,
    title: row.title,
    excerpt: row.excerpt,
    cover: row.cover,
    date: row.date,
    read: row.read_time || '3 min read',
    body: row.body || [],
  };
}

// Helper to convert database row to Testimonial type
function rowToTestimonial(row: any): Testimonial {
  return {
    quote: row.quote,
    name: row.name,
    role: row.role,
    org: row.org,
    avatar: row.avatar || '',
  };
}

// Helper to convert database row to SocialLink type
function rowToSocialLink(row: any): SocialLink {
  return {
    platform: row.platform as any,
    url: row.url || '',
    label: row.label,
  };
}

// Cache version - increment when data structure changes
const CACHE_VERSION = '1.0.0';

export function ContentProvider({ children }: { children: ReactNode }) {
  // Try to load from sessionStorage cache first for instant loading
  const getCachedContent = (): SiteContent => {
    try {
      const cached = sessionStorage.getItem('portfolio_cache');
      const cachedVersion = sessionStorage.getItem('portfolio_cache_version');
      
      if (cached && cachedVersion === CACHE_VERSION) {
        const parsed = JSON.parse(cached);
        // Validate cached data has all required fields
        // If any field is missing, return defaults instead
        if (
          parsed.hero &&
          parsed.about &&
          parsed.services &&
          parsed.projects &&
          parsed.articles &&
          parsed.testimonials &&
          parsed.socialLinks &&
          parsed.footer &&
          parsed.contact
        ) {
          return parsed;
        }
        // Cache is incomplete, clear it and return defaults
        sessionStorage.removeItem('portfolio_cache');
        sessionStorage.removeItem('portfolio_cache_version');
      } else if (cached && cachedVersion !== CACHE_VERSION) {
        // Cache version mismatch, clear old cache
        sessionStorage.removeItem('portfolio_cache');
        sessionStorage.removeItem('portfolio_cache_version');
      }
    } catch (error) {
      console.error('Error loading cache:', error);
      // Clear corrupted cache
      sessionStorage.removeItem('portfolio_cache');
      sessionStorage.removeItem('portfolio_cache_version');
    }
    // Return defaults if no cache or invalid cache
    return {
      hero: DEFAULT_HERO,
      about: DEFAULT_ABOUT,
      services: DEFAULT_SERVICES,
      projects: DEFAULT_PROJECTS,
      articles: DEFAULT_ARTICLES,
      testimonials: DEFAULT_TESTIMONIALS,
      socialLinks: DEFAULT_SOCIAL_LINKS,
      footer: DEFAULT_FOOTER,
      contact: DEFAULT_CONTACT,
      categories: DEFAULT_CATEGORIES,
    };
  };

  const [content, setContent] = useState<SiteContent>(getCachedContent());
  const [loading, setLoading] = useState(true);

  // Load all data from Supabase on mount - OPTIMIZED FOR SPEED
  useEffect(() => {
    async function loadData() {
      try {
        // Check if we have valid cache first - if yes, show it immediately
        const cachedContent = getCachedContent();
        const hasCache = sessionStorage.getItem('portfolio_cache') !== null;
        
        // If we have cache, show it immediately and refresh in background
        if (hasCache) {
          setContent(cachedContent);
          setLoading(false);
          
          // Refresh from Supabase in background (don't block UI)
          refreshFromSupabase();
          return;
        }
        
        // No cache - load everything from Supabase
        await refreshFromSupabase();
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    }

    async function refreshFromSupabase() {
      try {
        // Load ALL data in PARALLEL for maximum speed
        const [
          { data: heroData },
          { data: aboutData },
          { data: servicesData },
          { data: projectsData },
          { data: articlesData },
          { data: testimonialsData },
          { data: socialData },
        ] = await Promise.all([
          supabase.from('hero_content').select('*').single(),
          supabase.from('about_content').select('*').single(),
          supabase.from('services').select('*').order('sort_order'),
          supabase.from('projects').select('*').order('sort_order'),
          supabase.from('articles').select('*').order('sort_order'),
          supabase.from('testimonials').select('*').order('sort_order'),
          supabase.from('social_links').select('*').order('sort_order'),
        ]);

        // Build complete content object
        const newContent: SiteContent = {
          hero: heroData ? {
            eyebrow: heroData.eyebrow,
            greeting: heroData.greeting,
            line2: heroData.line2,
            highlight: heroData.highlight,
            paragraph: heroData.paragraph,
            primary: { label: heroData.primary_label, link: heroData.primary_link },
            secondary: { label: heroData.secondary_label, link: heroData.secondary_link },
            teamsLabel: heroData.teams_label,
            orgs: heroData.orgs,
            portrait: heroData.portrait,
            tags: heroData.tags,
            badgeLabel: heroData.badge_label,
            availability: heroData.availability,
            coords: heroData.coords,
            tickerWords: heroData.ticker_words,
          } : DEFAULT_HERO,
          
          about: aboutData ? {
            image: aboutData.image,
            tag1: aboutData.tag1,
            tag2: aboutData.tag2,
            eyebrow: aboutData.eyebrow,
            heading1: aboutData.heading1,
            heading2: aboutData.heading2,
            intro: aboutData.intro,
            approach: aboutData.approach,
            mission: aboutData.mission,
            cvLabel: aboutData.cv_label,
            expLabel: aboutData.exp_label,
            stats: [],
          } : DEFAULT_ABOUT,
          
          services: servicesData && servicesData.length > 0 
            ? servicesData.map(rowToService) 
            : DEFAULT_SERVICES,
            
          projects: projectsData && projectsData.length > 0 
            ? projectsData.map(rowToProject) 
            : DEFAULT_PROJECTS,
            
          articles: articlesData && articlesData.length > 0 
            ? articlesData.map(rowToArticle) 
            : DEFAULT_ARTICLES,
            
          testimonials: testimonialsData && testimonialsData.length > 0 
            ? testimonialsData.map(rowToTestimonial) 
            : DEFAULT_TESTIMONIALS,
            
          socialLinks: socialData && socialData.length > 0 
            ? socialData.map(rowToSocialLink) 
            : DEFAULT_SOCIAL_LINKS,
            
          footer: DEFAULT_FOOTER,
          contact: DEFAULT_CONTACT,
          categories: DEFAULT_CATEGORIES,
        };

        // Update state with all data at once
        setContent(newContent);
        
        // Cache the loaded data for instant loading next time
        try {
          sessionStorage.setItem('portfolio_cache', JSON.stringify(newContent));
          sessionStorage.setItem('portfolio_cache_version', CACHE_VERSION);
        } catch (error) {
          console.error('Error caching data:', error);
        }
      } catch (error) {
        console.error('Error refreshing from Supabase:', error);
      }
    }

    loadData();
  }, []);

  // Helper to update cache
  const updateCache = (content: SiteContent) => {
    try {
      // Don't cache base64 images in sessionStorage (too large)
      // Images should be stored in Supabase Storage
      const cacheableContent = { ...content };
      sessionStorage.setItem('portfolio_cache', JSON.stringify(cacheableContent));
      sessionStorage.setItem('portfolio_cache_version', CACHE_VERSION);
    } catch (error) {
      console.error('Error caching:', error);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File, folder: string = 'images'): Promise<string> => {
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(data.path);
      
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  };

  // Update hero content
  const setHero = async (hero: HeroContent) => {
    setContent(prev => {
      const updated = { ...prev, hero };
      updateCache(updated);
      return updated;
    });
    
    const { error } = await supabase
      .from('hero_content')
      .update({
        eyebrow: hero.eyebrow,
        greeting: hero.greeting,
        line2: hero.line2,
        highlight: hero.highlight,
        paragraph: hero.paragraph,
        primary_label: hero.primary.label,
        primary_link: hero.primary.link,
        secondary_label: hero.secondary.label,
        secondary_link: hero.secondary.link,
        teams_label: hero.teamsLabel,
        orgs: hero.orgs,
        portrait: hero.portrait,
        tags: hero.tags,
        badge_label: hero.badgeLabel,
        availability: hero.availability,
        coords: hero.coords,
        ticker_words: hero.tickerWords,
      })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update first row
    
    if (error) console.error('Error updating hero:', error);
  };

  // Update about content
  const setAbout = async (about: AboutContent) => {
    setContent(prev => {
      const updated = { ...prev, about };
      updateCache(updated);
      return updated;
    });
    
    const { error } = await supabase
      .from('about_content')
      .update({
        image: about.image,
        tag1: about.tag1,
        tag2: about.tag2,
        eyebrow: about.eyebrow,
        heading1: about.heading1,
        heading2: about.heading2,
        intro: about.intro,
        approach: about.approach,
        mission: about.mission,
        cv_label: about.cvLabel,
        exp_label: about.expLabel,
      })
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (error) console.error('Error updating about:', error);
  };

  // Update services
  const setServices = async (services: Service[]) => {
    setContent(prev => {
      const updated = { ...prev, services };
      updateCache(updated);
      return updated;
    });
    
    // Delete all existing services and insert new ones
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const servicesToInsert = services.map((s, i) => ({
      no: s.no,
      title: s.title,
      kicker: s.kicker,
      description: s.desc,
      tags: s.tags,
      icon: s.icon,
      featured: s.featured || false,
      sort_order: i,
    }));
    
    const { error } = await supabase.from('services').insert(servicesToInsert);
    if (error) console.error('Error updating services:', error);
  };

  // Update projects
  const setProjects = async (projects: GalleryItem[]) => {
    setContent(prev => {
      const updated = { ...prev, projects };
      updateCache(updated);
      return updated;
    });
    
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const projectsToInsert = projects.map((p, i) => ({
      title: p.title,
      org: p.org,
      category: p.cat,
      year: p.year,
      image: p.img,
      study_type: p.study.type,
      objective: p.study.objective,
      deliverables: p.study.deliverables,
      tools: p.study.tools,
      impact: p.study.impact,
      sort_order: i,
    }));
    
    const { error } = await supabase.from('projects').insert(projectsToInsert);
    if (error) console.error('Error updating projects:', error);
  };

  // Update articles
  const setArticles = async (articles: Insight[]) => {
    setContent(prev => {
      const updated = { ...prev, articles };
      updateCache(updated);
      return updated;
    });
    
    await supabase.from('articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const articlesToInsert = articles.map((a, i) => ({
      tag: a.tag,
      title: a.title,
      excerpt: a.excerpt,
      cover: a.cover,
      date: a.date,
      read_time: a.read,
      body: a.body,
      sort_order: i,
    }));
    
    const { error } = await supabase.from('articles').insert(articlesToInsert);
    if (error) console.error('Error updating articles:', error);
  };

  // Update testimonials
  const setTestimonials = async (testimonials: Testimonial[]) => {
    setContent(prev => {
      const updated = { ...prev, testimonials };
      updateCache(updated);
      return updated;
    });
    
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const testimonialsToInsert = testimonials.map((t, i) => ({
      quote: t.quote,
      name: t.name,
      role: t.role,
      org: t.org,
      avatar: t.avatar || '',
      sort_order: i,
    }));
    
    const { error } = await supabase.from('testimonials').insert(testimonialsToInsert);
    if (error) console.error('Error updating testimonials:', error);
  };

  // Update social links
  const setSocialLinks = async (socialLinks: SocialLink[]) => {
    setContent(prev => {
      const updated = { ...prev, socialLinks };
      updateCache(updated);
      return updated;
    });
    
    await supabase.from('social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const socialToInsert = socialLinks.map((s, i) => ({
      platform: s.platform,
      url: s.url,
      label: s.label,
      sort_order: i,
    }));
    
    const { error } = await supabase.from('social_links').insert(socialToInsert);
    if (error) console.error('Error updating social links:', error);
  };

  // Update footer content
  const setFooter = async (footer: FooterContent) => {
    setContent(prev => {
      const updated = { ...prev, footer };
      updateCache(updated);
      return updated;
    });
  };

  // Update contact content
  const setContact = async (contact: ContactContent) => {
    setContent(prev => {
      const updated = { ...prev, contact };
      updateCache(updated);
      return updated;
    });
  };

  // Reset to defaults
  const reset = async () => {
    const defaults: SiteContent = {
      hero: DEFAULT_HERO,
      about: DEFAULT_ABOUT,
      services: DEFAULT_SERVICES,
      projects: DEFAULT_PROJECTS,
      articles: DEFAULT_ARTICLES,
      testimonials: DEFAULT_TESTIMONIALS,
      socialLinks: DEFAULT_SOCIAL_LINKS,
      footer: DEFAULT_FOOTER,
      contact: DEFAULT_CONTACT,
      categories: DEFAULT_CATEGORIES,
    };
    
    setContent(defaults);
    
    // Reset all tables
    await setHero(defaults.hero);
    await setAbout(defaults.about);
    await setServices(defaults.services);
    await setProjects(defaults.projects);
    await setArticles(defaults.articles);
    await setTestimonials(defaults.testimonials);
    await setSocialLinks(defaults.socialLinks);
    await setFooter(defaults.footer);
    await setContact(defaults.contact);
    await setCategories(defaults.categories);
  };

  // Update categories
  const setCategories = async (categories: Category[]) => {
    setContent(prev => {
      const updated = { ...prev, categories };
      updateCache(updated);
      return updated;
    });
  };

  const api: ContentCtx = {
    ...content,
    loading,
    setHero,
    setAbout,
    setServices,
    setProjects,
    setArticles,
    setTestimonials,
    setSocialLinks,
    setFooter,
    setContact,
    setCategories,
    uploadImage,
    reset,
  };

  return <ContentContext.Provider value={api}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
