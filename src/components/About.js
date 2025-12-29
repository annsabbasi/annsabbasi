import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        I am currently a <b>Software Engineer</b> at{" "}
        <a href="https://www.algotix.ai/" target="_blank" rel="noreferrer">
          Algotix AI
        </a>
        , where I work on building and scaling production-grade web and mobile
        applications with a strong focus on cloud infrastructure, and AI-driven platforms.
        Previously, I worked as a <b>Full-Stack Developer</b> at{" "}
        <a href="https://www.rahmansolutions.com/" target="_blank" rel="noreferrer">
          Rehman Solutions
        </a>
        , leading and contributing to real-time systems.</p>
    );
    const two = (
      <p>
        Outside of work, I enjoy exploring new technologies or refining system
        architectures. Oh, I also
        play football and enjoy battle games.
      </p>
    );


    const tech_stack = [
      "Python",
      "Typescript",
      "React.js",
      "Node Js",
      "Javascript ES6+",
      "Cloud",
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="annsabbasi" src={"/1.png"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
