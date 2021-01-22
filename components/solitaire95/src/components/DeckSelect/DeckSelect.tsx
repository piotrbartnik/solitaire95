import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/windowActions";
import { CardBackContext } from "../../containers/";
import { SettingsWindow } from "../../UI";
import { cardBackImages } from "../../static/cardBacks/";
import styles from "./DeckSelect.module.scss";

type propTypes = {
  isWindowVisible: boolean;
  toggleCardBackWindow: any;
};

const DeckSelect: React.FC<propTypes> = (props) => {
  const { isWindowVisible, toggleCardBackWindow } = props;
  const [selectedCardBack, setSelectedCardBack] = useState("");
  const { setCardBackImage } = useContext(CardBackContext);

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
    >
      <div className={styles.deckContainer}>
        <div className={styles.deckContainer__cardBackContainer}>
          {Object.keys(cardBackImages).map((cardBack, index) => (
            <div
              key={index}
              className={styles.deckContainer__cardBack}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeckSelect);
