import { useEffect, useState } from "react";

export const useTimeSinceGameOpened = (): number => {
  const [
    timeInSecondsSinceGameOpened,
    setTimeInSecondsSinceGameOpened,
  ] = useState<number>(Math.floor(performance.now() / 1000));

  useEffect(() => {
    const timeInterval = setInterval(
      () => setTimeInSecondsSinceGameOpened(timeInSecondsSinceGameOpened + 1),
      1000
    );
    return () => clearInterval(timeInterval);
  }, [timeInSecondsSinceGameOpened]);

  return timeInSecondsSinceGameOpened;
};
