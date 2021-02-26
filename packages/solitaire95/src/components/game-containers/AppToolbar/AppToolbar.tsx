import React from "react";
import { connect } from "react-redux";
import * as cardActions from "../../../store/actions/cardActions";
import * as windowActions from "../../../store/actions/windowActions";
import * as scoreActions from "../../../store/actions/scoreActions";
import * as gameActions from "../../../store/actions/gameActions";
import { cardDealTypes } from "../../../store/actions/cardActions";
import { resetScoreTypes } from "../../../store/actions/scoreActions";
import {
  ToolBar,
  TopbarButton,
  ToolButton,
  Separator,
} from "../../ui-components";
import { ToolDropdown } from "../../smart-components";
import styles from "./AppToolbar.module.scss";

type propTypes = {
  dealCards: () => void;
  toggleCardBackWindow: (windowState: boolean) => void;
  gameVisible: boolean;
  helpVisible: boolean;
  setGameVisible: any;
  setHelpVisible: any;
  setBottomBarText: (text: string) => void;
  resetScore: () => void;
  stopGame: () => void;
};

const AppToolbar: React.FC<propTypes> = (props) => {
  const {
    dealCards,
    toggleCardBackWindow,
    gameVisible,
    helpVisible,
    setGameVisible,
    setHelpVisible,
    setBottomBarText,
    resetScore,
    stopGame,
  } = props;

  return (
    <ToolBar>
      <div className={styles.topBarButtonContainer}>
        <div style={{ width: "100%" }}>
          <TopbarButton
            onClick={() => {
              setGameVisible((gameVisible: boolean) => !gameVisible);
              setHelpVisible(false);
            }}
            buttonText={"Game"}
          />
          <ToolDropdown visible={gameVisible}>
            <>
              <ToolButton
                onClick={() => {
                  dealCards();
                  resetScore();
                  stopGame();
                  setGameVisible((gameVisible: boolean) => !gameVisible);
                  setHelpVisible(false);
                }}
                onMouseOver={() => setBottomBarText("Deal a new game")}
                onMouseLeave={() => setBottomBarText("")}
                text="Deal"
              />
              <Separator />
              <ToolButton
                onMouseOver={() => setBottomBarText("Undo last action")}
                onMouseLeave={() => setBottomBarText("")}
                text="Undo"
                disabled
              />
              <ToolButton
                onClick={() => {
                  toggleCardBackWindow(true);
                  setGameVisible(false);
                }}
                onMouseOver={() => setBottomBarText("Choose new deck back")}
                onMouseLeave={() => setBottomBarText("")}
                text="Deck"
              />
              <ToolButton
                onMouseOver={() => setBottomBarText("Change Solitaire options")}
                onMouseLeave={() => setBottomBarText("")}
                text="Options"
                disabled
              />
              <Separator />
              <ToolButton
                onMouseOver={() => setBottomBarText("Exit Solitaire")}
                onMouseLeave={() => setBottomBarText("")}
                text="Exit"
                disabled
              />
            </>
          </ToolDropdown>
        </div>
        <div style={{ width: "100%" }}>
          <TopbarButton
            onClick={() => {
              setHelpVisible((helpVisible: boolean) => !helpVisible);
              setGameVisible(false);
            }}
            buttonText={"Help"}
          />
          <ToolDropdown visible={helpVisible}>
            <>
              <ToolButton
                onMouseOver={() =>
                  setBottomBarText("Index of Solitaire help topics")
                }
                onMouseLeave={() => setBottomBarText("")}
                text="Help Topics"
                disabled
              />
              <Separator />
              <ToolButton
                onMouseOver={() => setBottomBarText("About Solitaire")}
                onMouseLeave={() => setBottomBarText("")}
                text="About"
                disabled
              />
            </>
          </ToolDropdown>
        </div>
      </div>
    </ToolBar>
  );
};

const mapDispatchToProps = (
  dispatch: (dispatch: cardDealTypes | resetScoreTypes) => void
) => {
  return {
    dealCards: () => dispatch(cardActions.dealCards()),
    resetScore: () => dispatch(scoreActions.resetScore()),
    stopGame: () => dispatch(gameActions.stopGame()),
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(windowActions.toggleCardBackWindow(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(AppToolbar);
