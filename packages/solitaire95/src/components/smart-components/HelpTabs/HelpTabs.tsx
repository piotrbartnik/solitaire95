import React, { useState } from "react";
import styles from "./HelpTabs.module.scss";

type PilePropTypes = {
  children?: JSX.Element;
};

export const HelpTabs: React.FC<PilePropTypes> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Contents");

  console.log(children);

  return (
    <div className={styles.tabContainer}>
      <div className={styles.navBar}>
        <button onClick={() => setActiveTab("Contents")}>Contents</button>
        <button onClick={() => setActiveTab("Index")}>Index</button>
        <button onClick={() => setActiveTab("Find")}>Find</button>
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
