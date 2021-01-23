import React from "react";
import { connect } from "react-redux";
import * as cardActions from "../../store/actions/cardActions";
import * as windowActions from "../../store/actions/windowActions";
import { ToolBar, TopbarButton, ToolButton, Separator } from "../../UI";
import { ToolDropdown } from "../../components";
import styles from "./AppToolbar.module.scss";

type propTypes = {
  dealCards?: any;
  toggleCardBackWindow?: any;
  gameVisible: boolean;
  helpVisible: boolean;
  setGameVisible: (gameState: any) => void;
  setHelpVisible: (helpState: any) => void;
};

const AppToolbar: React.FC<propTypes> = (props) => {
  const {
    dealCards,
    toggleCardBackWindow,
    gameVisible,
    helpVisible,
    setGameVisible,
    setHelpVisible,
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
              <div className={styles.toolElement}>
                <ToolButton
                  onClick={() => {
                    dealCards();
                    setGameVisible((gameVisible: boolean) => !gameVisible);
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
              setHelpVisible((helpVisible: boolean) => !helpVisible);
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
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(cardActions.dealCards()),
    toggleCardBackWindow: (payload: boolean) =>
      dispatch(windowActions.toggleCardBackWindow(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(AppToolbar);
