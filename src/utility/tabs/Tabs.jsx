import React, { useState } from "react";
import TabCss from "./tabs.module.css";

// Tabs Component
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  // Handle tab click
  const onTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className={TabCss.container}>
      <div className={TabCss.tabsContainer}>
        {children.map((tab) => (
          <button
            key={tab.props.label}
            className={`${TabCss.tabButton} ${
              activeTab === tab.props.label ? TabCss.active : ""
            }`}
            onClick={() => onTabClick(tab.props.label)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {children.map((tab) => {
          if (tab.props.label === activeTab) {
            return <div key={tab.props.label}>{tab.props.children}</div>;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

// Tab Component
const Tab = ({ label, children }) => {
  return <>{children}</>;
};

export { Tabs, Tab };
