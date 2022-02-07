import React from "react";
import styles from "./TabContainer.module.scss";

type TabContainerPropTypes = {
  activeTab: string;
  label: string;
};

export const TabContainer: React.FC<TabContainerPropTypes> = ({
  children,
  activeTab,
  label,
}) => {
  return (
    <div
      className={[
        styles.contentContainer,
        activeTab === label ? styles.active : undefined,
      ].join(" ")}
    >
      {activeTab === label && (
        <div className={styles.contentContainer__inner}>{children}</div>
      )}
    </div>
  );
};
