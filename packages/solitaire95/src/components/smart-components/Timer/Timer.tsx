import React from "react";
import { connect } from "react-redux";
import { GameState, Points } from "../../../store/reducers";
import { countScore, saveTime } from "../../../store/actions/";
import styles from "./Timer.module.scss";
import { useStartTimer, useSubstractPointsEveryTenSeconds } from "./TimerHooks";

type TimerStatePropTypes = {
  gameStarted: boolean;
  score: number;
  intialTime: number;
  gameFinished: boolean;
};

type TimerDispatchPropTypes = {
  substractPoints: (poinst: number) => void;
  saveTime: (timeToSave: number) => void;
};

const TimerInternal: React.FC<TimerStatePropTypes & TimerDispatchPropTypes> = (
  props
) => {
  const {
    gameStarted,
    substractPoints,
    score,
    saveTime,
    intialTime,
    gameFinished,
  } = props;

  const saveTimeCallback = () => saveTime(time);

  const time = useStartTimer(gameStarted, gameFinished, intialTime, saveTime);
  useSubstractPointsEveryTenSeconds(score, time, substractPoints);

  window.addEventListener("beforeunload", saveTimeCallback);

  return <div className={styles.timer}>Time: {time}</div>;
};

const mapStateToProps = (state: {
  gameState: GameState;
  countScore: Points;
  timeCounter: { initialTime: number };
}) => {
  return {
    gameStarted: state.gameState.gameStarted,
    gameFinished: state.gameState.gameFinished,
    score: state.countScore.points,
    intialTime: state.timeCounter.initialTime,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    substractPoints: (payload: number) => dispatch(countScore(payload)),
    saveTime: (timeToSave: number) => dispatch(saveTime(timeToSave)),
  };
};

export const Timer = connect<TimerStatePropTypes, TimerDispatchPropTypes>(
  mapStateToProps,
  mapDispatchToProps
)(TimerInternal);
