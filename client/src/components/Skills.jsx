import { SKILLS } from "./portfolioData";

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="section-inner">
        <div className="section-label reveal">Technologies</div>
        <h2 className="section-title reveal reveal-delay-1">My <span className="gradient-text">Tech Stack</span></h2>
        <p className="section-desc reveal reveal-delay-2">The tools and technologies I use to build robust, scalable, and beautiful products.</p>
        <div className="skills-grid">
          {SKILLS.map((skill, index) => (
            <div className={`skill-chip reveal reveal-delay-${Math.min((index % 4) + 1, 4)}`} key={skill.name}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
