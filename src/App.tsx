import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components/chrome";
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

const TITLES: Record<string, string> = {
  "/": "Olowomakan Esther Bukola — Creative Graphics Designer",
  "/services": "Services — Esther Bukola",
  "/about": "About — Esther Bukola",
  "/projects": "Projects — Esther Bukola",
  "/blog": "Blog & Insights — Esther Bukola",
  "/testimonials": "Testimonials — Esther Bukola",
  "/contact": "Contact — Esther Bukola",
  "/admin": "Admin Studio — Esther Bukola",
};

function ScrollAndTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] ?? TITLES["/"];
  }, [pathname]);
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
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <ScrollAndTitle />
        <Shell />
      </HashRouter>
    </ContentProvider>
  );
}
