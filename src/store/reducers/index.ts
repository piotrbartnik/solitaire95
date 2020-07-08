import { combineReducers } from "redux";
import { cardDistribution } from "./cardsDistribution";
import { cardsOnFirstDestinationField } from "./cardsOnDestinationPile";

const reducers = combineReducers({
  cardDistribution,
  cardsOnFirstDestinationField,
});

export { reducers };
