import React from "react";
import { connect } from "react-redux";
import { GameState, Points } from "../../../store/reducers";
import { countScore, saveTime } from "../../../store/actions/";
import styles from "./Timer.module.scss";
import { useStartTimer, useSubstractPointsEveryTenSeconds } from "./TimerHooks";

type TimerPropTypes = {
  gameStarted: boolean;
  substractPoints: (poinst: number) => void;
  score: number;
  saveTime: (timeToSave: number) => void;
  intialTime: number;
};

const TimerInternal: React.FC<TimerPropTypes> = (props) => {
  const { gameStarted, substractPoints, score, saveTime, intialTime } = props;

  const time = useStartTimer(gameStarted, intialTime);
  useSubstractPointsEveryTenSeconds(score, time, substractPoints);

  const saveTimeCallback = () => saveTime(time);
  window.addEventListener("beforeunload", saveTimeCallback);

  return <div className={styles.timer}>Time: {time}</div>;
};

const mapStateToProps = (state: {
  gameState: GameState;
  countScore: Points;
  timeCounter: { time: number };
}) => {
  return {
    gameStarted: state.gameState.gameStarted,
    score: state.countScore.points,
    intialTime: state.timeCounter.time,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    substractPoints: (payload: number) => dispatch(countScore(payload)),
    saveTime: (timeToSave: number) => dispatch(saveTime(timeToSave)),
  };
};

export const Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInternal);
