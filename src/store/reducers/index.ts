import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistribution";
import { cardsOnFirstFoundation } from "./cardsOnFoundation";

const reducers = combineReducers({
  cardDistribution,
  cardsOnFirstFoundation,
});

export { reducers };
