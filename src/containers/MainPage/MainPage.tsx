import React, { useState } from "react";
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
};

const Deal: React.FC<propTypes> = (props) => {
  const { onClick } = props;
  return <div onClick={onClick}>Deal</div>;
};

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
                <Deal
                  onClick={() => {
                    dealCards();
                    setGameVisible((gameVisible) => !gameVisible);
                    setHelpVisible(false);
                  }}
                />
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
              <ToolDropdown visible={helpVisible} />
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
