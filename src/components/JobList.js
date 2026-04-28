import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";

const isHorizontal = window.innerWidth < 600;

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={isHorizontal ? `full-width-tabpanel-${index}` : "vertical-tabpanel"}
      aria-labelledby={
        isHorizontal ? `full-width-tab-${index}` : `vertical-tab-${index}`
      }
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return isHorizontal
    ? { id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}` }
    : { id: `vertical-tab-${index}` };
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: isHorizontal ? "column" : "row",
  },
  tabs: {
    borderRight: isHorizontal ? "none" : "1px solid rgba(255,255,255,0.07)",
    borderBottom: isHorizontal ? "1px solid rgba(255,255,255,0.07)" : "none",
    minWidth: isHorizontal ? "unset" : "180px",
  },
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    "Algotix AI": {
      jobTitle: "Software Engineer",
      duration: "Feb 2024 – Present",
      companyUrl: "https://www.algotix.ai/",
      desc: [
        "Architected and deployed production AWS infrastructure (EC2, S3, RDS, Lambda, CloudFront, CloudWatch, IAM, Route 53) ensuring 99.99% uptime for applications serving 10,000+ daily active users.",
        "Optimized backend services and database queries, achieving 15% performance improvement and reducing average API response time from 800ms to 680ms.",
        "Reduced deployment cycle time by 30% by implementing Docker containerization and GitHub Actions CI/CD pipelines, enabling 3× faster feature releases.",
        "Developed cross-platform mobile applications with React Native using offline-first architecture, improving user retention by 22%.",
        "Established CloudWatch monitoring and alerting systems, reducing incident response time by 40% through proactive issue detection.",
        "Managed infrastructure-as-code with Terraform, enabling reproducible, version-controlled cloud environments across staging and production.",
      ],
    },
    "Rehman Solutions": {
      jobTitle: "Full-Stack Developer",
      duration: "Sept 2022 – Feb 2024",
      companyUrl: "https://www.rahmansolutions.com/",
      desc: [
        "Led a cross-functional team of 5 developers, implementing agile practices that increased sprint velocity by 40% and improved on-time delivery from 65% to 92%.",
        "Built production-grade mobile applications with real-time Socket.IO synchronization and local-first architecture, reducing data sync conflicts by 85%.",
        "Optimized Google Cloud Run functions and API architecture, improving response times by 25% while reducing monthly cloud costs by 20%.",
        "Conducted comprehensive code reviews across full-stack codebases (React, React Native, Node.js), eliminating critical defects before production deployments.",
        "Resolved deep performance bottlenecks through algorithmic optimization and legacy code refactoring, measurably reducing p95 latency across key endpoints.",
      ],
    },
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={isHorizontal ? "horizontal" : "vertical"}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={(_, v) => setValue(v)}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab
            label={isHorizontal ? `0${i + 1}` : key}
            {...a11yProps(i)}
            key={i}
          />
        ))}
      </Tabs>

      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i} key={i}>
          <div className="joblist-job-title">
            {experienceItems[key].jobTitle}
            {" @ "}
          </div>
          <a
            className="joblist-job-company"
            href={experienceItems[key].companyUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {key}
          </a>
          <div className="joblist-duration">{experienceItems[key].duration}</div>
          <ul className="job-description">
            {experienceItems[key].desc.map((item, j) => (
              <FadeInSection key={j} delay={`${j * 80}ms`}>
                <li>{item}</li>
              </FadeInSection>
            ))}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
