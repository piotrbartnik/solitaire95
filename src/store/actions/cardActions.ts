import * as actionTypes from "./actionTypes";
import {
  ADD_CARD_TO_FIRST_FOUNDATION,
  ADD_CARD_TO_SECOND_FOUNDATION,
  ADD_CARD_TO_THIRD_FOUNDATION,
  ADD_CARD_TO_FOURTH_FOUNDATION,
} from "./actionTypes";

export const takeOneFromStock = (payload: string) => {
  return {
    type: actionTypes.TAKE_ONE_FROM_STOCK,
    card: payload,
  };
};

export const reverseStock = (payload: string[]) => {
  return {
    type: actionTypes.REVERSE_STOCK,
    reverseStock: payload,
  };
};

export const addCardToFoundation = (
  card: string,
  foundationNumber: string,
  foundationColor?: string
) => {
  const castFoundationNumber: { [char: string]: string } = {
    cardsOnFirstFoundation: ADD_CARD_TO_FIRST_FOUNDATION,
    cardsOnSecondFoundation: ADD_CARD_TO_SECOND_FOUNDATION,
    cardsOnThirdFoundation: ADD_CARD_TO_THIRD_FOUNDATION,
    cardsOnFourthFoundation: ADD_CARD_TO_FOURTH_FOUNDATION,
  };
  return {
    type: castFoundationNumber[foundationNumber],
    addFoundationColor: foundationColor,
    addCardToFoundation: card,
  };
};

export const removeCardMovedToFoundation = (payload: string[]) => {
  return {
    type: actionTypes.REMOVE_CARD_MOVED_TO_FOUNDATION,
    removeCardMovedToFoundation: payload,
  };
};
