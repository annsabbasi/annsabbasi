import React, { useState, useEffect } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import Brightness4Icon from "@material-ui/icons/Brightness4";   // moon
import Brightness7Icon from "@material-ui/icons/Brightness7";   // sun
import "../styles/NavBar.css";

const NavBar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth theme transition helper
  const handleToggle = () => {
    document.documentElement.classList.add("theme-transitioning");
    toggleTheme();
    setTimeout(() =>
      document.documentElement.classList.remove("theme-transitioning"), 300
    );
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "About", href: "#about", num: "01" },
    { label: "Experience", href: "#experience", num: "02" },
    { label: "Projects", href: "#projects", num: "03" },
    { label: "Contact", href: "#contact", num: "04" },
  ];

  return (
    <>
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Brand */}
          <a href="#intro" className="nav-brand">
            <span className="nav-brand-bracket">&lt;</span>
            anns
            <span className="nav-brand-bracket">/&gt;</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>
                  <span className="nav-num">{l.num}.</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nav-right">
            <a
              className="nav-icon-link"
              href="https://github.com/annsabbasi"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <GitHubIcon style={{ fontSize: 18 }} />
            </a>
            <a
              className="nav-icon-link"
              href="https://www.linkedin.com/in/annsabbasi/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <LinkedInIcon style={{ fontSize: 19 }} />
            </a>
            <a
              className="nav-icon-link"
              href="mailto:annsabbasi54@gmail.com"
              title="Email"
            >
              <EmailRoundedIcon style={{ fontSize: 18 }} />
            </a>

            {/* Theme toggle */}
            <button
              className="nav-theme-btn"
              onClick={handleToggle}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Brightness4Icon style={{ fontSize: 18 }} />
              ) : (
                <Brightness7Icon style={{ fontSize: 18 }} />
              )}
            </button>

            <a
              className="nav-resume"
              href="https://drive.google.com/file/d/1Xe4-3rhhQqUo1EvucRN7l4nI3imtp2cU/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Resume ↗
            </a>

            {/* Hamburger */}
            <button
              className={`nav-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <ul className="nav-mobile-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu}>
                <span className="nav-num">{l.num}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-bottom">
          <a className="nav-icon-link" href="https://github.com/annsabbasi" target="_blank" rel="noreferrer">
            <GitHubIcon style={{ fontSize: 18 }} />
          </a>
          <a className="nav-icon-link" href="https://www.linkedin.com/in/annsabbasi/" target="_blank" rel="noreferrer">
            <LinkedInIcon style={{ fontSize: 19 }} />
          </a>
          <a className="nav-icon-link" href="mailto:annsabbasi54@gmail.com">
            <EmailRoundedIcon style={{ fontSize: 18 }} />
          </a>
          <button className="nav-theme-btn" onClick={handleToggle} aria-label="Toggle theme">
            {theme === "light" ? (
              <Brightness4Icon style={{ fontSize: 18 }} />
            ) : (
              <Brightness7Icon style={{ fontSize: 18 }} />
            )}
          </button>
          <a
            className="nav-resume"
            href="https://docs.google.com/document/d/1v3XJnyn-tOjq5lwHOhU-ojX9j1snUZ1jxG1RSAkrl84/export?format=pdf"
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: "auto" }}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
