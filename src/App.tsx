import { Cursor, Footer, Nav, Noise } from "./components/chrome";
import { Hero } from "./components/hero";
import { About, Services } from "./components/about";
import { FeaturedProjects, Gallery } from "./components/work";
import { Experience, Skills } from "./components/career";
import { Contact, Philosophy, Testimonials } from "./components/closing";

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <Philosophy />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Noise />
      <Cursor />
    </div>
  );
}
