import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistribution";
import { cardsOnFoundation } from "./cardsOnFoundation";
import { toggleWindows } from "./windows";

const reducers: any = combineReducers({
  cardDistribution,
  cardsOnFoundation,
  toggleWindows,
});

export { reducers };
