import React from "react";
import styles from "./TextButton.module.scss";
import questionIcon from "../../../static/misc/questionHelpIcon.png";

type TextButtonPropTypes = {
  selectedItem?: number;
  onClickCallback: () => void;
  textId: number;
  showIcon?: boolean;
  label: string;
};

export const TextButton: React.VFC<TextButtonPropTypes> = ({
  selectedItem,
  onClickCallback,
  textId,
  showIcon = true,
  label,
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
        role="button"
        aria-label={label}
      >
        {label}
      </div>
    </div>
  );
};
