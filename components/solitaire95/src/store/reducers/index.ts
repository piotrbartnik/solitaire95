import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistributionReducer";
import { cardsOnFoundation } from "./foundationReducer";
import { toggleWindows } from "./windowsReducer";
import { countScore } from "./scoreReducer";
import { gameState } from "./gameReducer";

const reducers: any = combineReducers({
  cardDistribution,
  cardsOnFoundation,
  toggleWindows,
  countScore,
  gameState,
});

export { reducers };
