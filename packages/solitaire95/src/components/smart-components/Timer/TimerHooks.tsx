import { useState, useEffect } from "react";

export const useStartTimer = (
  gameStarted: boolean,
  intitialTime: number
): number => {
  const [time, setTime] = useState(intitialTime);

  useEffect(() => {
    if (gameStarted) {
      const timeInterval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timeInterval);
    }
    setTime(0);
    return;
  }, [gameStarted, time]);

  return time;
};

export const useSubstractPointsEveryTenSeconds = (
  score: number,
  time: number,
  substractFunction: (poinst: number) => void
): void => {
  useEffect(() => {
    if (time && time % 10 === 0) {
      substractFunction(-2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
};
