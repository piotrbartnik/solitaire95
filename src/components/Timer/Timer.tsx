import React, { useState, useEffect } from "react";
import styles from "./Timer.module.scss";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(time + 1), 1000);
    return () => clearInterval(timeInterval);
  });

  return <div className={styles.timer}>Time: {time}</div>;
};

export default Timer;
