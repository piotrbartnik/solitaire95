import React from "react";
import { connect } from "react-redux";
import { GameState, Points } from "../../../store/reducers";
import { countScore, saveTime, saveScoreTime } from "../../../store/actions/";
import {
  CountScoreType,
  SaveTimeType,
  SaveScoreTimeType,
} from "../../../store/actions/actionTypes";
import styles from "./Timer.module.scss";
import { useStartTimer, useSubstractPointsEveryTenSeconds } from "./TimerHooks";

type TimerStatePropTypes = {
  gameStarted: boolean;
  score: number;
  intialTime: number;
  gameFinished: boolean;
};

type TimerDispatchPropTypes = {
  substractPoints: CountScoreType;
  saveTime: SaveTimeType;
  saveScoreTime: SaveScoreTimeType;
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
    saveScoreTime,
  } = props;

  const saveTimeCallback = () => saveTime(time);

  const time = useStartTimer(
    gameStarted,
    gameFinished,
    intialTime,
    saveScoreTime
  );
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

const mapDispatchToProps = {
  substractPoints: countScore,
  saveTime: saveTime,
  saveScoreTime: saveScoreTime,
};

export const Timer = connect<TimerStatePropTypes, TimerDispatchPropTypes>(
  mapStateToProps,
  mapDispatchToProps
)(TimerInternal);
