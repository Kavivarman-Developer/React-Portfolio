import { FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <div className="section-label reveal">About</div>
        <h2 className="section-title reveal reveal-delay-1">
          About Me
        </h2>
        <div className="bento-grid">
          <div className="bento-card bento-large reveal">
            <div className="bento-icon"><TbSparkles /></div>
            <div className="bento-heading">Kavi Varman - Full Stack Developer</div>
            <div className="bento-text">I am based in Tamil Nadu, India, and I build React and MERN stack projects with a focus on clear layouts, responsive screens, and simple user flows. I like turning rough ideas into working dashboards, portfolio sites, and business applications.</div>
          </div>
          <div className="bento-card bento-tall reveal reveal-delay-1">
            <div className="bento-icon"><FaGraduationCap /></div>
            <div className="bento-heading">Education</div>
            <div className="bento-text" style={{ marginBottom: 16 }}>Master's Degree<br /><span style={{ color: "var(--cyan)" }}>Annamalai University</span><br />2022-2024</div>
            <div className="bento-text">Bachelor's Degree<br /><span style={{ color: "var(--cyan)" }}>J J College of Arts & Science</span><br />2019-2022</div>
          </div>
          <div className="bento-card reveal reveal-delay-2"><div className="bento-number">7+</div><div className="bento-label">Projects built and deployed</div></div>
          <div className="bento-card reveal reveal-delay-3"><div className="bento-number">1+</div><div className="bento-label">Years of professional experience</div></div>
          <div className="bento-card reveal reveal-delay-1">
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span className="availability-dot" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>Available Now</span>
            </div>
            <div className="bento-text">Open to full-time roles, freelance projects, and collaborations where I can contribute to real product work.</div>
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
