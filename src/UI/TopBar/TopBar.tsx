import React from "react";
import appIco from "../../static/appIco.png";
import styles from "./TopBar.module.scss";

const TopBar: React.FC = (props) => {
  return (
    <div className={styles.topBar__bar}>
      <img
        className={styles["topBar__bar--icon"]}
        src={appIco}
        alt="Application Icon"
      />
      Solitaire
    </div>
  );
};

export default TopBar;
