import React from "react";
import styles from "./TabNavButton.module.scss";

type TabNavButtonPropTypes = {
  activeTab: string;
  label: string;
  setActiveTabCallback: (tabToSetActive: string) => void;
};

export const TabNavButton: React.VFC<TabNavButtonPropTypes> = ({
  activeTab,
  label,
  setActiveTabCallback,
}) => (
  <button
    className={[
      styles.tabButton,
      activeTab === label ? styles.tabButton__active : undefined,
    ].join(" ")}
    onClick={() => setActiveTabCallback(label)}
  >
    {label}
  </button>
);
