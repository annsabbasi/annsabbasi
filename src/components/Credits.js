import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";

const Credits = () => {
  return (
    <>
      {/* ── Contact Section ── */}
      <div id="contact">
        <FadeInSection>
          <div className="contact-wrapper">
            <span className="section-label">Get In Touch</span>
            <h2 className="contact-heading">
              Let's Build Something{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="contact-sub">
              I'm always open to new opportunities, interesting projects, and
              great conversations. Whether you have a role, a project, or just
              want to say hello — my inbox is open.
            </p>

            <a
              href="mailto:annsabbasi54@gmail.com?subject=Hello from your portfolio!"
              className="contact-email-btn"
            >
              <EmailRoundedIcon style={{ fontSize: 18 }} />
              Say Hello
            </a>

            <div className="contact-socials">
              <a
                className="contact-social-link"
                href="https://github.com/annsabbasi"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon style={{ fontSize: 17 }} />
                GitHub
              </a>
              <a
                className="contact-social-link"
                href="https://www.linkedin.com/in/annsabbasi/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon style={{ fontSize: 17 }} />
                LinkedIn
              </a>
              <a
                className="contact-social-link"
                href="https://www.udemy.com/certificate/UC-1bd310cf-435d-41ff-86c9-81f4cbc17786/"
                target="_blank"
                rel="noreferrer"
              >
                🎓 Udemy Certificate
              </a>
            </div>
          </div>
        </FadeInSection>

        {/* ── Footer bar ── */}
        <FadeInSection>
          <div className="footer-bar">
            <span className="footer-copy">
              © {new Date().getFullYear()} Anns Abbasi. All rights reserved.
            </span>
            <span className="footer-built">
              Designed &amp; Built by{" "}
              <a
                href="https://github.com/annsabbasi"
                target="_blank"
                rel="noreferrer"
              >
                Anns Abbasi
              </a>
            </span>
          </div>
        </FadeInSection>
      </div>
    </>
  );
};

export default Credits;
