import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const Experience = () => {
  return (
    <div id="experience">
      <div className="section-wrapper">
        <FadeInSection>
          <span className="section-label">Work History</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
        </FadeInSection>
        <FadeInSection delay="100ms">
          <JobList />
        </FadeInSection>
      </div>
    </div>
  );
};

export default Experience;
