import { Dispatch } from "redux";
import {
  dealCards,
  stopGame,
  resetScore,
  resetTime,
  resetStockCounter,
  countVegasScore,
  resetVegasScore,
} from "../store/actions/";

export const dealCardsAllSteps = (
  dispatch: Dispatch,
  isVegas?: boolean,
  keepVegasScore?: boolean
): void => {
  dispatch(resetTime());
  dispatch(resetScore());
  dispatch(stopGame());
  dispatch(dealCards());
  dispatch(resetStockCounter());

  console.log(isVegas, keepVegasScore);

  if (isVegas) {
    if (!keepVegasScore) {
      dispatch(resetVegasScore());
    } else {
      dispatch(countVegasScore(-52));
    }
  }
};
