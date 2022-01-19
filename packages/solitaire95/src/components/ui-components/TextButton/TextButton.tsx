import React from "react";
import styles from "./TextButton.module.scss";
import questionIcon from "./questionHelpIcon.png";

type TextButtonPropTypes = {
  selectedItem?: number;
  onClickCallback: () => void;
  textId: number;
  showIcon?: boolean;
};

export const TextButton: React.FC<TextButtonPropTypes> = ({
  children,
  selectedItem,
  onClickCallback,
  textId,
  showIcon = true,
}) => {
  return (
    <div className={styles.clickableText__container}>
      {showIcon && (
        <img
          className={styles.clickableText__icon}
          src={questionIcon}
          alt="question mark icon"
        />
      )}
      <div
        className={[
          selectedItem === textId &&
            styles["clickableText__textContainer--selected"],
          styles.clickableText__textContainer,
        ].join(" ")}
        onClick={onClickCallback}
      >
        {children}
      </div>
    </div>
  );
};
