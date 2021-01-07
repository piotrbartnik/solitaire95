import { useState, useEffect } from "react";

export const useSetCardPosition = (isTurnedBack: boolean) => {
  const [cardPositionFront, changeCardPosition] = useState<boolean>(
    isTurnedBack
  );
  const [wasCardTurnedFront] = useState(!cardPositionFront ? true : false);

  useEffect(() => {
    if (!wasCardTurnedFront) changeCardPosition(isTurnedBack);
  }, [isTurnedBack, wasCardTurnedFront]);

  return [cardPositionFront, wasCardTurnedFront, changeCardPosition] as const;
};
