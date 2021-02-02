import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Timer.module.scss";

type timerPropTypes = {
  gameStarted: boolean;
};

const Timer: React.FC<timerPropTypes> = (props) => {
  const { gameStarted } = props;

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const timeInterval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timeInterval);
    }
    setTime(0);
    return;
  });

  return <div className={styles.timer}>Time: {time}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    gameStarted: state.gameState.gameStarted,
  };
};

export default connect(mapStateToProps)(Timer);
