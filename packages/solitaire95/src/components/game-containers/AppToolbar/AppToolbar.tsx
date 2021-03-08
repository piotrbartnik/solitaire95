import React from "react";
import { connect } from "react-redux";
import {
  dealCards,
  resetScore,
  stopGame,
  toggleCardBackWindow,
} from "../../../store/actions/";
import {
  ToolBar,
  TopbarButton,
  ToolButton,
  Separator,
} from "../../ui-components";
import { ToolDropdown } from "../../smart-components";
import styles from "./AppToolbar.module.scss";

type AppToolbarDispatchTypes = {
  dealCards: () => void;
  toggleCardBackWindow: (windowState: boolean) => void;
  resetScore: () => void;
  stopGame: () => void;
};

type AppToolbarPropTypes = {
  gameVisible: boolean;
  helpVisible: boolean;
  setGameVisible: (prevState: boolean) => void;
  setHelpVisible: (prevState: boolean) => void;
  setBottomBarText: (text: string) => void;
};

const AppToolbarInternal: React.FC<
  AppToolbarDispatchTypes & AppToolbarPropTypes
> = (props) => {
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
              setGameVisible(!gameVisible);
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
                  setGameVisible(!gameVisible);
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
              setHelpVisible(!helpVisible);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(dealCards()),
    resetScore: () => dispatch(resetScore()),
    stopGame: () => dispatch(stopGame()),
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(toggleCardBackWindow(payload)),
  };
};

export const AppToolbar = connect<
  never,
  AppToolbarDispatchTypes,
  AppToolbarPropTypes
>(
  undefined,
  mapDispatchToProps
)(AppToolbarInternal);
