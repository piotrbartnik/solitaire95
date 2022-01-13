import React, { useState } from "react";
import { TabNavButton } from "./TabNavButton/TabNavButton";
import styles from "./HelpTabs.module.scss";

export const HelpTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Contents");

  const tabs = ["Contents", "Index", "Find"];

  const setActiveTabCallback = (tabToSetActive: string) =>
    setActiveTab(tabToSetActive);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.navBar}>
        {tabs.map((tab) => (
          <TabNavButton
            label={tab}
            activeTab={activeTab}
            setActiveTabCallback={setActiveTabCallback}
            key={tab}
          />
        ))}
      </div>
      <div
        className={[
          styles.contentContainer,
          activeTab === "Contents" ? styles.active : undefined,
        ].join(" ")}
      >
        <div className={styles.contentContainer__inner}>Contents</div>
      </div>
      <div
        className={[
          styles.contentContainer,
          activeTab === "Index" ? styles.active : undefined,
        ].join(" ")}
      >
        <div className={styles.contentContainer__inner}>Index</div>
      </div>
      <div
        className={[
          styles.contentContainer,
          activeTab === "Find" ? styles.active : undefined,
        ].join(" ")}
      >
        <div className={styles.contentContainer__inner}>Find</div>
      </div>
    </div>
  );
};
