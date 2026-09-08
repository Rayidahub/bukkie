import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components/chrome";
import { WhatsAppButton } from "./components/WhatsAppButton";
import {
  AboutPage,
  AdminPage,
  BlogPage,
  ContactPage,
  Home,
  NotFound,
  ProjectsPage,
  ServicesPage,
  TestimonialsPage,
} from "./pages";
import { ContentProvider } from "./store";
import { ThemeProvider } from "./ThemeContext";
import { CONTACT } from "./data";

const PAGE_DATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Olowomakan Esther Bukola — Creative Graphics Designer",
    description: "Creative Graphics Designer & Digital Media Specialist in Ikorodu, Lagos. Building brands through visual storytelling, strategic communication, and print that survives the real world.",
  },
  "/services": {
    title: "Services — Esther Bukola",
    description: "Professional graphic design, digital media, branding, and communication services. From social media graphics to large-format printing, I help organizations communicate clearly and campaign boldly.",
  },
  "/about": {
    title: "About — Esther Bukola",
    description: "Learn about Olowomakan Esther Bukola, a detail-oriented creative professional with experience in graphics design, digital media, social media management, and IT support.",
  },
  "/projects": {
    title: "Projects — Esther Bukola",
    description: "Explore selected works including social media campaigns, print designs, branding projects, and video content for organizations across Nigeria.",
  },
  "/blog": {
    title: "Blog & Insights — Esther Bukola",
    description: "Notes from the studio desk. Practical lessons from real campaigns, print floors, and content systems — the thinking behind the portfolio.",
  },
  "/testimonials": {
    title: "Testimonials — Esther Bukola",
    description: "Kind words from the teams. Feedback from organizations behind the campaigns, newsletters, and outreach materials in this portfolio.",
  },
  "/contact": {
    title: "Contact — Esther Bukola",
    description: "Have a project in mind? Let's build something meaningful together. Get in touch with Esther Bukola for graphic design, digital media, and branding services.",
  },
  "/admin": {
    title: "Admin Studio — Esther Bukola",
    description: "Admin dashboard for managing portfolio content.",
  },
};

function ScrollAndTitle() {
  const { pathname } = useLocation();
  const pageData = PAGE_DATA[pathname] ?? PAGE_DATA["/"];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageData.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", pageData.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", pageData.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", pageData.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", pageData.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", pageData.description);
  }, [pathname, pageData]);

  return null;
}

function Shell() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-white font-body text-ink antialiased">
      <Navbar />
      {/* key remounts per route → subtle page-transition fade */}
      <main id="main" tabIndex={-1} key={pathname} className="animate-fade-in outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter>
          <ScrollAndTitle />
          <Shell />
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  );
}
