import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as scoreActions from "../../store/actions/scoreActions";
import styles from "./Timer.module.scss";
import { useStartTimer, useSubstractPointsEveryTenSeconds } from "./TimerHooks";

type timerPropTypes = {
  gameStarted: boolean;
  substractPoints: (poinst: number) => void;
  score: number;
};

const Timer: React.FC<timerPropTypes> = (props) => {
  const { gameStarted, substractPoints, score } = props;

  const time = useStartTimer(gameStarted);
  useSubstractPointsEveryTenSeconds(score, time, substractPoints);

  return <div className={styles.timer}>Time: {time}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    gameStarted: state.gameState.gameStarted,
    score: state.countScore.points,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    substractPoints: (payload: number) =>
      dispatch(scoreActions.countScore(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
