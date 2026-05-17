import { useState } from "react";
import { FaBriefcase, FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const GITHUB_URL = "https://github.com/Kavivarman-Developer?tab=repositories";
const LINKEDIN_URL = "https://www.linkedin.com/in/kavivarman-s-ba57382a2";

const contacts = [
  { icon: <FaPhoneAlt />, label: "Phone", value: "+91 9943958576" },
  { icon: <FaEnvelope />, label: "Email", value: "kavivarman@example.com" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Pudukkottai, Tamil Nadu" },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="section-label reveal">Let's Connect</div>
        <h2 className="section-title reveal reveal-delay-1">Start a <span className="gradient-text">Project</span></h2>
        <div className="contact-grid">
          <div className="reveal reveal-delay-1">
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              Have a project in mind? I am open to freelance work, full-time opportunities, and interesting collaborations. Let's build something remarkable together.
            </p>
            {contacts.map((contact) => (
              <div className="contact-info-item" key={contact.label}>
                <div className="contact-icon">{contact.icon}</div>
                <div>
                  <div className="contact-label">{contact.label}</div>
                  <div className="contact-value">{contact.value}</div>
                </div>
              </div>
            ))}
            <div className="social-links">
              <a className="social-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a className="social-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a className="social-link" href="#" aria-label="Portfolio"><FaBriefcase /></a>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input id="name" className="form-input" placeholder="John Doe" value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" className="form-input" type="email" placeholder="john@company.com" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-input" placeholder="Tell me about your project..." value={formData.message} onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))} required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", fontSize: 15 }}>
                {sent ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
