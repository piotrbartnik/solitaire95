import { createCards, cardConfigType } from "../../configs/cardTypes";
import {
  ACTION_TYPES,
  CardDealTypeReducer,
  TakeOneFromStockType,
  TakeThreeFromStockType,
  ReverseStockType,
  AddCardToFoundationType,
  RemoveCardFromStockType,
  RemoveCardFromPileType,
  AddCardToPileType,
  RemoveCardFromFoundationType,
  TurnCardOnPileType,
  StockTurnCounterTypeReducer,
  ResetStockCounterTypeReducer,
  UndoTakeOneFromStockType,
  UndoThreeCardsFromStockType,
  UndoRemoveCardFromPileType,
  UndoMoveFromStockToPilesType,
  UndoMoveFromStockToFoundationType,
  UndoMoveFromPileToFoundationType,
  UndoMoveFromFoundationToPilesType,
} from "./actionTypes";

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

export const dealCards = (): CardDealTypeReducer => {
  const [cardsForStock, cardsForPiles] = mixCardsForGame(
    createCards as cardConfigType[]
  );
  return {
    type: ACTION_TYPES.DEAL_CARDS,
    cardsForStock: cardsForStock,
    cardsOnPiles: orderPiles(cardsForPiles as cardConfigType[]),
  };
};

export const takeOneFromStock: TakeOneFromStockType = (
  cardsOnStock,
  cardToAddToTable
) => {
  return {
    type: ACTION_TYPES.TAKE_ONE_FROM_STOCK,
    cardsOnStock,
    cardToAddToTable,
  };
};

export const takeThreeFromStock: TakeThreeFromStockType = (
  cardsOnStock,
  cardToAddToTable,
  threeCardsOnTable
) => {
  return {
    type: ACTION_TYPES.TAKE_THREE_FROM_STOCK,
    cardsOnStock,
    cardToAddToTable,
    threeCardsOnTable,
  };
};

export const reverseStock: ReverseStockType = (reversedCardsForStock) => {
  return {
    type: ACTION_TYPES.REVERSE_STOCK,
    reverseStock: reversedCardsForStock,
  };
};

export const addCardToFoundation: AddCardToFoundationType = (
  card,
  foundationNumber,
  foundationSuite?
) => {
  const castFoundationNumber = {
    cardsOnFirstFoundation: ACTION_TYPES.ADD_CARD_TO_FIRST_FOUNDATION,
    cardsOnSecondFoundation: ACTION_TYPES.ADD_CARD_TO_SECOND_FOUNDATION,
    cardsOnThirdFoundation: ACTION_TYPES.ADD_CARD_TO_THIRD_FOUNDATION,
    cardsOnFourthFoundation: ACTION_TYPES.ADD_CARD_TO_FOURTH_FOUNDATION,
  };
  return {
    type: castFoundationNumber[foundationNumber],
    addFoundationColor: foundationSuite,
    addCardToFoundation: card,
  };
};

export const removeCardFromStock: RemoveCardFromStockType = (
  filteredCardsOnStock,
  threeCardsOnStockFiltered?
) => {
  return {
    type: ACTION_TYPES.REMOVE_CARD_FROM_STOCK,
    filteredCardsOnStock: filteredCardsOnStock,
    threeCardsOnStockFiltered: threeCardsOnStockFiltered,
  };
};

export const removeCardFromPile: RemoveCardFromPileType = (pileNumber) => {
  return {
    type: ACTION_TYPES.REMOVE_CARD_FROM_PILE,
    removeCardFromPile: pileNumber,
  };
};

export const addCardToPile: AddCardToPileType = (pileNumber, card) => {
  return {
    type: ACTION_TYPES.ADD_CARD_TO_PILE,
    addCardToPile: pileNumber,
    cardToPile: card,
  };
};

export const removeCardFromFoundation: RemoveCardFromFoundationType = (
  foundationNumber
) => {
  return {
    type: ACTION_TYPES.REMOVE_CARD_FROM_FOUNDATION,
    removeCardFromFoundation: foundationNumber,
  };
};

export const turnCardOnPile: TurnCardOnPileType = (cardToTurn) => {
  return {
    type: ACTION_TYPES.TURN_CARD_ON_PILE,
    cardToTurn,
  };
};

export const stockTurnCounter = (): StockTurnCounterTypeReducer => {
  return {
    type: ACTION_TYPES.STOCK_TURN_COUNTER,
  };
};

export const resetStockCounter = (): ResetStockCounterTypeReducer => {
  return {
    type: ACTION_TYPES.RESET_STOCK_COUNTER,
  };
};

export const undoTakeOneFromStock: UndoTakeOneFromStockType = (
  cardsOnStockUndo,
  cardsFromStockUndo
) => {
  return {
    type: ACTION_TYPES.UNDO_TAKE_ONE_FROM_STOCK,
    cardsOnStockUndo,
    cardsFromStockUndo,
  };
};

export const undoThreeCardsFromStock: UndoThreeCardsFromStockType = (
  cardsOnStockUndo,
  threeCardsFromStockUndo,
  cardsFromStockUndo
) => {
  return {
    type: ACTION_TYPES.UNDO_TAKE_THREE_FROM_STOCK,
    cardsOnStockUndo,
    threeCardsFromStockUndo,
    cardsFromStockUndo,
  };
};

export const undoRemoveCardFromPile: UndoRemoveCardFromPileType = (
  pilesState
) => {
  return {
    type: ACTION_TYPES.UNDO_REMOVE_FROM_PILE,
    pilesState,
  };
};

export const undoMoveFromStockToPiles: UndoMoveFromStockToPilesType = (
  pilesState,
  cardsFromStockState,
  threeCardsFromStockUndo?
) => {
  return {
    type: ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_PILE,
    pilesState,
    cardsFromStockState,
    threeCardsFromStockUndo,
  };
};
export const undoMoveFromStockToFoundation: UndoMoveFromStockToFoundationType =
  (foundationState, cardsFromStockState, threeCardsFromStockUndo) => {
    return {
      type: ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_FOUNDATION,
      foundationState,
      cardsFromStockState,
      threeCardsFromStockUndo,
    };
  };
export const undoMoveFromPileToFoundation: UndoMoveFromPileToFoundationType = (
  foundationState,
  pilesState
) => {
  return {
    type: ACTION_TYPES.UNDO_MOVE_FROM_PILE_TO_FOUNDATION,
    foundationState,
    pilesState,
  };
};
export const undoMoveFromFoundationToPiles: UndoMoveFromFoundationToPilesType =
  (foundationState, pilesState) => {
    return {
      type: ACTION_TYPES.UNDO_MOVE_FROM_FOUNDATION_TO_PILE,
      foundationState,
      pilesState,
    };
  };
