import "../components/portfolio.css";
import About from "../components/About";
import BackToTop from "../components/BackToTop";
import ContactForm from "../components/ContactForm";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import PortfolioEffects from "../components/PortfolioEffects";
import Projects from "../components/Projects";
import Services from "../components/Services";
import SiteFooter from "../components/SiteFooter";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import { useReveal } from "../components/portfolioHooks";

const Home = () => {
  useReveal();

  return (
    <div className="kavi-page">
      <PortfolioEffects />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Testimonials />
      <ContactForm />
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default Home;
