import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistribution";
import { cardsOnFoundation } from "./cardsOnFoundation";
import { toggleWindows } from "./windows";
import { countScore } from "./points";

const reducers: any = combineReducers({
  cardDistribution,
  cardsOnFoundation,
  toggleWindows,
  countScore,
});

export { reducers };
