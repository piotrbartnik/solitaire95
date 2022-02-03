import React, { useState, useContext, useEffect } from "react";
import {
  TextSelectField,
  TextButton,
  TabGroupContext,
} from "../../../ui-components";

type IndexTabPropTypes = {
  notifyParent: (helpTopic: string) => void;
};

export const IndexTab: React.VFC<IndexTabPropTypes> = ({ notifyParent }) => {
  const [selectedItem, setSelectedItem] = useState<number>();

  const activeTab = useContext(TabGroupContext);

  useEffect(() => {
    if (activeTab !== "Index") {
      notifyParent("");
      setSelectedItem(undefined);
    }
  }, [activeTab, notifyParent]);

  return (
    <>
      1. Type the first few letters of the word you&apos;re looking for.
      <input />
      2. Click the index entry you want, and then click Display.
      <TextSelectField>
        <TextButton
          onClickCallback={() => {
            setSelectedItem(0);
            notifyParent("How to play Solitaire");
          }}
          selectedItem={selectedItem}
          textId={0}
          showIcon={false}
        >
          how to play
        </TextButton>
        <TextButton
          onClickCallback={() => {
            setSelectedItem(1);
            notifyParent("Scoring information");
          }}
          selectedItem={selectedItem}
          textId={1}
          showIcon={false}
        >
          scoring
        </TextButton>
      </TextSelectField>
    </>
  );
};
