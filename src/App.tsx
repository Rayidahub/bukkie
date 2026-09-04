import { Footer, Navbar } from "./components/chrome";
import { Hero } from "./components/hero";
import { AboutSection, ServicesSection } from "./components/about";
import { FeaturedProjects, Gallery, ToolsSection } from "./components/work";
import { ExperienceSection } from "./components/career";
import { Contact, Insights, Philosophy, Testimonials } from "./components/closing";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-body text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <ToolsSection />
        <Gallery />
        <FeaturedProjects />
        <ExperienceSection />
        <Philosophy />
        <Testimonials />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
