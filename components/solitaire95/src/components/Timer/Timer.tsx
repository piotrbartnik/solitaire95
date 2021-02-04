import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as scoreActions from "../../store/actions/scoreActions";
import styles from "./Timer.module.scss";

type timerPropTypes = {
  gameStarted: boolean;
  substractPoints: (poinst: number) => void;
};

const Timer: React.FC<timerPropTypes> = (props) => {
  const { gameStarted, substractPoints } = props;

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const timeInterval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timeInterval);
    }
    setTime(0);
    return;
  });

  useEffect(() => {
    if (time && time % 10 === 0) {
      substractPoints(-2);
    }
  });

  return <div className={styles.timer}>Time: {time}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    gameStarted: state.gameState.gameStarted,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    substractPoints: (payload: number) =>
      dispatch(scoreActions.countScore(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
