import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (isHorizontal) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  } else {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  if (isHorizontal) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  } else {
    return {
      id: `vertical-tab-${index}`,
    };
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    height: 300,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    "Algotix AI": {
      jobTitle: "Software Engineer @",
      duration: "FEB 2025 - PRESENT",
      desc: [
        "Architected and deployed scalable AWS infrastructure using EC2, S3, RDS, and CloudWatch monitoring, ensuring 99.9% uptime for production applications handling 10,000+ daily active users.",
        "Optimized backend services and database queries, achieving 15% performance improvement and reducing average API response time from 800ms to 680ms.",
        "Reduced deployment cycle time by 30% through implementation of Docker containerization and GitHub Actions CI/CD pipelines, enabling 3x faster feature releases.",
        "Developed cross-platform mobile applications using React Native with offline-first architecture, improving user retention by 22%.",
      ],
    },
    "Rehman Solutions": {
      jobTitle: "Full Stack Developer @",
      duration: "SEPT 2023 - FEB 2025",
      desc: [
        "Led a cross-functional team of 5 developers, implementing agile practices that increased sprint velocity by 40% and improved on-time delivery from 65% to 92%.",
        "Built production-grade mobile applications with real-time synchronization using Socket.IO and local-first architecture, enabling offline functionality and reducing data sync conflicts by 85%.",
        "Optimized Google Cloud Run functions and API architecture, improving response times by 25% while reducing monthly cloud costs by 20% through efficient resource utilization and caching strategies.",
        "Assigned primary responsibility for code reviews across full-stack applications, identifying critical issues and ensuring code quality standards before production deployments.",
        "Resolved complex bugs and performance bottlenecks in both frontend (React.js, React Native) and backend (Node.js, Nest.js) codebases, optimizing algorithms and refactoring legacy code to improve application stability.",
      ],
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={!isHorizontal ? "vertical" : null}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={isHorizontal ? `0${i}.` : key} {...a11yProps(i)} key={i} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i} key={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeInSection delay={`${i + 1}00ms`} key={i}>
                  <li>{descItem}</li>
                </FadeInSection>
              );
            })}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;