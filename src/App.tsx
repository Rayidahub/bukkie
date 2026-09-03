import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Cursor, Footer, Nav, Noise } from "./components/chrome";
import {
  AboutPage,
  ContactPage,
  ExperiencePage,
  HomePage,
  ProjectsPage,
  ScrollToTop,
  ServicesPage,
  SkillsPage,
  WorkPage,
} from "./pages";

function Shell() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <ScrollToTop />
      <Nav />
      {/* keyed by pathname so each page animates in on navigation */}
      <main key={location.pathname} className="page-in">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Noise />
      <Cursor />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
