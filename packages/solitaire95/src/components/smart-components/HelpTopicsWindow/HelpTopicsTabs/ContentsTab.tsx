import React, { useState } from "react";
import { TextSelectField, TextButton } from "../../../ui-components";

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
