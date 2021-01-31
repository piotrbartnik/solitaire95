import React from "react";
import { connect } from "react-redux";
import * as cardActions from "../../store/actions/cardActions";
import * as windowActions from "../../store/actions/windowActions";
import * as scoreActions from "../../store/actions/scoreActions";
import { ToolBar, TopbarButton, ToolButton, Separator } from "../../UI";
import { ToolDropdown } from "../../components";
import styles from "./AppToolbar.module.scss";
import { resetPoints } from "src/store/actions/scoreActions";

type propTypes = {
  dealCards?: any;
  toggleCardBackWindow?: any;
  gameVisible: boolean;
  helpVisible: boolean;
  setGameVisible: (gameState: any) => void;
  setHelpVisible: (helpState: any) => void;
  setBottomBarText: any;
  resetPoints: any;
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
    resetPoints,
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
          >
            Game
          </TopbarButton>
          <ToolDropdown visible={gameVisible}>
            <>
              <ToolButton
                onClick={() => {
                  dealCards();
                  resetPoints();
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
          >
            Help
          </TopbarButton>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(cardActions.dealCards()),
    resetPoints: () => dispatch(scoreActions.resetPoints()),
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(windowActions.toggleCardBackWindow(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(AppToolbar);
