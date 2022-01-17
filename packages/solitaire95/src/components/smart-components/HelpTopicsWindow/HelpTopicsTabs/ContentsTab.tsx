import React from "react";
import { TextSelectField } from "../../../ui-components";

export const ContentsTab: React.VFC = () => {
  return (
    <>
      Click a topic, and then click Display. Or click another tab, such as
      Index.
      <TextSelectField>
        <p>How to play Solitaire</p>
        <p>Scoring information</p>
      </TextSelectField>
    </>
  );
};
