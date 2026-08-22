import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FadeInSection from "./FadeInSection";
import Carousel from "react-bootstrap/Carousel";

class Projects extends React.Component {
  state = { activeProject: null };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
  handleKey = (e) => {
    if (e.key === "Escape") this.closeModal();
  };
  openModal = (p) => {
    this.setState({ activeProject: p });
    document.body.style.overflow = "hidden";
  };
  closeModal = () => {
    this.setState({ activeProject: null });
    document.body.style.overflow = "";
  };

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
        flip: true,
      },
    ];

    const otherProjects = [
      {
        title: "SpeedPoint ERP",
        desc: "Multi-tenant ERP platform. Python ETL services (Pandas, Flask) migrate customers, vehicles, work-order history, inventory catalogs, canned services, and pricing rules from Shopmonkey and Tekmetric into SpeedPoint's canonical schema, with field mapping, validation, and reconciliation gates before cutover. An adapter-based canonical import path lets new providers integrate through a single adapter with no downstream changes, and tenant-scoped querying over an OpenSearch-backed search layer enforces strict per-tenant result isolation as the index grows.",
        tech: "Laravel · Next.js · Python · Pandas · OpenSearch · Traefik · Docker · PostgreSQL",
        live: "https://getspeedpoint.com",
      },
      {
        title: "SocialsBoost",
        desc: "Multi-tenant social media platform serving marketing teams globally. AI content studio (OpenAI) generates captions, hashtags, and image concepts cutting content creation time by 7×. OAuth 2.0 PKCE auth across 5+ platforms, multi-platform scheduling, deployed on AWS with Terraform and Docker achieving 99.9% uptime.",
        tech: "React.js · Nest.js · Twitter API · OpenAI · Terraform · Docker · AWS",
        live: "https://www.socialsboost.tech/",
      },
      {
        title: "TechTren",
        desc: "AI financial platform FastAPI (Python) backend and React.js frontend on AWS Elastic Beanstalk with auto-scaling and RDS. Brokerage OAuth integration processes live data at <50ms latency. Agentic AI (LangChain + OpenAI) delivers real-time market insights; TradingView charts streamed via WebSockets.",
        tech: "React.js · FastAPI · Python · LangChain · OpenAI · AWS Elastic Beanstalk · WebSockets",
        // github: "https://github.com/annsabbasi",
        live: "https://www.techtren.com",
      },
      {
        title: "FrontDeskPro",
        desc: "Production voice agent handling calls at sub-200ms latency, cutting human agent workload. Integrates ElevenLabs, Twilio, Deepgram, and AWS Nova APIs at 90% intent recognition accuracy, with a structured transcription pipeline synced to CRM through webhooks. Moving voice processing off the request path onto a BullMQ queue cut API p95 response time by 65%; timeout and fallback paths escalate degraded calls cleanly to a human instead of failing silently.",
        tech: "NestJS · Next.js · ElevenLabs · Twilio · Deepgram · AWS Nova · PostgreSQL",
        // github: "https://github.com/annsabbasi",
        live: "https://frontdeskpro.ai",
      },
      {
        title: "TryLeo",
        desc: "Document digitization platform reduced per-document processing from 5 min to 45 sec by parallelizing OCR and NLP page-by-page across concurrent BullMQ workers. Hybrid semantic and full-text search on Supabase PostgreSQL with pgvector and OpenAI embeddings improved retrieval latency 70% over the prior full-text-only implementation. Multi-format ingestion (PDF, DOCX, images) with structured extraction, entity recognition, and auto-tagging feeds downstream workflow automation.",
        tech: "Next.js · Python · Supabase · pgvector · Redis · BullMQ · OpenAI API",
        // github: "https://github.com/annsabbasi",
        live: "http://tryleo.ai",
      },
      {
        title: "Midday",
        desc: "Forked and customized open-source AI business assistant. Managed full deployment pipeline using Docker, Vercel, and Fly.io.",
        tech: "Next.js · tRPC · Drizzle ORM · Docker · Fly.io",
        github: "https://github.com/midday-ai/midday",
        live: "https://midday.ai",
      },
    ];

    return (
      <div id="projects">
        <div className="section-wrapper">
          {/* ── Section header ── */}
          <FadeInSection>
            <span className="section-label">Featured Work</span>
            <h2 className="section-title">Selected Projects</h2>
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
                  {p.desc.length > 160 ? (
                    <div className="card-desc-wrap">
                      <div className="card-desc">{p.desc}</div>
                    </div>
                  ) : (
                    <div className="card-desc">{p.desc}</div>
                  )}
                  {p.desc.length > 160 && (
                    <button
                      className="card-read-more"
                      onClick={() => this.openModal(p)}
                    >
                      read more
                    </button>
                  )}
                  <div className="card-tech">{p.tech}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>

        {/* ── Project detail modal ── */}
        {this.state.activeProject && (
          <div
            className="proj-modal-overlay"
            onClick={this.closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="proj-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="proj-modal-close"
                onClick={this.closeModal}
                aria-label="Close"
              >
                ✕
              </button>

              <div>
                <p className="proj-modal-overline">Project Details</p>
                <h3 className="proj-modal-title">
                  {this.state.activeProject.title}
                </h3>
              </div>

              <p className="proj-modal-body">
                {this.state.activeProject.desc}
              </p>

              <div className="proj-modal-tech">
                {this.state.activeProject.tech
                  .split(" · ")
                  .map((t, i) => (
                    <span key={i} className="proj-modal-pill">
                      {t}
                    </span>
                  ))}
              </div>

              <div className="proj-modal-links">
                {this.state.activeProject.github && (
                  <a
                    href={this.state.activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="feat-link-btn"
                  >
                    <GitHubIcon style={{ fontSize: 15 }} />
                    Code
                  </a>
                )}
                {this.state.activeProject.live && (
                  <a
                    href={this.state.activeProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="feat-link-btn"
                  >
                    <OpenInBrowserIcon style={{ fontSize: 16 }} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Projects;
