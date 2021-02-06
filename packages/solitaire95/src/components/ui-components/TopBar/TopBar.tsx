import React from "react";
import { DragElementWrapper, DragSourceOptions } from "react-dnd";
import appIco from "../../../static/appIco.png";
import styles from "./TopBar.module.scss";

type propTypes = {
  title: string;
  showIcon?: boolean;
  children?: any;
  shouldBeGreyedOut?: boolean;
  dragRef?: DragElementWrapper<DragSourceOptions>;
};

const TopBar: React.FC<propTypes> = (props) => {
  const { title, showIcon, children, shouldBeGreyedOut, dragRef } = props;
  return (
    <>
      <div
        className={[
          styles.topBar__bar,
          shouldBeGreyedOut && styles["topBar__bar--grey"],
        ].join(" ")}
        ref={dragRef}
      >
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
