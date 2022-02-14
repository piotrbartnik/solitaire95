import React, { useState, useContext, useEffect } from "react";
import {
  TextSelectField,
  TextButton,
  TabGroupContext,
} from "../../../ui-components";
import styles from "./IndexTab.module.scss";

type IndexTabPropTypes = {
  notifyParent: (helpTopic: string) => void;
};

export const IndexTab: React.VFC<IndexTabPropTypes> = ({ notifyParent }) => {
  const [selectedItem, setSelectedItem] = useState<number>();

  const activeTab = useContext(TabGroupContext);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (activeTab !== "Index") {
      notifyParent("");
      setSelectedItem(undefined);
    }
  }, [activeTab, notifyParent]);

  useEffect(() => {
    if (searchValue.length) {
      if ("how to play".includes(searchValue)) {
        setSelectedItem(0);
        notifyParent("How to play Solitaire");
        return;
      }
      if ("scoring".includes(searchValue)) {
        setSelectedItem(1);
        notifyParent("Scoring information");
        return;
      }
    }
    setSelectedItem(undefined);
    notifyParent("");
  }, [notifyParent, searchValue]);

  return (
    <>
      1. Type the first few letters of the word you&apos;re looking for.
      <div className={styles.indexSearch__container}>
        <input
          className={styles.indexSearch__input}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
      2. Click the index entry you want, and then click Display.
      <TextSelectField fieldHeight={"260px"}>
        <TextButton
          onClickCallback={() => {
            setSelectedItem(0);
            notifyParent("How to play Solitaire");
          }}
          selectedItem={selectedItem}
          textId={0}
          showIcon={false}
          label={"how to play"}
        />

        <TextButton
          onClickCallback={() => {
            setSelectedItem(1);
            notifyParent("Scoring information");
          }}
          selectedItem={selectedItem}
          textId={1}
          showIcon={false}
          label={"scoring"}
        />
      </TextSelectField>
    </>
  );
};
