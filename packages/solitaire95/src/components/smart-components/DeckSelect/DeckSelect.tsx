import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { toggleWindow, setCardDeck } from "../../../store/actions/";
import {
  SetCardDeckType,
  ToggleWindowType,
} from "../../../store/actions/actionTypes";
import { WindowsState, GameState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { cardBackImages } from "../../../static/cardBacks";
import styles from "./DeckSelect.module.scss";

export type DeckSelectStateTypes = {
  isWindowVisible?: boolean;
  cardBackImage: string;
};
export type DeckSelectDispatchTypes = {
  toggleCardBackWindow: ToggleWindowType;
  setCardDeck: SetCardDeckType;
};

const DeckSelectInternal: React.FC<
  DeckSelectStateTypes & DeckSelectDispatchTypes
> = (props) => {
  const { isWindowVisible, toggleCardBackWindow, cardBackImage, setCardDeck } =
    props;
  const [selectedCardBack, setSelectedCardBack] = useState<string>("");
  const [newCardBackIndex, setNewCardBackIndex] = useState<number>();

  const handleButtonClick = (
    { key }: { key: string },
    selectedCardBack: string,
    cardIndex: number
  ) => {
    if (key === "Enter") {
      setNewCardBackIndex(cardIndex);
      setSelectedCardBack(selectedCardBack);
    }
  };

  const okOnClick = () => {
    selectedCardBack ? setCardDeck(selectedCardBack) : undefined;
    toggleCardBackWindow(false, "cardBackWindow");
  };

  const cancelOnClick = () => {
    toggleCardBackWindow(false, "cardBackWindow");
  };

  const closeButtonActionCallback = useCallback(
    () => toggleCardBackWindow(false, "cardBackWindow"),
    [toggleCardBackWindow]
  );

  return (
    <SettingsWindow
      windowTitle={"Select Card Back"}
      buttons={[
        { text: "OK", onClick: okOnClick },
        { text: "Cancel", onClick: cancelOnClick },
      ]}
      visible={isWindowVisible as boolean}
      closeButtonAction={closeButtonActionCallback}
      width={528}
      height={360}
    >
      <div className={styles.deckContainer}>
        <div className={styles.deckContainer__cardBackContainer}>
          {Object.keys(cardBackImages).map((cardBack, index) => (
            <div
              role="button"
              title={cardBack}
              key={index}
              className={[
                styles.deckContainer__cardBack,
                cardBack === cardBackImage && styles.selected,
                index === newCardBackIndex && styles.newSelected,
              ].join(" ")}
              tabIndex={1}
              style={{ backgroundImage: `url(${cardBackImages[cardBack]})` }}
              onClick={() => setSelectedCardBack(cardBack)}
              onKeyPress={(e) => handleButtonClick(e, cardBack, index)}
              onDoubleClick={() => {
                setCardDeck(cardBack);
                toggleCardBackWindow(false, "cardBackWindow");
              }}
            />
          ))}
        </div>
      </div>
    </SettingsWindow>
  );
};

const mapStateToProps = (state: {
  toggleWindows: WindowsState;
  gameState: GameState;
}) => {
  return {
    isWindowVisible: state.toggleWindows.cardBackWindow,
    cardBackImage: state.gameState.cardDeck,
  };
};

const mapDispatchToProps = {
  toggleCardBackWindow: toggleWindow,
  setCardDeck: setCardDeck,
};

export const DeckSelect = connect<
  DeckSelectStateTypes,
  DeckSelectDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(DeckSelectInternal);
