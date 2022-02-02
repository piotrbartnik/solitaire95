import React, { useState, createContext } from "react";
import { TabNavButton } from "./TabNavButton/TabNavButton";
import { TabContainer } from "./TabContainer/TabContainer";
import styles from "./TabGroup.module.scss";

type TabGroupPropTypes = {
  defaultActiveTab: string;
  tabs: [string, React.ReactNode, boolean?][];
};

export const TabGroupContext = createContext("");

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
        {tabs.map(([tabLabel, , disabled]) => (
          <TabNavButton
            label={tabLabel}
            activeTab={activeTab}
            setActiveTabCallback={setActiveTabCallback}
            key={tabLabel}
            disabledTab={disabled}
          />
        ))}
      </div>
      <TabGroupContext.Provider value={activeTab}>
        {tabs.map(([tabLabel, tabChildren]) => (
          <TabContainer activeTab={activeTab} label={tabLabel} key={tabLabel}>
            {tabChildren}
          </TabContainer>
        ))}
      </TabGroupContext.Provider>
    </div>
  );
};
