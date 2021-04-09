import * as actionTypes from "./actionTypes";
import { createCards, cardConfigType } from "../../configs/cardTypes";

export interface CardDealTypes {
  type: string;
  cardsForStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
}

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

export const dealCards = (): CardDealTypes => {
  const [cardsForStock, cardsForPiles] = mixCardsForGame(
    createCards as cardConfigType[]
  );
  return {
    type: actionTypes.DEAL_CARDS,
    cardsForStock: cardsForStock,
    cardsOnPiles: orderPiles(cardsForPiles as cardConfigType[]),
  };
};

export const takeOneFromStock = (
  payload: cardConfigType
): { type: string; card: cardConfigType } => {
  return {
    type: actionTypes.TAKE_ONE_FROM_STOCK,
    card: payload,
  };
};

export const reverseStock = (
  payload: cardConfigType[]
): {
  type: string;
  reverseStock: cardConfigType[];
} => {
  return {
    type: actionTypes.REVERSE_STOCK,
    reverseStock: payload,
  };
};

export const addCardToFoundation = (
  card: cardConfigType,
  foundationNumber: string,
  foundationSuite?: string
): {
  type: string;
  addFoundationColor: string | undefined;
  addCardToFoundation: cardConfigType;
} => {
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

export const removeCardFromStock = (
  payload: cardConfigType[]
): { type: string; removeCardFromStock: cardConfigType[] } => {
  return {
    type: actionTypes.REMOVE_CARD_FROM_STOCK,
    removeCardFromStock: payload,
  };
};

export const removeCardFromPile = (
  pileNumber: string
): { type: string; removeCardFromPile: string } => {
  return {
    type: actionTypes.REMOVE_CARD_FROM_PILE,
    removeCardFromPile: pileNumber,
  };
};

export const addCardToPile = (
  pileNumber: string,
  card: cardConfigType
): { type: string; addCardToPile: string; cardToPile: cardConfigType } => {
  return {
    type: actionTypes.ADD_CARD_TO_PILE,
    addCardToPile: pileNumber,
    cardToPile: card,
  };
};

export const removeCardFromFoundation = (
  foundationNumber: string
): { type: string; removeCardFromFoundation: string } => {
  return {
    type: actionTypes.REMOVE_CARD_FROM_FOUNDATION,
    removeCardFromFoundation: foundationNumber,
  };
};

export const turnCardOnPile = (
  cardToTurn: number
): { type: string; cardToTurn: number } => {
  return {
    type: actionTypes.TURN_CARD_ON_PILE,
    cardToTurn,
  };
};

export const stockTurnCounter = (): { type: string } => {
  return {
    type: actionTypes.STOCK_TURN_COUNTER,
  };
};
