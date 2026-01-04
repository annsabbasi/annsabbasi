import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    const spotlightProjects = {
      Midday: {
        title: "midday",
        desc:
          "Forked and customized AI-powered business assistant platform for enterprise client. Managed complete deployment pipeline using Docker, Vercel, and Fly.io with tRPC and Drizzle ORM.",
        techStack: "NEXT.JS, TRPC, DRIZZLE ORM, DOCKER",
        link: "https://github.com/annsabbasi/Midday",
        open: "https://midday.ai",
        image: "/assets/midday.png",
      },
      // TechTren: {
      //   title: "techtren",
      //   desc:
      //     "AI-powered financial assistant and investment platform with predictive pricing modules, OAuth trading integration, and real-time interactive charts for stock analysis.",
      //   techStack: "NEXT.JS, NODE.JS, AWS, OPENAI API",
      //   link: "https://github.com/annsabbasi",
      //   open: "https://www.techtren.com",
      //   image: "/assets/techtren.png",
      // },
      FrontDeskPro: {
        title: "frontdeskpro",
        desc:
          "Voice-enabled AI agent system integrating ElevenLabs, Twilio, Deepgram, and OpenAI. Processes 500+ calls daily with 90% intent recognition accuracy.",
        techStack: "NEST.JS, NEXT.JS, POSTGRESQL, AWS EC2",
        link: "https://github.com/annsabbasi",
        open: "https://frontdeskpro.ai",
        image: "/assets/frontdeskpro.png",
      },
    };

    const projects = {
      // "TechTren": {
      //   desc:
      //     "An AI-powered financial assistant platform enabling portfolio tracking, predictive pricing, and real-time market insights.",
      //   techStack:
      //     "Next.js, Node.js, PostgreSQL, WebSockets, OAuth, Financial APIs",
      //   link: "https://www.techtren.com",
      //   open: "https://www.techtren.com",
      // },
      "Relay Towing": {
        desc:
          "Comprehensive dispatch and operations management system with real-time GPS tracking using Socket.IO and Google Maps API.",
        techStack: "Nest.js, Next.js, Supabase, Auth0, Socket.IO",
        link: "https://github.com/annsabbasi/relay_towing",
        open: "https://app.relaytow.com",
      },
      "TryLeo": {
        desc:
          "Intelligent platform converting handwritten historical records into searchable digital formats using advanced OCR and NLP.",
        techStack: "Next.js, Python, OpenAI API, Redis, BullMQ",
        link: "https://github.com/annsabbasi",
        open: "http://tryleo.ai",
      },
      "Midday (Open Source Customization)": {
        desc:
          "Customized an open-source AI-powered business assistant by adapting its monorepo architecture and deploying production-ready services.",
        techStack: "Next.js, tRPC, Drizzle ORM, Docker, Fly.io, Vercel",
        link: "https://midday.ai",
        open: "https://midday.ai",
      },
      "CatchACharacter": {
        desc:
          "Augmented reality photo & stickers application with advanced image overlay and editing features. Achieved 100K+ downloads on Play Store.",
        techStack: "React Native, AR Libraries, Image Processing",
        link: "https://github.com/annsabbasi",
        open: "https://play.google.com/store/apps/details?id=com.catchacharacter.android",
      },
      "Ballina Killaloe Radio": {
        desc:
          "Ireland-based radio streaming application with integrated user recommendation engine and local event update system.",
        techStack: "React Native, Audio Streaming APIs",
        link: "https://github.com/annsabbasi",
        open: "https://play.google.com/store/apps/details?id=com.ballina_killaloe_radio_app&hl=en",
      },
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ pet projects</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src={spotlightProjects[key]["image"]}
                alt={key}
              // style={{ objectFit: "cover", border: '2px solid red' }}
              />
              <div className="caption-bg">
                <Carousel.Caption>
                  <h3>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack">
                      {spotlightProjects[key]["techStack"]}
                    </p>
                  </p>
                  <ExternalLinks
                    githubLink={spotlightProjects[key]["link"]}
                    openLink={spotlightProjects[key]["open"]}
                  ></ExternalLinks>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`} key={i}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
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