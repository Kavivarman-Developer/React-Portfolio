import { FaDownload } from "react-icons/fa";
import { RESUME_DOWNLOAD_NAME, RESUME_FILE } from "./resumeConfig";

const stats = [
  ["1+", "Years Experience"],
  ["8+", "Projects Built"],
  ["MERN", "Primary Stack"],
  ["Remote", "Available"],
];

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-badge reveal visible">kavi@dev ~ % whoami<span className="terminal-cursor" /></div>
            <h1 className="hero-title">
              <span className="line"><span className="word">Kavi</span></span>
              <span className="line"><span className="word">Varman</span> <span className="hero-title-s">S</span></span>
            </h1>
            <div className="hero-role reveal reveal-delay-1 visible">Full Stack Developer - MERN Stack</div>
            <p className="hero-sub reveal reveal-delay-1 visible">
              I build React interfaces, Node.js APIs, and MongoDB-backed applications for dashboards, business websites, and service portals. With 1+ years of hands-on work and 8+ projects built, I am open to remote, freelance, and full-time roles.
            </p>
            <div className="hero-actions reveal reveal-delay-2 visible">
              <button className="btn-primary" type="button" onClick={() => scrollTo("projects")}>View Projects</button>
              <a className="btn-resume" href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME}>
                <FaDownload /> Download Resume
              </a>
              <button className="btn-outline" type="button" onClick={() => scrollTo("contact")}>Let's Work Together</button>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-2 visible" aria-label="Developer profile code panel">
            <div className="code-panel">
              <div className="code-panel-top">
                <span />
                <span />
                <span />
                <div className="code-tab">kavi.dev.js</div>
              </div>
              <pre className="code-body">
                <code>
                  {`const developer = {
  name: 'Kavi Varman',
  role: 'Full Stack Developer',
  stack: ['React', 'Node.js', 'MongoDB', 'Express'],
  location: 'Tamil Nadu, IN',
  projects: '8+ built',
  status: 'available for work'
}`}
                </code>
              </pre>
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
