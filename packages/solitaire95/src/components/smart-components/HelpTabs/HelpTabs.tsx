import React, { useState } from "react";
import { TabNavButton } from "./TabNavButton/TabNavButton";
import { TabContainer } from "./TabContainer/TabContainer";
import styles from "./HelpTabs.module.scss";

export const HelpTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Contents");

  const tabs = ["Contents", "Index", "Find"];

  const setActiveTabCallback = (tabToSetActive: string) =>
    setActiveTab(tabToSetActive);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.navBar}>
        {tabs.map((tabLabel) => (
          <TabNavButton
            label={tabLabel}
            activeTab={activeTab}
            setActiveTabCallback={setActiveTabCallback}
            key={tabLabel}
          />
        ))}
      </div>
      {tabs.map((tabLabel) => (
        <TabContainer activeTab={activeTab} label={tabLabel} key={tabLabel}>
          {tabLabel}
        </TabContainer>
      ))}
    </div>
  );
};
