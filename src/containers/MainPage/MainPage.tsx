import React, { ReactNode, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cardActions";
import { TopBar, ToolBar, BottomBar, TopbarButton } from "../../UI";
import { ToolDropdown } from "../../components";
import { GameContainer } from "../";
import styles from "./MainPage.module.scss";

type propTypes = {
  dealCards?: any;
  onClick?: any;
  children?: ReactNode;
};

const ToolButton: React.FC<propTypes> = (props) => {
  const { onClick, children } = props;
  return (
    <div onClick={onClick} className={styles.shortcutLetter}>
      {children}
    </div>
  );
};

const Separator: React.FC = () => <div className={styles.separator}></div>;

const MainPage: React.FC<propTypes> = (props) => {
  const { dealCards } = props;
  const [gameVisible, setGameVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.mainPage}>
        <TopBar />
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
