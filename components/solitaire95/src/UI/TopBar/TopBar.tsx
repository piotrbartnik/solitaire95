import React from "react";
import appIco from "../../static/appIco.png";
import styles from "./TopBar.module.scss";

type propTypes = {
  title: string;
  showIcon?: boolean;
};

const TopBar: React.FC<propTypes> = (props) => {
  const { title, showIcon } = props;
  return (
    <>
      <div className={styles.topBar__bar}>
        {showIcon && (
          <img
            className={styles["topBar__bar--icon"]}
            src={appIco}
            alt="Application Icon"
          />
        )}
        <span className={styles["topBar__bar--title"]}>{title}</span>
      </div>
    </>
  );
};

export default TopBar;
