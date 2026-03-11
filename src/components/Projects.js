import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FadeInSection from "./FadeInSection";
import Carousel from "react-bootstrap/Carousel";

class Projects extends React.Component {
  render() {
    const featuredProjects = [
      {
        title: "AI Research Agent",
        desc:
          "An intelligent research automation platform that takes any topic as input, autonomously searches the web via Tavily, processes information through LangGraph agent workflows powered by OpenAI, and generates comprehensive research reports with cited sources. Built with a Next.js frontend and Django + Daphne backend for real-time WebSocket streaming.",
        techStack: [
          "Next.js",
          "Python / Django DRF",
          "LangChain",
          "LangGraph",
          "OpenAI API",
          "Tavily",
          "Celery",
          "Redis",
          "WebSockets",
          "PostgreSQL",
        ],
        github: "https://github.com/annsabbasi/ai-research-agent",
        live: "https://github.com/annsabbasi/ai-research-agent",
        images: [
          "/assets/ai-research-agent/search.png",
          "/assets/ai-research-agent/research-result.png",
          "/assets/ai-research-agent/research-report.png",
          "/assets/ai-research-agent/researches.png",
        ],
        flip: false,
      },
      {
        title: "Jolt",
        desc:
          "A full-featured social media management platform where users connect multiple social accounts and manage everything from one dashboard. Features multi-platform post scheduling, performance analytics, AI-generated captions, and AI image creation — built for creators, agencies, and businesses to streamline their entire social media workflow.",
        techStack: [
          "React.js",
          "Nest.js",
          "Meta API",
          "Twitter API",
          "LinkedIn API",
          "OpenAI",
          "AI Image Gen",
          "Google Cloud Run",
        ],
        github: null,
        live: "https://jolt-frontend-khaki.vercel.app",
        images: [
          "/assets/jolt/home-page.png",
          "/assets/jolt/dashboard.png",
          "/assets/jolt/create-post.png",
          "/assets/jolt/analytics.png",
          "/assets/jolt/ai-content.png",
          "/assets/jolt/schedule-post.png",
          "/assets/jolt/social-account.png",
          "/assets/jolt/profile.png",
        ],
        flip: true,
      },
      {
        title: "Merit Tracker",
        desc:
          "An enterprise workforce management platform with multi-role access (Company, QC Admin, User, Super Admin). Companies manage departments, projects, and tasks while monitoring employee productivity via a cross-platform Electron desktop app for Windows, Mac, and Linux. QC admins review and approve deliverables with notes, and a super admin controls subscriptions and platform access.",
        techStack: [
          "Next.js",
          "NestJS",
          "PostgreSQL",
          "Electron",
          "WebSockets",
          "Redis",
          "Screen Monitoring",
          "AWS",
        ],
        github: "https://github.com/annsabbasi/merit-tracker",
        live: "https://merit-tracker.vercel.app/dashboard",
        images: [
          "/assets/merit-tracker/dashboard.png",
          "/assets/merit-tracker/projects.png",
          "/assets/merit-tracker/department.png",
          "/assets/merit-tracker/screen-monitor.png",
          "/assets/merit-tracker/sop.png",
          "/assets/merit-tracker/qc-review.png",
          "/assets/merit-tracker/my-task.png",
          "/assets/merit-tracker/company-setting.png",
        ],
        flip: false,
      },
    ];

    const otherProjects = [
      {
        title: "FrontDeskPro",
        desc: "Voice-enabled AI agent integrating ElevenLabs, Twilio, Deepgram, and OpenAI. Processes 500+ calls daily with 90% intent recognition accuracy.",
        tech: "NestJS · Next.js · PostgreSQL · AWS EC2 · OpenAI",
        // github: "https://github.com/annsabbasi",
        live: "https://frontdeskpro.ai",
      },
      {
        title: "TechTren",
        desc: "AI-powered financial assistant with predictive pricing, OAuth trading integration, and real-time interactive charts for market analysis.",
        tech: "Next.js · Node.js · AWS · OpenAI API · WebSockets",
        // github: "https://github.com/annsabbasi",
        live: "https://www.techtren.com",
      },
      {
        title: "Midday",
        desc: "Forked and customized open-source AI business assistant. Managed full deployment pipeline using Docker, Vercel, and Fly.io.",
        tech: "Next.js · tRPC · Drizzle ORM · Docker · Fly.io",
        github: "https://github.com/midday-ai/midday",
        live: "https://midday.ai",
      },
      {
        title: "Relay Towing",
        desc: "Dispatch management system with real-time GPS tracking using Socket.IO and Google Maps API.",
        tech: "NestJS · Next.js · Supabase · Auth0 · Socket.IO",
        // github: "https://github.com/annsabbasi/relay_towing",
        live: "https://app.relaytow.com",
      },
      {
        title: "TryLeo",
        desc: "Converts handwritten historical records into searchable digital formats using advanced OCR and NLP pipelines.",
        tech: "Next.js · Python · OpenAI API · Redis · BullMQ",
        // github: "https://github.com/annsabbasi",
        live: "http://tryleo.ai",
      },
      {
        title: "CatchACharacter",
        desc: "Augmented reality photo & sticker application with advanced image overlay features. Achieved 100K+ downloads on Google Play.",
        tech: "React Native · AR Libraries · Image Processing",
        // github: "https://github.com/annsabbasi",
        live: "https://play.google.com/store/apps/details?id=com.catchacharacter.android",
      },
    ];

    return (
      <div id="projects">
        <div className="section-wrapper">
          {/* ── Section header ── */}
          <FadeInSection>
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">Pet Projects</h2>
            <div className="section-divider" />
          </FadeInSection>

          {/* ── Featured projects ── */}
          <div className="featured-list">
            {featuredProjects.map((p, i) => (
              <FadeInSection key={i} delay={`${i * 100}ms`}>
                <div className={`feat-project${p.flip ? " flip" : ""}`}>
                  {/* Image carousel */}
                  <div className="feat-img-col">
                    <Carousel interval={3500} pause="hover" indicators>
                      {p.images.map((src, j) => (
                        <Carousel.Item key={j}>
                          <img
                            className="d-block feat-carousel-img"
                            src={src}
                            alt={`${p.title} screenshot ${j + 1}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>

                  {/* Info */}
                  <div className="feat-info-col">
                    <p className="feat-overline">Featured Project</p>
                    <h3 className="feat-title">{p.title}</h3>
                    <div className="feat-desc">
                      <p>{p.desc}</p>
                    </div>
                    <ul className="feat-tech">
                      {p.techStack.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                    <div className="feat-links">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="feat-link-btn"
                        >
                          <GitHubIcon style={{ fontSize: 16 }} />
                          Code
                        </a>
                      )}
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="feat-link-btn"
                      >
                        <OpenInBrowserIcon style={{ fontSize: 17 }} />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* ── Other projects ── */}
          <FadeInSection>
            <div className="other-header">
              <span className="section-label">Other Noteworthy</span>
              <h3 className="other-title">More Things I've Built</h3>
              <p className="other-subtitle">
                A selection of professional and client projects.
              </p>
            </div>
          </FadeInSection>

          <ul className="projects-grid">
            {otherProjects.map((p, i) => (
              <FadeInSection key={i} delay={`${i * 80}ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <FolderOpenRoundedIcon
                      className="folder-icon"
                      style={{ fontSize: 34 }}
                    />
                    <span className="external-links">
                      {p.github && (
                        <a
                          className="github-icon"
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GitHubIcon
                            style={{ fontSize: 19, color: "var(--text-3)" }}
                          />
                        </a>
                      )}
                      {p.live && (
                        <a
                          className="open-icon"
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          style={{ marginLeft: "8px" }}
                        >
                          <OpenInBrowserIcon
                            style={{ fontSize: 21, color: "var(--text-3)" }}
                          />
                        </a>
                      )}
                    </span>
                  </div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-desc">{p.desc}</div>
                  <div className="card-tech">{p.tech}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
