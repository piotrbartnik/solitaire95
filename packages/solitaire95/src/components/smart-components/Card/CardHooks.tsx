import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const useSetCardPosition = (
  isTurnedBack: boolean
): readonly [boolean, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [cardPositionFront, changeCardPosition] = useState<boolean>(
    isTurnedBack
  );
  const [wasCardTurnedFront] = useState<boolean>(
    !cardPositionFront ? true : false
  );

  useEffect(() => {
    if (!wasCardTurnedFront) changeCardPosition(isTurnedBack);
  }, [isTurnedBack, wasCardTurnedFront]);

  return [cardPositionFront, wasCardTurnedFront, changeCardPosition] as const;
};
