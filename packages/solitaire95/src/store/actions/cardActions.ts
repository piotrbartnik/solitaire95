import * as actionTypes from "./actionTypes";
import { createCards, cardConfigType } from "../../configs/cardTypes";

const mixCardsForGame = (cards: cardConfigType[]): cardConfigType[][] => {
  const randomizeCardInput = cards.sort(() => Math.random() - 0.5);
  const cardsForStock = randomizeCardInput.slice(0, 24);
  const cardsForPiles = randomizeCardInput.slice(24);
  return [cardsForStock, cardsForPiles];
};

const orderPiles = (
  cardsForPiles: cardConfigType[]
): { [key: string]: cardConfigType[] } => {
  const cardsOnPiles = {};
  cardsForPiles.forEach((el, index) => {
    if (index < 7) {
      const triangularSequenceDividend = index * (index + 1);
      Object.assign(cardsOnPiles, {
        [index]: cardsForPiles.slice(
          triangularSequenceDividend / 2,
          triangularSequenceDividend / 2 + index + 1
        ),
      });
    }
  });
  return cardsOnPiles;
};

export const dealCards = () => {
  const [cardsForStock, cardsForPiles] = mixCardsForGame(
    createCards as cardConfigType[]
  );
  return {
    type: actionTypes.DEAL_CARDS,
    cardsForStock: cardsForStock as cardConfigType[],
    cardsOnPiles: orderPiles(cardsForPiles as cardConfigType[]),
  };
};

export const takeOneFromStock = (payload: cardConfigType) => {
  return {
    type: actionTypes.TAKE_ONE_FROM_STOCK,
    card: payload,
  };
};

export const reverseStock = (payload: cardConfigType[]) => {
  return {
    type: actionTypes.REVERSE_STOCK,
    reverseStock: payload,
  };
};

export const addCardToFoundation = (
  card: cardConfigType,
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

export const removeCardMovedToFoundation = (payload: cardConfigType) => {
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

export const addCardToPile = (pileNumber: string, card: cardConfigType) => {
  return {
    type: actionTypes.ADD_CARD_TO_PILE,
    addCardToPile: pileNumber,
    cardToPile: card,
  };
};

export const removeCardFromFoundation = (foundationNumber: string) => {
  return {
    type: actionTypes.REMOVE_CARD_FROM_FOUNDATION,
    removeCardFromFoundation: foundationNumber,
  };
};
