import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { PROJECT_ADS } from "./portfolioData";

const ROTATE_MS = 10000;

const ProjectSpotlight = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const activeAd = PROJECT_ADS[activeIndex];
  const hasDemo = activeAd.demo && activeAd.demo !== "#";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PROJECT_ADS.length);
      setIsVisible(true);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="project-spotlight" aria-live="polite" aria-label={`${activeAd.projectTitle} project advertisement`}>
      <button
        className="spotlight-close"
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Close project spotlight"
      >
        <FaTimes />
      </button>

      <div className="spotlight-window">
        <span />
        <span />
        <span />
        <strong>project-ad.exe</strong>
      </div>

      <div className="spotlight-body">
        <div className="spotlight-kicker">{activeAd.kicker}</div>
        <h3>{activeAd.title}</h3>
        <p>{activeAd.copy}</p>

        {hasDemo ? (
          <a className="spotlight-link" href={activeAd.demo} target="_blank" rel="noreferrer">
            View Live <FaExternalLinkAlt />
          </a>
        ) : (
          <span className="spotlight-status">Case study in progress</span>
        )}
      </div>

      <div className="spotlight-progress" key={activeAd.projectTitle}>
        <span />
      </div>
    </aside>
  );
};

export default ProjectSpotlight;
