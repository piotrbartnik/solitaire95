import React, { useState } from "react";
import { TextSelectField } from "../../../ui-components";
import styles from "./ContentsTab.module.scss";
import questionIcon from "./questionHelpIcon.png";

type TextButtonPropTypes = {
  selectedItem?: number;
  onClickCallback: () => void;
  textId: number;
};

const TextButton: React.FC<TextButtonPropTypes> = ({
  children,
  selectedItem,
  onClickCallback,
  textId,
}) => {
  return (
    <div className={styles.clickableText__container}>
      <img
        className={styles.clickableText__icon}
        src={questionIcon}
        alt="question mark icon"
      />
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

export const ContentsTab: React.VFC = () => {
  const [selectedItem, setSelectedItem] = useState<number>();

  return (
    <>
      Click a topic, and then click Display. Or click another tab, such as
      Index.
      <TextSelectField>
        <TextButton
          onClickCallback={() => setSelectedItem(0)}
          selectedItem={selectedItem}
          textId={0}
        >
          How to play Solitaire
        </TextButton>
        <TextButton
          onClickCallback={() => setSelectedItem(1)}
          selectedItem={selectedItem}
          textId={1}
        >
          Scoring information
        </TextButton>
      </TextSelectField>
    </>
  );
};
