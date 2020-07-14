import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistribution";
import { cardsOnFoundation } from "./cardsOnFoundation";

const reducers = combineReducers({
  cardDistribution,
  cardsOnFoundation,
});

export { reducers };
