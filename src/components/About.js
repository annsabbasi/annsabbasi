import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

const About = () => {
  const stats = [
    { number: "3+",   label: "Years of Experience" },
    { number: "10+",  label: "Production Projects" },
    { number: "100K+",label: "App Downloads" },
    { number: "99.9%",label: "Uptime Delivered" },
  ];

  const skills = [
    {
      label: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "React Native"],
    },
    {
      label: "Backend",
      items: ["Node.js", "NestJS", "Python", "Django DRF"],
    },
    {
      label: "AI & GenAI",
      items: ["LangChain", "LangGraph", "OpenAI API", "Tavily Search"],
    },
    {
      label: "Database & Cache",
      items: ["PostgreSQL", "Redis", "Supabase", "Drizzle ORM"],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS (EC2/S3/RDS)", "Docker", "GCP", "GitHub Actions"],
    },
    {
      label: "Desktop & Other",
      items: ["Electron (Win/Mac/Linux)", "Socket.IO", "WebSockets", "tRPC"],
    },
  ];

  return (
    <div id="about">
      <div className="section-wrapper">
        <FadeInSection>
          <span className="section-label">About me</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-divider" />
        </FadeInSection>

        {/* Bio + Stats */}
        <FadeInSection delay="100ms">
          <div className="about-grid">
            <div className="about-bio">
              <p>
                I am a <strong>Senior Software Engineer</strong> currently at{" "}
                <a href="https://www.algotix.ai/" target="_blank" rel="noreferrer">
                  Algotix AI
                </a>
                , where I architect and ship production-grade web, mobile, and
                AI-driven applications. My work spans cloud infrastructure on AWS,
                real-time systems with WebSockets, and AI automation pipelines
                using LangChain and LangGraph with OpenAI.
              </p>
              <p>
                Previously at{" "}
                <a href="https://www.rahmansolutions.com/" target="_blank" rel="noreferrer">
                  Rehman Solutions
                </a>
                , I led a cross-functional team of 5 developers, improving sprint
                velocity by 40% and delivering enterprise mobile apps with
                offline-first architecture.
              </p>
              <p>
                I have a deep interest in <strong>Agentic AI systems</strong> and{" "}
                <strong>Generative AI</strong> — from building autonomous research
                agents with LangGraph to integrating LLMs into production
                workflows. Outside of code, I enjoy football, strategy games, and
                exploring new system architectures.
              </p>
            </div>

            <div className="about-stats">
              {stats.map((s, i) => (
                <FadeInSection key={i} delay={`${i * 80}ms`}>
                  <div className="stat-card">
                    <div className="stat-number">{s.number}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Skills */}
        <FadeInSection delay="150ms">
          <div className="skills-section">
            <span className="section-label">Tech Stack</span>
            <p className="skills-intro">
              Technologies and tools I work with day-to-day across the full stack,
              from client to cloud to AI systems.
            </p>
            <div className="skills-grid">
              {skills.map((group, i) => (
                <FadeInSection key={i} delay={`${i * 60}ms`}>
                  <div className="skill-group">
                    <div className="skill-group-label">{group.label}</div>
                    <ul className="skill-pills">
                      {group.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default About;
