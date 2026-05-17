import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const handleDashboardNav = (tab) => {
    setMenuOpen(false);
    navigate(`/dashboard?tab=${tab}`);
  };

  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav className={`navbar${scrolled || menuOpen ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>KV.</div>

        <ul className="nav-links">
          {/* Home page section links — hide on dashboard */}
          {!isDashboard && links.map((link) => (
            <li key={link}>
              <a
                href={`/#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link.toLowerCase())}
              >
                {link}
              </a>
            </li>
          ))}

          {/* Dashboard links — always visible */}
          <li>
            <a
              href="#project-view"
              onClick={(e) => { e.preventDefault(); handleDashboardNav("projects"); }}
              style={{
                color: isDashboard && new URLSearchParams(location.search).get("tab") === "projects"
                  ? "var(--cyan)"
                  : undefined
              }}
            >
              Project View
            </a>
          </li>
          <li>
            <a
              href="#digital-marketing"
              onClick={(e) => { e.preventDefault(); handleDashboardNav("marketing"); }}
              style={{
                color: isDashboard && new URLSearchParams(location.search).get("tab") === "marketing"
                  ? "var(--cyan)"
                  : undefined
              }}
            >
              Digital Marketing
            </a>
          </li>
        </ul>

        <button className="nav-cta" type="button" onClick={() => scrollToSection("contact")}>
          <span>Available for Work</span>
        </button>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {!isDashboard && links.map((link) => (
          <a
            href={`/#${link.toLowerCase()}`}
            key={link}
            onClick={(e) => handleNavClick(e, link.toLowerCase())}
          >
            {link}
          </a>
        ))}
        <a href="#project-view" onClick={(e) => { e.preventDefault(); handleDashboardNav("projects"); }}>
          Project View
        </a>
        <a href="#digital-marketing" onClick={(e) => { e.preventDefault(); handleDashboardNav("marketing"); }}>
          Digital Marketing
        </a>
        <button type="button" onClick={() => scrollToSection("contact")}>
          Available for Work
        </button>
      </div>
    </nav>
  );
};

export default Navbar;