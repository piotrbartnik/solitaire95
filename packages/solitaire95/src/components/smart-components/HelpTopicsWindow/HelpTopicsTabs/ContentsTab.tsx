import React, { useState } from "react";
import { TextSelectField } from "../../../ui-components";
import styles from "./ContentsTab.module.scss";

export const ContentsTab: React.VFC = () => {
  const [selectedItem, setSelectedItem] = useState<number>();

  return (
    <>
      Click a topic, and then click Display. Or click another tab, such as
      Index.
      <TextSelectField>
        <div
          className={[
            selectedItem === 0 && styles.selected,
            styles.textContainer,
          ].join(" ")}
          onClick={() => setSelectedItem(0)}
        >
          How to play Solitaire
        </div>
        <div
          className={[
            selectedItem === 1 && styles.selected,
            styles.textContainer,
          ].join(" ")}
          onClick={() => setSelectedItem(1)}
        >
          Scoring information
        </div>
      </TextSelectField>
    </>
  );
};
