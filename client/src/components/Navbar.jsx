import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { RESUME_DOWNLOAD_NAME, RESUME_FILE } from "./resumeConfig";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    toast.success(`You clicked ${id.charAt(0).toUpperCase() + id.slice(1)}`, {
      id: `nav-${id}`,
      duration: 1500,
    });
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  const handleDashboardNav = (tab) => {
    setMenuOpen(false);
    toast.success(`Opening ${tab === "projects" ? "Project View" : "Digital Marketing"}`, {
      id: `dashboard-${tab}`,
      duration: 1500,
    });
    navigate(`/dashboard?tab=${tab}`);
  };

  const dashboardTab = new URLSearchParams(location.search).get("tab");

  return (
    <nav className={`navbar${scrolled || menuOpen ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            toast.success("You clicked Home", { id: "nav-home", duration: 1500 });
            navigate("/");
          }}
        >
          Kavi Varman <span className="logo-suffix">S</span>
        </div>

        <ul className="nav-links">
          {!isDashboard && links.map((link) => (
            <li key={link}>
              <a href={`/#${link.toLowerCase()}`} onClick={(event) => handleNavClick(event, link.toLowerCase())}>
                {link.toUpperCase()}
              </a>
            </li>
          ))}

          {isDashboard && (
            <>
              <li>
                <a
                  href="#project-view"
                  onClick={(event) => { event.preventDefault(); handleDashboardNav("projects"); }}
                  style={{ color: dashboardTab === "projects" ? "var(--cyan)" : undefined }}
                >
                  PROJECT VIEW
                </a>
              </li>
              <li>
                <a
                  href="#digital-marketing"
                  onClick={(event) => { event.preventDefault(); handleDashboardNav("marketing"); }}
                  style={{ color: dashboardTab === "marketing" ? "var(--cyan)" : undefined }}
                >
                  DIGITAL MARKETING
                </a>
              </li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          <button className="nav-cta" type="button" onClick={() => scrollToSection("contact")}>
            <span>Available for Work</span>
          </button>

          <a className="nav-resume" href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME} aria-label="Download resume">
            <FaDownload />
            <span>Resume</span>
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {!isDashboard && links.map((link) => (
          <a href={`/#${link.toLowerCase()}`} key={link} onClick={(event) => handleNavClick(event, link.toLowerCase())}>
            {link}
          </a>
        ))}

        {isDashboard && (
          <>
            <a href="#project-view" onClick={(event) => { event.preventDefault(); handleDashboardNav("projects"); }}>
              Project View
            </a>
            <a href="#digital-marketing" onClick={(event) => { event.preventDefault(); handleDashboardNav("marketing"); }}>
              Digital Marketing
            </a>
          </>
        )}

        <button type="button" onClick={() => scrollToSection("contact")}>
          Available for Work
        </button>
        <a href={RESUME_FILE} download={RESUME_DOWNLOAD_NAME}>
          Download Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
