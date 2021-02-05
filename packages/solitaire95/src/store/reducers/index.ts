import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistributionReducer";
import { cardsOnFoundation } from "./foundationReducer";
import { toggleWindows } from "./windowsReducer";
import { countScore } from "./scoreReducer";
import { gameState } from "./gameReducer";

export const rootReducer = combineReducers({
  cardDistribution,
  cardsOnFoundation,
  toggleWindows,
  countScore,
  gameState,
});
