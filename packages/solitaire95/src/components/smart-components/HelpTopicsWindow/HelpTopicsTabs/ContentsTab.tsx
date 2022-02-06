import React, { useState, useContext, useEffect } from "react";
import {
  TextSelectField,
  TextButton,
  TabGroupContext,
} from "../../../ui-components";

type ContentsTabPropTypes = {
  notifyParent: (helpTopic: string) => void;
};

export const ContentsTab: React.VFC<ContentsTabPropTypes> = ({
  notifyParent,
}) => {
  const [selectedItem, setSelectedItem] = useState<number>();

  const activeTab = useContext(TabGroupContext);

  useEffect(() => {
    if (activeTab !== "Contents") {
      notifyParent("");
      setSelectedItem(undefined);
    }
  }, [activeTab, notifyParent]);

  return (
    <>
      Click a topic, and then click Display. Or click another tab, such as
      Index.
      <TextSelectField>
        <TextButton
          onClickCallback={() => {
            setSelectedItem(0);
            notifyParent("How to play Solitaire");
          }}
          selectedItem={selectedItem}
          textId={0}
        >
          How to play Solitaire
        </TextButton>
        <TextButton
          onClickCallback={() => {
            setSelectedItem(1);
            notifyParent("Scoring information");
          }}
          selectedItem={selectedItem}
          textId={1}
        >
          Scoring information
        </TextButton>
      </TextSelectField>
    </>
  );
};
