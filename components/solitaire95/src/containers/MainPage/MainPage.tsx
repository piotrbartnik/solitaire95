import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import * as cardActions from "../../store/actions/cardActions";
import * as windowActions from "../../store/actions/windowActions";
import {
  TopBar,
  ToolBar,
  BottomBar,
  TopbarButton,
  ToolButton,
  Separator,
} from "../../UI";
import { ToolDropdown, DeckSelect } from "../../components";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

export const CardBackContext = createContext({
  cardBackImage: "acorns",
  setCardBackImage: (cardBackName: string) => cardBackName,
});

type propTypes = {
  dealCards?: any;
  toggleCardBackWindow?: any;
};

const MainPage: React.FC<propTypes> = (props) => {
  const { dealCards, toggleCardBackWindow } = props;

  const [cardBackImage, setCardBackImage] = useState("acorns");
  const value: { cardBackImage: string; setCardBackImage: any } = {
    cardBackImage,
    setCardBackImage,
  };

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
        <CardBackContext.Provider value={value}>
          <DeckSelect />
          <TopBar title={"Solitaire"} showIcon />
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
                      <ToolButton
                        onClick={() => {
                          toggleCardBackWindow(true);
                        }}
                      >
                        Deck
                      </ToolButton>
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
        </CardBackContext.Provider>
      </div>
    </DndProvider>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(cardActions.dealCards()),
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(windowActions.toggleCardBackWindow(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(MainPage);
