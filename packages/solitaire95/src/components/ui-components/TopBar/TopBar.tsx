import React from "react";
import { DragElementWrapper, DragSourceOptions } from "react-dnd";
import appIco from "../../../static/appIco.png";
import styles from "./TopBar.module.scss";

type TopBarPropTypes = {
  title: string;
  showIcon?: boolean;
  children?: JSX.Element;
  shouldBeGreyedOut?: boolean;
  dragRef?: DragElementWrapper<DragSourceOptions>;
};

export const TopBar: React.FC<TopBarPropTypes> = (props) => {
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
