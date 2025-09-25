import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Colorchange from "./colorchange";
import MainClock from "./time-clock/main";
import CustomizedAccordions from "./faq's/blueprint";
import WeatherApp from "./weather-apis/main";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const faqs = [
    {
      question: "React?",
      answer:
        "React is an open-source JavaScript library used for building fast and interactive user interfaces. It follows a component-based architecture where the UI is broken into independent, reusable pieces of code. React uses a virtual DOM to efficiently update only the parts of the page that change, instead of reloading the entire UI. It’s maintained by Meta (formerly Facebook) and has a massive ecosystem of tools, libraries, and community support, making it one of the most popular front-end technologies today.",
    },
    {
      question: "JSX?",
      answer:
        "JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code inside JavaScript. Instead of manually calling React.createElement for every DOM node, JSX lets you write code that looks familiar to HTML developers. At build time, JSX is compiled into JavaScript objects that React can render. It also supports embedding JavaScript expressions directly inside curly braces, which makes it easier to dynamically render content, apply conditions, and loop through lists. JSX improves readability and helps developers think about UI in terms of components.",
    },
    {
      question: "Accordion?",
      answer:
        "An Accordion is a UI component that organizes content into collapsible sections. Each section usually has a header (the question) and a hidden content area (the answer). When the header is clicked, the hidden content expands while optionally collapsing others. Accordions improve readability by preventing long blocks of text from overwhelming the user, allowing information to be displayed progressively. They are commonly used in FAQ pages, dashboards, and mobile apps where space optimization is important.",
    },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Color Change" {...a11yProps(0)} />
          <Tab label="Live CLock" {...a11yProps(1)} />
          <Tab label="FAQ'S" {...a11yProps(2)} />
                    <Tab label="Weather APP" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Colorchange />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MainClock />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CustomizedAccordions faqs={faqs} />
      </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
        <WeatherApp apiKey={'b5d9b8824c36d79aae56a9daf767cff6'} />
      </CustomTabPanel>
    </Box>
  );
}
