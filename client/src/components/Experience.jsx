const experience = [
  { period: "2023 - Present", role: "Full Stack Developer", company: "Freelance / Remote", desc: "Built React and MERN stack projects including dashboards, forms, admin screens, and deployed frontend applications." },
  { period: "2022 - 2023", role: "Frontend Developer", company: "Project-based Work", desc: "Created responsive interfaces, connected REST APIs, and improved UI consistency across desktop and mobile screens." },
  { period: "2021 - 2022", role: "Web Developer Intern", company: "Pudukkottai", desc: "Worked with HTML, CSS, JavaScript, PHP, and basic SEO while learning practical client website development." },
];

const Experience = () => {
  return (
    <section id="experience" className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="section-inner experience-layout">
        <div>
          <div className="section-label reveal">Journey</div>
          <h2 className="section-title reveal reveal-delay-1">Experience</h2>
          <p className="section-desc reveal reveal-delay-2">Building real products, solving real problems.</p>
        </div>
        <div className="exp-timeline">
          {experience.map((item, index) => (
            <div className={`exp-item reveal reveal-delay-${index + 1}`} key={item.role}>
              <div className="exp-period">{item.period}</div>
              <div className="exp-role">{item.role}</div>
              <div className="exp-company">{item.company}</div>
              <div className="exp-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
