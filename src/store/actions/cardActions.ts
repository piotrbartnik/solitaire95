import * as actionTypes from "./actionTypes";

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
  foundationSuite?: string
) => {
  const castFoundationNumber: { [char: string]: string } = {
    cardsOnFirstFoundation: actionTypes.ADD_CARD_TO_FIRST_FOUNDATION,
    cardsOnSecondFoundation: actionTypes.ADD_CARD_TO_SECOND_FOUNDATION,
    cardsOnThirdFoundation: actionTypes.ADD_CARD_TO_THIRD_FOUNDATION,
    cardsOnFourthFoundation: actionTypes.ADD_CARD_TO_FOURTH_FOUNDATION,
  };
  return {
    type: castFoundationNumber[foundationNumber],
    addFoundationColor: foundationSuite,
    addCardToFoundation: card,
  };
};

export const removeCardMovedToFoundation = (payload: string[]) => {
  return {
    type: actionTypes.REMOVE_CARD_MOVED_TO_FOUNDATION,
    removeCardMovedToFoundation: payload,
  };
};

export const removeCardFromPile = (pileNumber: string) => {
  return {
    type: actionTypes.REMOVE_CARD_FROM_PILE,
    removeCardFromPile: pileNumber,
  };
};

export const addCardToPile = (
  pileNumber: string,
  card: string,
  isTurnedBack?: boolean
) => {
  return {
    type: actionTypes.ADD_CARD_TO_PILE,
    addCardToPile: pileNumber,
    cardToAdd: card,
    isTurnedBack,
  };
};
