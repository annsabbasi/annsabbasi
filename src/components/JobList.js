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
  const rootRef = React.useRef(null);

  // Where the sticky tabs come to rest, below the fixed navbar.
  const stickyOffset = isHorizontal ? 76 : 88;

  // Panels differ a lot in height. If you're reading deep inside a tall one
  // and switch to a shorter one, the page shrinks under you and the browser
  // clamps the scroll position, dropping you into a later section.
  //
  // So scroll first, then swap the panel. Doing it in that order means the
  // document is still tall when we move, so there is nothing to clamp and no
  // flash of the wrong section. The jump is instant on purpose: animating
  // would show the trip back up. Because the tabs are sticky at this exact
  // offset, they stay put on screen and only the content changes.
  const handleChange = (_, newValue) => {
    const el = rootRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top;
      if (top < stickyOffset) {
        // html has scroll-behavior:smooth, so opt out of it for this jump.
        const html = document.documentElement;
        const previous = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, window.scrollY + top - stickyOffset);
        html.style.scrollBehavior = previous;
      }
    }
    setValue(newValue);
  };

  const experienceItems = {
    Provelopers: {
      companyUrl: "https://www.provelopers.net/",
      roles: [
        {
          jobTitle: "Software Engineer II",
          duration: "Jul 2026 – Present",
          desc: [
            "Build and maintain backend services across SpeedPoint's Docker-orchestrated, multi-repo codebase spanning the customer/admin backend and frontend, ETL services, and supporting services.",
            "Design and operate Python (Flask + Pandas) ETL pipelines that migrate customer data from Shopmonkey and Tekmetric into the platform's schema, with field mapping, validation, and reconciliation before cutover.",
            "Trace failures across Traefik routing, container networking, Laravel APIs, and OpenSearch indexing to isolate root cause in a system.",
            "Ship vertical slices end to end database schema, Laravel APIs, Next.js interfaces, and Python data pipelines so migration and reporting features reach production without hand-off between teams.",
            "Designed an adapter-based canonical import path normalizes provider data into the platform's schema and reconciles it against source before writing to the OpenSearch index so new providers integrate through a single adapter with no downstream changes.",
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
            "Architected asynchronous processing pipelines on BullMQ and AWS SQS with retry/backoff, dead-letter queues, and horizontal worker scaling, sustaining and maintaining without message loss.",
            "Led migration of core services to containerized AWS ECS deployments managed with Terraform, replacing manual provisioning with reproducible staging and production environments and eliminating configuration drift.",
            "Built production observability from scratch CloudWatch custom metrics, distributed tracing, structured logging, and automated alerting cutting mean time to detection for incidents by 40%.",
            "Drive technical decisions in cross-functional Agile sprints: conduct architectural reviews, lead code reviews for the team, define API contracts, and enforce SLA compliance across critical services.",
            "Introduced API contract and integration testing, reducing production regression bugs by 30% across quarterly releases.",
          ],
        },
        {
          jobTitle: "Software Engineer",
          duration: "Feb 2024 – Oct 2025",
          desc: [
            "Built and operated production backend services for a high-traffic customer engagement platform owning feature delivery live-traffic debugging and incident triage under strict reliability requirements.",
            "Built offline-first React Native features on a local-first architecture with conflict-aware sync eliminating client reported data loss and lifting user retention 22%.",
            "Stood up the team's first observability layer CloudWatch metrics and alerting across core backend services surfacing anomalies before user impact and shortening incident response.",
            "Reverse-engineered and documented undocumented internal services and API contracts cutting new engineer onboarding time and giving adjacent teams a reference for cross-service debugging.",
            "Introduced Redis-backed BullMQ job processing to move long-running work off the request path laying the groundwork for the queue architecture later scaled across services.",
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
            "Delivered full-stack features on client-facing products in React.js, Node.js, and NestJS as one of 5 engineers contributing to technical direction as scope grew.",
            "Proactively learned and applied CI/CD practices contributed to pipeline improvements using GitHub Actions that reduced manual deployment steps and release friction for the team.",
            "Identified and fixed several API performance issues through query optimization and code refactoring improvements were noticed by senior engineers and led to more responsibility over time.",
            "Optimized GCP Cloud Run services through query optimization, Redis caching, and service right-sizing for faster responses.",
            "Collaborated closely with senior engineers and absorbed best practices in code structure, Git workflows, and REST API design applying learnings to every feature built.",
            "Established code quality standards linting, pre-commit hooks, unit test coverage thresholds and authored onboarding documentation adopted across the team.",
          ],
        },
      ],
    },
  };

  return (
    <div className={classes.root} ref={rootRef}>
      <Tabs
        orientation={isHorizontal ? "horizontal" : "vertical"}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
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
