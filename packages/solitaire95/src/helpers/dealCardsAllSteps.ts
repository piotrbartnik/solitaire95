import { Dispatch } from "redux";
import {
  dealCards,
  stopGame,
  resetScore,
  resetTime,
  resetStockCounter,
} from "../store/actions/";

export const dealCardsAllSteps = (dispatch: Dispatch): void => {
  dispatch(resetTime());
  dispatch(resetScore());
  dispatch(stopGame());
  dispatch(dealCards());
  dispatch(resetStockCounter());
};
