import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

const About = () => {
  const stats = [
    { number: "10+", label: "Production Projects" },
    { number: "25%", label: "API Performance Gain" },
    { number: "30%", label: "Cloud Cost Reduction" },
    { number: "6×", label: "Doc Processing Speed" },
  ];

  const skills = [
    {
      label: "Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP", "SQL", "Bash"],
    },
    {
      label: "Backend",
      items: ["Node.js", "NestJS", "Express.js", "FastAPI", "Django DRF", "Flask", "Laravel"],
    },
    {
      label: "Frontend",
      items: ["React.js", "Next.js", "React Native", "ElectronJS", "Tailwind CSS"],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS", "GCP", "Terraform", "Docker", "Traefik", "Nginx", "GitHub Actions", "Fly.io"],
    },
    {
      label: "Data & Search",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Cassandra", "OpenSearch", "pgvector", "Pandas ETL"],
    },
    {
      label: "Queues & Async",
      items: ["BullMQ", "AWS SQS", "AWS SNS", "Redis", "Retry & Backoff", "Dead-Letter Queues"],
    },
    {
      label: "APIs & Auth",
      items: ["GraphQL", "tRPC", "WebSockets", "OAuth 2.0 PKCE", "OIDC", "JWT", "RBAC"],
    },
    {
      label: "AI & LLM",
      items: ["LangChain", "LangGraph", "OpenAI API", "AWS Nova", "RAG Pipelines"],
    },
    {
      label: "Voice & Media",
      items: ["Deepgram (STT)", "ElevenLabs (TTS)", "AssemblyAI", "Twilio"],
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
                I am a <strong>Software Engineer II</strong> at{" "}
                <a href="https://www.provelopers.net/" target="_blank" rel="noreferrer">
                  Provelopers
                </a>
                , building and maintaining backend services for SpeedPoint, a
                large-scale multi-tenant ERP platform. I design and operate
                Python (Flask + Pandas) ETL pipelines that migrate customer data
                from third-party providers into the platform's canonical schema,
                and ship vertical slices end to end across a Docker-orchestrated,
                multi-repo codebase: database schema, Laravel APIs, Next.js
                interfaces, and data pipelines, fronted by Traefik and backed by
                OpenSearch.
              </p>
              <p>
                Previously at{" "}
                <a href="https://www.algotix.ai/" target="_blank" rel="noreferrer">
                  Algotix AI
                </a>
                , I grew from Software Engineer to <strong>Senior Software Engineer</strong>,
                owning the end-to-end design and delivery of distributed, event-driven
                microservice systems on AWS, from architecture through production
                deployment, monitoring, and incident response, delivering a 40%
                reduction in incident detection time and a 30% drop in production
                regression bugs. Before that, at{" "}
                <a href="https://www.rahmansolutions.com/" target="_blank" rel="noreferrer">
                  Rehman Solutions
                </a>
                , I delivered full-stack features with React.js, Node.js, and NestJS
                in a 5-person engineering team.
              </p>
              <p>
                I'm passionate about building reliable, scalable software and
                continuously exploring <strong>distributed systems</strong>,{" "}
                <strong>cloud-native architectures</strong>, and modern engineering
                practices, from event-driven design and production observability
                to agentic LLM workflows and RAG pipelines. I hold a BS in
                Computer Science from Islamia University of Bahawalpur.
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
