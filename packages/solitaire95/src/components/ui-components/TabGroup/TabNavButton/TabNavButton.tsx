import React from "react";
import styles from "./TabNavButton.module.scss";

type TabNavButtonPropTypes = {
  activeTab: string;
  label: string;
  setActiveTabCallback: (tabToSetActive: string) => void;
  disabledTab?: boolean;
};

export const TabNavButton: React.VFC<TabNavButtonPropTypes> = ({
  activeTab,
  label,
  setActiveTabCallback,
  disabledTab,
}) => (
  <button
    className={[
      styles.tabButton,
      activeTab === label ? styles.tabButton__active : undefined,
      disabledTab ? styles.tabButton__disabled : undefined,
    ].join(" ")}
    onClick={!disabledTab ? () => setActiveTabCallback(label) : undefined}
  >
    {label}
  </button>
);
