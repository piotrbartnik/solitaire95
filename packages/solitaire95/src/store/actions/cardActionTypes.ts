import { ACTION_TYPES } from "./actionTypes";
import { cardConfigType } from "../../configs/cardTypes";
import { FoundationState } from "../reducers/foundationReducer";

export type CardDealTypeReducer = {
  type: ACTION_TYPES.DEAL_CARDS;
  cardsForStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
};

export type TakeOneFromStockTypeReducer = {
  type: ACTION_TYPES.TAKE_ONE_FROM_STOCK;
  cardsOnStock: cardConfigType[];
  cardToAddToTable: cardConfigType;
};
export type TakeOneFromStockType = (
  cardsOnStock: cardConfigType[],
  cardToAddToTable: cardConfigType
) => TakeOneFromStockTypeReducer;

export type TakeThreeFromStockTypeReducer = {
  type: ACTION_TYPES.TAKE_THREE_FROM_STOCK;
  cardsOnStock: cardConfigType[];
  cardToAddToTable: cardConfigType[];
  threeCardsOnTable: cardConfigType[];
};
export type TakeThreeFromStockType = (
  cardsOnStock: cardConfigType[],
  cardToAddToTable: cardConfigType[],
  threeCardsOnTable: cardConfigType[]
) => TakeThreeFromStockTypeReducer;

export type ReverseStockTypeReducer = {
  type: ACTION_TYPES.REVERSE_STOCK;
  reverseStock: cardConfigType[];
};
export type ReverseStockType = (
  reversedCardsForStock: cardConfigType[]
) => ReverseStockTypeReducer;

export type AddCardToFoundationTypeReducer = {
  type:
    | ACTION_TYPES.ADD_CARD_TO_FIRST_FOUNDATION
    | ACTION_TYPES.ADD_CARD_TO_SECOND_FOUNDATION
    | ACTION_TYPES.ADD_CARD_TO_THIRD_FOUNDATION
    | ACTION_TYPES.ADD_CARD_TO_FOURTH_FOUNDATION;
  addFoundationColor: string | undefined;
  addCardToFoundation: cardConfigType;
};
export type AddCardToFoundationType = (
  card: cardConfigType,
  foundationNumber: string,
  foundationSuite?: string
) => AddCardToFoundationTypeReducer;

export type RemoveCardFromStockTypeReducer = {
  type: ACTION_TYPES.REMOVE_CARD_FROM_STOCK;
  filteredCardsOnStock: cardConfigType[];
  threeCardsOnStockFiltered: cardConfigType[];
};
export type RemoveCardFromStockType = (
  filteredCardsOnStock: cardConfigType[],
  threeCardsOnStockFiltered: cardConfigType[]
) => RemoveCardFromStockTypeReducer;

export type RemoveCardFromPileTypeReducer = {
  type: ACTION_TYPES.REMOVE_CARD_FROM_PILE;
  removeCardFromPile: string;
};
export type RemoveCardFromPileType = (
  pileNumber: string
) => RemoveCardFromPileTypeReducer;

export type AddCardToPileTypeReducer = {
  type: ACTION_TYPES.ADD_CARD_TO_PILE;
  addCardToPile: string;
  cardToPile: cardConfigType;
};
export type AddCardToPileType = (
  pileNumber: string,
  card: cardConfigType
) => AddCardToPileTypeReducer;

export type RemoveCardFromFoundationTypeReducer = {
  type: ACTION_TYPES.REMOVE_CARD_FROM_FOUNDATION;
  removeCardFromFoundation: string;
};
export type RemoveCardFromFoundationType = (
  foundationNumber: string
) => RemoveCardFromFoundationTypeReducer;

export type TurnCardOnPileTypeReducer = {
  type: ACTION_TYPES.TURN_CARD_ON_PILE;
  cardToTurn: number;
};
export type TurnCardOnPileType = (
  cardToTurn: number
) => TurnCardOnPileTypeReducer;

export type StockTurnCounterTypeReducer = {
  type: ACTION_TYPES.STOCK_TURN_COUNTER;
};

export type StockTurnCounterType = () => StockTurnCounterTypeReducer;

export type ResetStockCounterTypeReducer = {
  type: ACTION_TYPES.RESET_STOCK_COUNTER;
};

export type UndoTakeOneFromStockTypeReducer = {
  type: ACTION_TYPES.UNDO_TAKE_ONE_FROM_STOCK;
  cardsOnStockUndo: cardConfigType[];
  cardsFromStockUndo: cardConfigType[];
};
export type UndoTakeOneFromStockType = (
  cardsOnStockUndo: cardConfigType[],
  cardsFromStockUndo: cardConfigType[]
) => UndoTakeOneFromStockTypeReducer;

export type UndoThreeCardsFromStockTypeReducer = {
  type: ACTION_TYPES.UNDO_TAKE_THREE_FROM_STOCK;
  cardsOnStockUndo: cardConfigType[];
  threeCardsFromStockUndo: cardConfigType[];
  cardsFromStockUndo: cardConfigType[];
};
export type UndoThreeCardsFromStockType = (
  cardsOnStockUndo: cardConfigType[],
  threeCardsFromStockUndo: cardConfigType[],
  cardsFromStockUndo: cardConfigType[]
) => UndoThreeCardsFromStockTypeReducer;

export type UndoRemoveCardFromPileTypeReducer = {
  type: ACTION_TYPES.UNDO_REMOVE_FROM_PILE;
  pilesState: { [key: string]: cardConfigType[] };
};
export type UndoRemoveCardFromPileType = (pilesState: {
  [key: string]: cardConfigType[];
}) => UndoRemoveCardFromPileTypeReducer;

export type UndoMoveFromStockToPilesTypeReducer = {
  type: ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_PILE;
  pilesState: { [key: string]: cardConfigType[] };
  cardsFromStockState: cardConfigType[];
  threeCardsFromStockUndo: cardConfigType[];
};
export type UndoMoveFromStockToPilesType = (
  pilesState: {
    [key: string]: cardConfigType[];
  },
  cardsFromStockState: cardConfigType[],
  threeCardsFromStockUndo: cardConfigType[]
) => UndoMoveFromStockToPilesTypeReducer;

export type UndoMoveFromStockToFoundationTypeReducer = {
  type: ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_FOUNDATION;
  foundationState: { [key: string]: FoundationState };
  cardsFromStockState: cardConfigType[];
  threeCardsFromStockUndo: cardConfigType[];
};
export type UndoMoveFromStockToFoundationType = (
  foundationState: { [key: string]: FoundationState },
  cardsFromStockState: cardConfigType[],
  threeCardsFromStockUndo: cardConfigType[]
) => UndoMoveFromStockToFoundationTypeReducer;

export type UndoMoveFromPileToFoundationTypeReducer = {
  type: ACTION_TYPES.UNDO_MOVE_FROM_PILE_TO_FOUNDATION;
  foundationState: { [key: string]: FoundationState };
  pilesState: { [key: string]: cardConfigType[] };
};
export type UndoMoveFromPileToFoundationType = (
  foundationState: { [key: string]: FoundationState },
  pilesState: { [key: string]: cardConfigType[] }
) => UndoMoveFromPileToFoundationTypeReducer;

export type UndoMoveFromFoundationToPilesTypeReducer = {
  type: ACTION_TYPES.UNDO_MOVE_FROM_FOUNDATION_TO_PILE;
  foundationState: { [key: string]: FoundationState };
  pilesState: { [key: string]: cardConfigType[] };
};
export type UndoMoveFromFoundationToPilesType = (
  foundationState: { [key: string]: FoundationState },
  pilesState: { [key: string]: cardConfigType[] }
) => UndoMoveFromFoundationToPilesTypeReducer;
