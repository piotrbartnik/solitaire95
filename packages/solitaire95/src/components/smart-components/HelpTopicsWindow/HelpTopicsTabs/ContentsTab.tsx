import React, { useState } from "react";
import { TextSelectField } from "../../../ui-components";
import styles from "./ContentsTab.module.scss";
import questionIcon from "./questionHelpIcon.png";

export const ContentsTab: React.VFC = () => {
  const [selectedItem, setSelectedItem] = useState<number>();

  return (
    <>
      Click a topic, and then click Display. Or click another tab, such as
      Index.
      <TextSelectField>
        <div className={styles.clickableText__container}>
          <img
            className={styles.clickableText__icon}
            src={questionIcon}
            alt="question mark icon"
          />
          <div
            className={[
              selectedItem === 0 &&
                styles["clickableText__textContainer--selected"],
              styles.clickableText__textContainer,
            ].join(" ")}
            onClick={() => setSelectedItem(0)}
          >
            How to play Solitaire
          </div>
        </div>
        <div className={styles.clickableText__container}>
          <img
            className={styles.clickableText__icon}
            src={questionIcon}
            alt="question mark icon"
          />
          <div
            className={[
              selectedItem === 1 &&
                styles["clickableText__textContainer--selected"],
              styles.clickableText__textContainer,
            ].join(" ")}
            onClick={() => setSelectedItem(1)}
          >
            Scoring information
          </div>
        </div>
      </TextSelectField>
    </>
  );
};
