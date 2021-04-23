import { useState, useEffect } from "react";

export const useStartTimer = (
  gameStarted: boolean,
  gameFinished: boolean,
  intitialTime: number,
  saveScoreTimeCallback: (time: number) => void
): number => {
  const [time, setTime] = useState(intitialTime);

  useEffect(() => {
    if (gameStarted) {
      const timeInterval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timeInterval);
    }
    if (gameFinished) {
      setTime(time);
      saveScoreTimeCallback(time);
    }
    if (!gameFinished && !gameStarted) {
      setTime(0);
    }
    return;
  }, [gameStarted, time, gameFinished, saveScoreTimeCallback]);

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
