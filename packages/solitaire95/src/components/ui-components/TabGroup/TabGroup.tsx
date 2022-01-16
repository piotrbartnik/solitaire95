import React, { useState } from "react";
import { TabNavButton } from "./TabNavButton/TabNavButton";
import { TabContainer } from "./TabContainer/TabContainer";
import styles from "./TabGroup.module.scss";

type TabGroupPropTypes = {
  defaultActiveTab: string;
  tabs: [string, React.ReactNode][];
};

export const TabGroup: React.VFC<TabGroupPropTypes> = ({
  defaultActiveTab,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const setActiveTabCallback = (tabToSetActive: string) =>
    setActiveTab(tabToSetActive);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.navBar}>
        {tabs.map(([tabLabel]) => (
          <TabNavButton
            label={tabLabel}
            activeTab={activeTab}
            setActiveTabCallback={setActiveTabCallback}
            key={tabLabel}
          />
        ))}
      </div>
      {tabs.map(([tabLabel, tabChildren]) => (
        <TabContainer activeTab={activeTab} label={tabLabel} key={tabLabel}>
          {tabChildren}
        </TabContainer>
      ))}
    </div>
  );
};
