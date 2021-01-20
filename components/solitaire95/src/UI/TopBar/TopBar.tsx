import React from "react";
import appIco from "../../static/appIco.png";
import styles from "./TopBar.module.scss";

type propTypes = {
  title: string;
};

const TopBar: React.FC<propTypes> = (props) => {
  const { title } = props;
  return (
    <>
      <div className={styles.topBar__bar}>
        <img
          className={styles["topBar__bar--icon"]}
          src={appIco}
          alt="Application Icon"
        />
        <span className={styles["topBar__bar--title"]}>{title}</span>
      </div>
    </>
  );
};

export default TopBar;
