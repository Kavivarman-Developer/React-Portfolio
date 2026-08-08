import { SKILL_GROUPS } from "./portfolioData";

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="section-inner">
        <div className="section-label reveal">Technologies</div>
        <h2 className="section-title reveal reveal-delay-1">Tech Stack</h2>
        <p className="section-desc reveal reveal-delay-2">Tools I use regularly for frontend, backend, database, deployment, and API-based work.</p>
        <div className="skill-groups">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <div className={`skill-group reveal reveal-delay-${groupIndex + 1}`} key={group.label}>
              <div className="skill-group-label">{group.label}</div>
              <div className="skills-grid">
                {group.items.map((skill, skillIndex) => (
                  <div className="skill-chip" style={{ "--skill-delay": `${skillIndex * 45}ms` }} key={skill.name}>
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-name">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
