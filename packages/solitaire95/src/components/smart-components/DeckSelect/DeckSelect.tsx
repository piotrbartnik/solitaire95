import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/windowActions";
import { CardBackContext } from "../../game-containers";
import { SettingsWindow } from "../../ui-components";
import { cardBackImages } from "../../../static/cardBacks";
import styles from "./DeckSelect.module.scss";

export type deckSelectStateTypes = {
  isWindowVisible?: boolean;
};
export type deckSelectDispatchTypes = {
  toggleCardBackWindow?: any;
};

const DeckSelect: React.FC<deckSelectStateTypes & deckSelectDispatchTypes> = (
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

const mapStateToProps = (state: any) => {
  return {
    isWindowVisible: state.toggleWindows.cardBackWindowState,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(actions.toggleCardBackWindow(payload)),
  };
};

export default connect<deckSelectStateTypes, deckSelectDispatchTypes>(
  mapStateToProps,
  mapDispatchToProps
)(DeckSelect);
