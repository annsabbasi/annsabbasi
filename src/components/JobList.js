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
    Provelopers: {
      companyUrl: "https://www.provelopers.net/",
      roles: [
        {
          jobTitle: "Software Engineer II",
          duration: "Jul 2026 – Present",
          desc: [
            "Building and maintaining services for a large-scale, multi-tenant ERP platform, applying domain-driven design to keep service boundaries clean, scalable, and maintainable.",
            "Designing API contracts and cross-system integrations that connect ERP modules with internal and third-party systems.",
            "Contributing to multi-tenant architecture decisions across tenant isolation, data partitioning, and system integration.",
          ],
        },
      ],
    },
    "Algotix AI": {
      companyUrl: "https://www.algotix.ai/",
      roles: [
        {
          jobTitle: "Senior Software Engineer",
          duration: "Oct 2025 – Jul 2026",
          desc: [
            "Architected asynchronous processing pipelines using BullMQ and AWS SQS, enabling the platform to handle high-concurrency workloads reliably with automatic retry logic, dead-letter queues, and horizontal worker scaling.",
            "Led infrastructure modernization initiative: migrated key services to containerized ECS deployments with Terraform-managed IaC, achieving reproducible environment provisioning across staging and production and eliminating configuration drift.",
            "Owned end-to-end design and delivery of distributed, event-driven microservice systems on AWS from initial architecture through production deployment, monitoring, and incident response.",
            "Established full observability stack CloudWatch custom metrics, distributed tracing, structured logging, and automated alerting reducing mean time to detection (MTTD) of production incidents by 40%.",
            "Drove technical decisions in cross-functional Agile sprints: conducted architectural reviews, led code reviews for the team, defined API contracts, and enforced SLA compliance across critical services.",
            "Introduced API contract testing and integration test coverage, reducing production regression bugs by 30% across quarterly releases.",
          ],
        },
        {
          jobTitle: "Software Engineer",
          duration: "Mar 2024 – Oct 2025",
          desc: [
            "Built and maintained production-grade backend services supporting large-scale customer engagement platforms, handling live traffic, debugging production issues, and shipping features with strict reliability requirements.",
            "Developed offline-first React Native mobile features using local-first architecture and sync logic, improving user retention by 22% and eliminating data-loss complaints reported by the client.",
            "Established CloudWatch monitoring and alerting for key backend services, creating the first observability setup in the team's workflow and reducing incident response time by 40% through early anomaly detection.",
            "Documented undocumented internal services and API contracts, reducing onboarding time for new team members and improving cross-team debugging efficiency.",
            "Delivered features reliably sprint after sprint with minimal rework, maintaining a track record of clean QA handoffs and zero critical rollbacks during tenure in this role.",
          ],
        },
      ],
    },
    "Rehman Solutions": {
      companyUrl: "https://www.rahmansolutions.com/",
      roles: [
        {
          jobTitle: "Full-Stack Software Engineer",
          duration: "Sep 2022 – Feb 2024",
          desc: [
            "Delivered full-stack features across client-facing products using React.js, Node.js, and NestJS; collaborated in a 5-person engineering team and contributed to architecture and technical direction.",
            "Proactively learned and applied CI/CD practices contributed to pipeline improvements using GitHub Actions that reduced manual deployment steps and release friction for the team.",
            "Identified and fixed several API performance issues through query optimization and code refactoring improvements were noticed by senior engineers and led to more responsibility over time.",
            "Optimized GCP Cloud Run services through query optimization, Redis caching, and service right-sizing for faster responses.",
            "Collaborated closely with senior engineers and absorbed best practices in code structure, Git workflows, and REST API design applying learnings to every feature built.",
            "Established code quality standards linting, pre-commit hooks, unit test coverage thresholds and contributed to internal onboarding documentation adopted across the team.",
          ],
        },
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
          {experienceItems[key].roles.map((role, r) => (
            <div className="joblist-role" key={r}>
              <div className="joblist-job-title">
                {role.jobTitle}
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
              <div className="joblist-duration">{role.duration}</div>
              <ul className="job-description">
                {role.desc.map((item, j) => (
                  <FadeInSection key={j} delay={`${j * 80}ms`}>
                    <li>{item}</li>
                  </FadeInSection>
                ))}
              </ul>
            </div>
          ))}
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
