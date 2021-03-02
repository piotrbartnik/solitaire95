import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/windowActions";
import { WindowsState } from "../../../store/reducers/windowsReducer";
import { CardBackContext } from "../../game-containers";
import { SettingsWindow } from "../../ui-components";
import { cardBackImages } from "../../../static/cardBacks";
import styles from "./DeckSelect.module.scss";

export type DeckSelectStateTypes = {
  isWindowVisible?: boolean;
};
export type DeckSelectDispatchTypes = {
  toggleCardBackWindow: (windowState: boolean) => void;
};

const DeckSelect: React.FC<DeckSelectStateTypes & DeckSelectDispatchTypes> = (
  props
) => {
  const { isWindowVisible, toggleCardBackWindow } = props;
  const [selectedCardBack, setSelectedCardBack] = useState<string>("");
  const { cardBackImage, setCardBackImage } = useContext(CardBackContext);

  const okOnClick = () => {
    selectedCardBack ? setCardBackImage(selectedCardBack) : undefined;
    toggleCardBackWindow(false);
  };

  const cancelOnClick = () => {
    toggleCardBackWindow(false);
  };

  return (
    <SettingsWindow
      windowTitle={"Select Card Back"}
      buttons={[
        { text: "OK", onClick: okOnClick },
        { text: "Cancel", onClick: cancelOnClick },
      ]}
      visible={isWindowVisible as boolean}
      closeButtonAction={() => toggleCardBackWindow(false)}
      width={"528px"}
    >
      <div className={styles.deckContainer}>
        <div className={styles.deckContainer__cardBackContainer}>
          {Object.keys(cardBackImages).map((cardBack, index) => (
            <div
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
                toggleCardBackWindow(false);
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
    isWindowVisible: state.toggleWindows.cardBackWindowState,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(actions.toggleCardBackWindow(payload)),
  };
};

export default connect<DeckSelectStateTypes, DeckSelectDispatchTypes>(
  mapStateToProps,
  mapDispatchToProps
)(DeckSelect);
