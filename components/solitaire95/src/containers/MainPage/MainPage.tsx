import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import {
  TopBar,
  ToolBar,
  BottomBar,
  TopbarButton,
  ToolButton,
  Separator,
  SettingsWindow,
} from "../../UI";
import { ToolDropdown } from "../../components";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

type propTypes = {
  dealCards?: any;
};

const MainPage: React.FC<propTypes> = (props) => {
  const { dealCards } = props;
  const [gameVisible, setGameVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const dndProviderBackend = /Mobi|Android/i.test(navigator.userAgent)
    ? TouchBackend
    : HTML5Backend;
  return (
    <DndProvider backend={dndProviderBackend}>
      <div
        className={styles.mainPage}
        onClick={() => {
          if (gameVisible) {
            setGameVisible(false);
          }
          if (helpVisible) {
            setHelpVisible(false);
          }
        }}
      >
        <SettingsWindow />
        <TopBar title={"Solitaire"} />
        <ToolBar>
          <div className={styles.topBarButtonContainer}>
            <div style={{ width: "100%" }}>
              <TopbarButton
                onClick={() => {
                  setGameVisible((gameVisible) => !gameVisible);
                  setHelpVisible(false);
                }}
              >
                Game
              </TopbarButton>
              <ToolDropdown visible={gameVisible}>
                <>
                  <div className={styles.toolElement}>
                    <ToolButton
                      onClick={() => {
                        dealCards();
                        setGameVisible((gameVisible) => !gameVisible);
                        setHelpVisible(false);
                      }}
                    >
                      Deal
                    </ToolButton>
                  </div>
                  <Separator />
                  <div className={styles.toolElement}>
                    <ToolButton>Undo</ToolButton>
                  </div>
                  <div className={styles.toolElement}>
                    <ToolButton>Deck</ToolButton>
                  </div>
                  <div className={styles.toolElement}>
                    <ToolButton>Options</ToolButton>
                  </div>
                  <Separator />
                  <div className={styles.toolElement}>
                    <ToolButton>Exit</ToolButton>
                  </div>
                </>
              </ToolDropdown>
            </div>
            <div style={{ width: "100%" }}>
              <TopbarButton
                onClick={() => {
                  setHelpVisible((helpVisible) => !helpVisible);
                  setGameVisible(false);
                }}
              >
                Help
              </TopbarButton>
              <ToolDropdown visible={helpVisible}>
                <div className={styles.toolElement}>
                  <ToolButton>About</ToolButton>
                </div>
              </ToolDropdown>
            </div>
          </div>
        </ToolBar>
        <GameContainer />
        <BottomBar />
      </div>
    </DndProvider>
  );
};

const mapDispatchToProps = {
  dealCards: actions.dealCards,
};

export default connect(undefined, mapDispatchToProps)(MainPage);
