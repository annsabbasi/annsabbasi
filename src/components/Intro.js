import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";
import ParticlePortrait from "./ParticlePortrait";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro">
        <div className="intro-simulation">
          <ParticlePortrait />
        </div>
        <div className="intro-block">
          <Typist avgTypingDelay={120}>
            <span className="intro-title">
              {"hi, "}
              <span className="intro-name">{"annsabbasi"}</span>
              {" here."}
            </span>
          </Typist>
          <FadeInSection>
            <div className="intro-desc">
              I'm a product-focused software engineer who builds reliable, scalable applications from idea to production.
              I've worked on real-time platforms, AI automation systems, and cloud-deployed products
              used by thousands of users in live environments.
            </div>
            <a href="mailto:annsabbasi54@gmail.com?subject=Hello from your portfolio!" className="intro-contact">
              <EmailRoundedIcon></EmailRoundedIcon>
              {" Say hi!"}
            </a>
          </FadeInSection>
        </div>
      </div>
    );
  }
}

export default Intro;
