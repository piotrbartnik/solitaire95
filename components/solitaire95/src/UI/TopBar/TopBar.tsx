import React from "react";
import appIco from "../../static/appIco.png";
import styles from "./TopBar.module.scss";

type propTypes = {
  title: string;
  showIcon?: boolean;
  children?: any;
};

const TopBar: React.FC<propTypes> = (props) => {
  const { title, showIcon, children } = props;
  return (
    <>
      <div className={styles.topBar__bar}>
        <div className={styles.leftSide}>
          {showIcon && (
            <img
              className={styles["topBar__bar--icon"]}
              src={appIco}
              alt="Application Icon"
            />
          )}
          <span className={styles["topBar__bar--title"]}>{title}</span>
        </div>
        <div className={styles.rightide}>{children}</div>
      </div>
    </>
  );
};

export default TopBar;
