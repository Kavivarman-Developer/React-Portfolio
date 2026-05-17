import { FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="section-label reveal">About</div>
        <h2 className="section-title reveal reveal-delay-1">
          Crafting Digital<br /><span className="gradient-text">Experiences</span>
        </h2>
        <div className="bento-grid">
          <div className="bento-card bento-large reveal">
            <div className="bento-icon"><TbSparkles /></div>
            <div className="bento-heading">Kavi Varman - Full Stack Developer</div>
            <div className="bento-text">Based in Tamil Nadu, India. I build scalable, real-time web applications with an obsession for clean architecture, polished UI, and delightful user interactions. MERN stack is my home, but I am always exploring new frontiers.</div>
          </div>
          <div className="bento-card bento-tall reveal reveal-delay-1">
            <div className="bento-icon"><FaGraduationCap /></div>
            <div className="bento-heading">Education</div>
            <div className="bento-text" style={{ marginBottom: 16 }}>Master's Degree<br /><span style={{ color: "var(--cyan)" }}>Annamalai University</span><br />2022-2024</div>
            <div className="bento-text">Bachelor's Degree<br /><span style={{ color: "var(--cyan)" }}>J J College of Arts & Science</span><br />2019-2022</div>
          </div>
          <div className="bento-card reveal reveal-delay-2"><div className="bento-number">7+</div><div className="bento-label">Projects shipped in production</div></div>
          <div className="bento-card reveal reveal-delay-3"><div className="bento-number">1+</div><div className="bento-label">Years of professional experience</div></div>
          <div className="bento-card reveal reveal-delay-1">
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span className="availability-dot" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>Available Now</span>
            </div>
            <div className="bento-text">Open to full-time roles, freelance projects, and interesting collaborations worldwide.</div>
          </div>
          <div className="bento-card reveal reveal-delay-2">
            <div className="bento-icon"><FaMapMarkerAlt /></div>
            <div className="bento-heading" style={{ fontSize: 16 }}>Pudukkottai</div>
            <div className="bento-text">Tamil Nadu, India - Remote-first mindset</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
