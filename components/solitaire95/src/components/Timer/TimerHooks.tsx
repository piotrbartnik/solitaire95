import { useState, useEffect } from "react";

export const useStartTimer = (gameStarted: boolean): number => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const timeInterval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timeInterval);
    }
    setTime(0);
    return;
  });

  return time;
};

export const useSubstractPointsEveryTenSeconds = (
  score: number,
  time: number,
  substractFunction: (poinst: number) => void
): void => {
  useEffect(() => {
    if (score && time && time % 10 === 0) {
      substractFunction(-2);
    }
  });
};