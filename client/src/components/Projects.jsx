import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { PROJECTS } from "./portfolioData";

const pillClass = { cyan: "pill-cyan", violet: "pill-violet", pink: "pill-pink", green: "pill-green" };

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="projects-head">
          <div>
            <div className="section-label reveal">Work</div>
            <h2 className="section-title reveal reveal-delay-1">Project Showcase</h2>
            <p className="section-desc reveal reveal-delay-2">
              Scroll through production websites, dashboards, and application interfaces. Each project is presented like a compact case study.
            </p>
          </div>
          <div className="project-scroll-note reveal reveal-delay-2">Scroll sideways</div>
        </div>

        <div className="projects-slider reveal reveal-delay-3" aria-label="Scrollable project showcase">
          {PROJECTS.map((project) => (
              <article className="project-card" key={project.num}>
                {project.image && (
                  <div className="project-image">
                    <div className="browser-frame">
                      <span />
                      <span />
                      <span />
                    </div>
                    <img src={project.image} alt={`${project.title} screenshot`} />
                  </div>
                )}
                <div className="project-header">
                  <div className="project-glow" style={{ background: project.color }} />
                  <div className="project-num">Case {project.num}</div>
                  <div className="project-title">{project.title}</div>
                  <div className="project-desc">{project.desc}</div>
                </div>
                <div className="project-body">
                  <div className="tech-pills">
                    {project.stack.map(([name, variant]) => (
                      <span className={`tech-pill ${pillClass[variant]}`} key={name}>{name}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.github !== "#" && (
                      <a className="project-btn" href={project.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
                    )}
                    {project.demo !== "#" && (
                      <a className="project-btn primary" href={project.demo} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                    )}
                    {project.github === "#" && project.demo === "#" && (
                      <span className="project-status">Case study in progress</span>
                    )}
                  </div>
                </div>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
