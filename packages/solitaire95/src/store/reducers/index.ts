import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistributionReducer";
import { cardsOnFoundation } from "./foundationReducer";
import { toggleWindows } from "./windowsReducer";
import { countScore } from "./scoreReducer";
import { gameState } from "./gameReducer";
import { stockCounter } from "./stockCounterReducer";
import { timeCounter } from "./timeReducer";

export { FoundationInitialState, FoundationState } from "./foundationReducer";
export { CardsDistributionInitialState } from "./cardsDistributionReducer";
export { WindowsState } from "./windowsReducer";
export { Points } from "./scoreReducer";
export { GameState } from "./gameReducer";
export { StockCount } from "./stockCounterReducer";

export const rootReducer = combineReducers({
  cardDistribution,
  cardsOnFoundation,
  toggleWindows,
  countScore,
  gameState,
  stockCounter,
  timeCounter,
});
