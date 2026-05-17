import { useTypewriter } from "./portfolioHooks";
import heroImage from "../assets/portfolio.png";

const stats = [
  ["1+", "Years Experience"],
  ["7+", "Projects Shipped"],
  ["10+", "Technologies"],
  ["100%", "Client Satisfaction"],
];

const Hero = () => {
  const typed = useTypewriter(["Full Stack Developer", "UI/UX Craftsman", "MERN Specialist", "Problem Solver"]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-badge reveal visible">Available for Freelance Work</div>
            <h1 className="hero-title">
              <span className="line"><span className="word">Kavi</span></span>
              <span className="line"><span className="word gradient-text">Varman</span></span>
            </h1>
            <p className="hero-sub reveal reveal-delay-1 visible">
              <span style={{ color: "var(--text)", fontWeight: 500 }}>
                {typed}<span className="typewriter-cursor">|</span>
              </span>{" "}
              - crafting high-performance web experiences with React, Node.js and modern tooling.
            </p>
            <div className="hero-actions reveal reveal-delay-2 visible">
              <button className="btn-primary" type="button" onClick={() => scrollTo("contact")}>Let's Work Together</button>
              <button className="btn-outline" type="button" onClick={() => scrollTo("projects")}>View Projects</button>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-2 visible" aria-label="Portfolio preview">
            <div className="hero-visual-ring" />
            <div className="hero-image-card">
              <img src={heroImage} alt="Kavi Varman portfolio preview" />
            </div>
            <div className="hero-floating-card hero-floating-card-top">
              <span>React</span>
              <strong>UI Systems</strong>
            </div>
            <div className="hero-floating-card hero-floating-card-bottom">
              <span>MERN</span>
              <strong>Full Stack</strong>
            </div>
          </div>
        </div>

        <div className="hero-stats reveal reveal-delay-3 visible">
          {stats.map(([number, label]) => (
            <div className="stat-item" key={label}>
              <div className="stat-num">{number}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
