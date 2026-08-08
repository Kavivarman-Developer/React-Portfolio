import { useState } from "react";
import { FaBriefcase, FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { RESUME_BUTTON_ART, RESUME_DOWNLOAD_NAME, RESUME_FILE } from "./resumeConfig";

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
    toast.success("Message form submitted", {
      id: "contact-submit",
      duration: 1800,
    });
    window.setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="section-label reveal">Let's Connect</div>
        <h2 className="section-title reveal reveal-delay-1">Contact</h2>
        <div className="contact-grid">
          <div className="reveal reveal-delay-1">
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              Have a project, role, or collaboration in mind? Send the details and I will get back to you.
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
              <a className="social-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => toast.success("Opening GitHub", { id: "social-github", duration: 1500 })}><FaGithub /></a>
              <a className="social-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => toast.success("Opening LinkedIn", { id: "social-linkedin", duration: 1500 })}><FaLinkedinIn /></a>
              <a className="social-link" href="#" aria-label="Portfolio" onClick={() => toast.success("You clicked Portfolio", { id: "social-portfolio", duration: 1500 })}><FaBriefcase /></a>
            </div>
            <a className="contact-resume-link" href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME}>
              <img src={RESUME_BUTTON_ART} alt="" aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </div>
          <div className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input id="name" className="form-input" placeholder="Your name" value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" className="form-input" type="email" placeholder="yourmail@example.com" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} required />
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
