import React, { useContext, useState, useCallback } from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { CardBackContext } from "../../game-containers";
import { SettingsWindow } from "../../ui-components";
import { cardBackImages } from "../../../static/cardBacks";
import styles from "./DeckSelect.module.scss";

export type DeckSelectStateTypes = {
  isWindowVisible?: boolean;
};
export type DeckSelectDispatchTypes = {
  toggleCardBackWindow: (windowState: boolean, windowToToggle: string) => void;
};

const DeckSelectInternal: React.FC<
  DeckSelectStateTypes & DeckSelectDispatchTypes
> = (props) => {
  const { isWindowVisible, toggleCardBackWindow } = props;
  const [selectedCardBack, setSelectedCardBack] = useState<string>("");
  const { cardBackImage, setCardBackImage } = useContext(CardBackContext);

  const okOnClick = () => {
    selectedCardBack ? setCardBackImage(selectedCardBack) : undefined;
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
      width={"528px"}
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
              ].join(" ")}
              tabIndex={1}
              style={{ backgroundImage: `url(${cardBackImages[cardBack]})` }}
              onClick={() => setSelectedCardBack(cardBack)}
              onDoubleClick={() => {
                setCardBackImage(cardBack);
                toggleCardBackWindow(false, "cardBackWindow");
              }}
            />
          ))}
        </div>
      </div>
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => {
  return {
    isWindowVisible: state.toggleWindows.cardBackWindow,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleCardBackWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const DeckSelect = connect<
  DeckSelectStateTypes,
  DeckSelectDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(DeckSelectInternal);
