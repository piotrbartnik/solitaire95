import React from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import {
  ToolBar,
  TopbarButton,
  ToolButton,
  Separator,
} from "../../ui-components";
import { ToolDropdown } from "../../smart-components";
import styles from "./AppToolbar.module.scss";
import { GameDropdown } from "./Dropdowns/GameDropdown/GameDropdown";

type AppToolbarDispatchTypes = {
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
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
    gameVisible,
    helpVisible,
    setGameVisible,
    setHelpVisible,
    setBottomBarText,
    toggleAboutWindow,
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
            id={"gameButton"}
            active={gameVisible}
            onMouseOver={() => {
              if (helpVisible) {
                setGameVisible(!gameVisible);
                setHelpVisible(false);
              }
            }}
          />
          <ToolDropdown visible={gameVisible} buttonId={"gameButton"}>
            <GameDropdown
              gameVisible={gameVisible}
              setBottomBarText={setBottomBarText}
              setGameVisible={setGameVisible}
              setHelpVisible={setHelpVisible}
            />
          </ToolDropdown>
        </div>
        <div style={{ width: "100%" }}>
          <TopbarButton
            onClick={() => {
              setHelpVisible(!helpVisible);
              setGameVisible(false);
            }}
            buttonText={"Help"}
            id={"helpButton"}
            active={helpVisible}
            onMouseOver={() => {
              if (gameVisible) {
                setHelpVisible(!helpVisible);
                setGameVisible(false);
              }
            }}
          />
          <ToolDropdown visible={helpVisible} buttonId={"helpButton"}>
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
                onClick={() => {
                  toggleAboutWindow(true, "aboutWindow");
                  setHelpVisible(false);
                }}
                text="About"
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
    toggleAboutWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const AppToolbar = connect<
  undefined,
  AppToolbarDispatchTypes,
  AppToolbarPropTypes
>(
  undefined,
  mapDispatchToProps
)(AppToolbarInternal);
