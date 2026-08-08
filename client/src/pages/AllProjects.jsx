import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { PROJECTS } from "../components/portfolioData";
import "../components/portfolio.css";

const pillClass = { cyan: "pill-cyan", violet: "pill-violet", pink: "pill-pink", green: "pill-green" };

const AllProjects = () => {
  const navigate = useNavigate();

  return (
    <div className="kavi-page projects-page">
      <Navbar />
      <main className="projects-archive">
        <div className="section-inner">
          <button className="archive-back" type="button" onClick={() => navigate("/")}>
            <FaArrowLeft /> Back Home
          </button>

          <div className="section-label">Projects</div>
          <h1 className="section-title">All Project Work</h1>
          <p className="section-desc">
            A complete view of the portfolio projects, live links, stack, and current case-study status.
          </p>

          <div className="archive-count">{PROJECTS.length} projects listed</div>

          <div className="archive-grid">
            {PROJECTS.map((project) => (
              <article className="archive-card" key={project.num}>
                {project.image && (
                  <div className="archive-image">
                    <div className="browser-frame">
                      <span />
                      <span />
                      <span />
                    </div>
                    <img src={project.image} alt={`${project.title} screenshot`} />
                  </div>
                )}

                <div className="archive-content">
                  <div className="project-num">Case {project.num}</div>
                  <h2>{project.title}</h2>
                  <p>{project.desc}</p>

                  <div className="tech-pills">
                    {project.stack.map(([name, variant]) => (
                      <span className={`tech-pill ${pillClass[variant]}`} key={name}>{name}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.github !== "#" && (
                      <a className="project-btn" href={project.github} target="_blank" rel="noreferrer" onClick={() => toast.success(`Opening ${project.title} GitHub`, { id: `archive-github-${project.num}`, duration: 1600 })}>
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.demo !== "#" && (
                      <a className="project-btn primary" href={project.demo} target="_blank" rel="noreferrer" onClick={() => toast.success(`Opening ${project.title}`, { id: `archive-demo-${project.num}`, duration: 1600 })}>
                        <FaExternalLinkAlt /> Live Demo
                      </a>
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
      </main>
      <SiteFooter />
    </div>
  );
};

export default AllProjects;
