const experience = [
  { period: "2023 - Present", role: "Full Stack Developer", company: "Freelance / Remote", desc: "Delivered 7+ production applications across CRM, EdTech, and SaaS verticals. Specialized in real-time features with Socket.IO and modern React patterns." },
  { period: "2022 - 2023", role: "Frontend Developer", company: "Startup, Tamil Nadu", desc: "Built responsive React UIs with Tailwind CSS. Integrated REST APIs and Firebase services. Improved Lighthouse performance scores by 40%." },
  { period: "2021 - 2022", role: "Web Developer Intern", company: "Agency, Pudukkottai", desc: "Developed client websites using HTML, CSS, JavaScript, and PHP. Handled WordPress customization and SEO optimization." },
];

const Experience = () => {
  return (
    <section id="experience" className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="section-inner experience-layout">
        <div>
          <div className="section-label reveal">Journey</div>
          <h2 className="section-title reveal reveal-delay-1">Work <span className="gradient-text">Experience</span></h2>
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
