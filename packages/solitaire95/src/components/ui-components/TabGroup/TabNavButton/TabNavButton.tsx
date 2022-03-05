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
}) => {
  const tabActionCallback = !disabledTab
    ? () => setActiveTabCallback(label)
    : undefined;

  const handleButtonClick = ({ key }: { key: string }) => {
    if (key === "Enter") {
      tabActionCallback?.();
    }
  };

  return (
    <button
      className={[
        styles.tabButton,
        activeTab === label ? styles.tabButton__active : undefined,
        disabledTab ? styles.tabButton__disabled : undefined,
      ].join(" ")}
      onClick={() => tabActionCallback?.()}
      disabled={disabledTab}
      tabIndex={1}
      onKeyPress={handleButtonClick}
    >
      {label}
    </button>
  );
};
