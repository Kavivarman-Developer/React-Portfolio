import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { PROJECTS } from "./portfolioData";

const pillClass = { cyan: "pill-cyan", violet: "pill-violet", pink: "pill-pink", green: "pill-green" };
const AUTO_SCROLL_DELAY = 5000;

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const prevProject = () => setActiveProject((index) => (index - 1 + PROJECTS.length) % PROJECTS.length);
  const nextProject = () => setActiveProject((index) => (index + 1) % PROJECTS.length);

  useEffect(() => {
    const interval = window.setInterval(nextProject, AUTO_SCROLL_DELAY);
    return () => window.clearInterval(interval);
  }, []);

  const visibleProjects = [
    (activeProject - 1 + PROJECTS.length) % PROJECTS.length,
    activeProject,
    (activeProject + 1) % PROJECTS.length,
  ];

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="projects-head">
          <div>
            <div className="section-label reveal">Work</div>
            <h2 className="section-title reveal reveal-delay-1">Selected <span className="gradient-text">Projects</span></h2>
            <p className="section-desc reveal reveal-delay-2">Real-world systems built for production. Slide through the builds, stacks, and demos.</p>
          </div>
          <div className="slider-controls reveal reveal-delay-2">
            <button className="slider-btn" type="button" aria-label="Previous project" onClick={prevProject}><FaChevronLeft /></button>
            <button className="slider-btn" type="button" aria-label="Next project" onClick={nextProject}><FaChevronRight /></button>
          </div>
        </div>

        <div className="projects-slider reveal reveal-delay-3">
          {visibleProjects.map((projectIndex, slot) => {
            const project = PROJECTS[projectIndex];
            const isActive = slot === 1;

            return (
              <article className={`project-card ${isActive ? "is-active" : "is-side"}`} key={`${project.num}-${slot}`} onClick={() => setActiveProject(projectIndex)}>
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={`${project.title} screenshot`} />
                  </div>
                )}
                <div className="project-header">
                  <div className="project-glow" style={{ background: project.color }} />
                  <div className="project-num">Project {project.num}</div>
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
                    <a className="project-btn" href={project.github} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><FaGithub /> GitHub</a>
                    <a className="project-btn primary" href={project.demo} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><FaExternalLinkAlt /> Live Demo</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="slider-dots reveal reveal-delay-4">
          {PROJECTS.map((project, index) => (
            <button
              className={`slider-dot${index === activeProject ? " active" : ""}`}
              type="button"
              aria-label={`Show project ${project.num}`}
              key={project.num}
              onClick={() => setActiveProject(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
