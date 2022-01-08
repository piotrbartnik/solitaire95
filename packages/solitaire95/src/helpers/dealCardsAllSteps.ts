import { Dispatch } from "redux";
import {
  dealCards,
  stopGame,
  resetScore,
  resetTime,
  resetStockCounter,
  countVegasScore,
  resetVegasScore,
  setUndoAction,
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
  dispatch(setUndoAction([]));

  if (isVegas) {
    if (!keepVegasScore) {
      dispatch(resetVegasScore());
    } else {
      dispatch(countVegasScore(-52));
    }
  }
};
