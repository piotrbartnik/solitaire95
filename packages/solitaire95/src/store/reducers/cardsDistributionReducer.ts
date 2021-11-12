import { cardConfigType } from "../../configs/cardTypes";
import {
  ACTION_TYPES,
  CardDealTypeReducer,
  TakeOneFromStockTypeReducer,
  TakeThreeFromStockTypeReducer,
  ReverseStockTypeReducer,
  AddCardToFoundationTypeReducer,
  RemoveCardFromStockTypeReducer,
  RemoveCardFromPileTypeReducer,
  AddCardToPileTypeReducer,
  RemoveCardFromFoundationTypeReducer,
  TurnCardOnPileTypeReducer,
  StockTurnCounterTypeReducer,
  ResetStockCounterTypeReducer,
  UndoTakeOneFromStockTypeReducer,
  UndoThreeCardsFromStockTypeReducer,
  UndoRemoveCardFromPileTypeReducer,
  UndoMoveFromStockToPilesTypeReducer,
  UndoMoveFromStockToFoundationTypeReducer,
  UndoMoveFromPileToFoundationTypeReducer,
  UndoMoveFromFoundationToPilesTypeReducer,
} from "../actions/actionTypes";

export interface CardsDistributionInitialState {
  cardsOnStock: cardConfigType[];
  cardsFromStock: cardConfigType[];
  cardsOnPiles: { [key: string]: cardConfigType[] };
  threeCardsOnTable?: cardConfigType[];
}

export type CardDistributionActionTypes =
  | CardDealTypeReducer
  | TakeOneFromStockTypeReducer
  | TakeThreeFromStockTypeReducer
  | ReverseStockTypeReducer
  | AddCardToFoundationTypeReducer
  | RemoveCardFromStockTypeReducer
  | RemoveCardFromPileTypeReducer
  | AddCardToPileTypeReducer
  | RemoveCardFromFoundationTypeReducer
  | TurnCardOnPileTypeReducer
  | StockTurnCounterTypeReducer
  | ResetStockCounterTypeReducer
  | UndoTakeOneFromStockTypeReducer
  | UndoThreeCardsFromStockTypeReducer
  | UndoRemoveCardFromPileTypeReducer
  | UndoMoveFromStockToPilesTypeReducer
  | UndoMoveFromStockToFoundationTypeReducer
  | UndoMoveFromPileToFoundationTypeReducer
  | UndoMoveFromFoundationToPilesTypeReducer;

const initialState: CardsDistributionInitialState = {
  cardsOnStock: [],
  cardsFromStock: [],
  threeCardsOnTable: [],
  cardsOnPiles: {},
};

export const cardDistribution = (
  state = initialState,
  action: CardDistributionActionTypes
): CardsDistributionInitialState => {
  switch (action.type) {
    case ACTION_TYPES.DEAL_CARDS:
      return {
        cardsOnStock: action.cardsForStock,
        cardsFromStock: [],
        threeCardsOnTable: [],
        cardsOnPiles: action.cardsOnPiles,
      };
    case ACTION_TYPES.TAKE_ONE_FROM_STOCK:
      return {
        ...state,
        cardsFromStock: [
          ...state.cardsFromStock,
          action.cardToAddToTable as cardConfigType,
        ],
        cardsOnStock: action.cardsOnStock,
      };
    case ACTION_TYPES.TAKE_THREE_FROM_STOCK:
      return {
        ...state,
        cardsFromStock: [
          ...state.cardsFromStock,
          ...(action.cardToAddToTable as cardConfigType[]),
        ],
        threeCardsOnTable: [...(action.threeCardsOnTable as cardConfigType[])],
        cardsOnStock: action.cardsOnStock,
      };
    case ACTION_TYPES.REVERSE_STOCK:
      return {
        ...state,
        cardsOnStock: action.reverseStock,
        cardsFromStock: [],
        threeCardsOnTable: [],
      };
    case ACTION_TYPES.REMOVE_CARD_FROM_STOCK:
      return {
        ...state,
        cardsFromStock: action.filteredCardsOnStock,
        threeCardsOnTable: action.threeCardsOnStockFiltered,
      };
    case ACTION_TYPES.REMOVE_CARD_FROM_PILE:
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.removeCardFromPile]: state.cardsOnPiles[
            action.removeCardFromPile
          ].slice(0, -1),
        },
      };
    case ACTION_TYPES.ADD_CARD_TO_PILE:
      // eslint-disable-next-line no-case-declarations
      const cardAdded: cardConfigType[] = [action.cardToPile];
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.addCardToPile]:
            state.cardsOnPiles[action.addCardToPile].concat(cardAdded),
        },
      };
    case ACTION_TYPES.TURN_CARD_ON_PILE:
      // eslint-disable-next-line no-case-declarations
      const newStateForPile = state.cardsOnPiles[action.cardToTurn];
      // eslint-disable-next-line no-case-declarations
      const mapState = newStateForPile.map((card, index) => {
        return index === newStateForPile.length - 1
          ? card.map((attribute) => {
              if (!attribute) {
                return true;
              }
              return attribute;
            })
          : card;
      });
      return {
        ...state,
        cardsOnPiles: {
          ...state.cardsOnPiles,
          [action.cardToTurn[0]]: mapState,
        },
      };
    case ACTION_TYPES.UNDO_TAKE_ONE_FROM_STOCK:
      return {
        ...state,
        cardsOnStock: action.cardsOnStockUndo,
        cardsFromStock: action.cardsFromStockUndo,
      };
    case ACTION_TYPES.UNDO_TAKE_THREE_FROM_STOCK:
      return {
        ...state,
        cardsOnStock: action.cardsOnStockUndo,
        threeCardsOnTable: action.threeCardsFromStockUndo,
        cardsFromStock: action.cardsFromStockUndo,
      };
    case ACTION_TYPES.UNDO_REMOVE_FROM_PILE:
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_PILE:
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
        cardsFromStock: action.cardsFromStockState,
        threeCardsOnTable: action.threeCardsFromStockUndo,
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_STOCK_TO_FOUNDATION:
      return {
        ...state,
        cardsFromStock: action.cardsFromStockState,
        threeCardsOnTable: action.threeCardsFromStockUndo,
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_PILE_TO_FOUNDATION:
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    case ACTION_TYPES.UNDO_MOVE_FROM_FOUNDATION_TO_PILE:
      return {
        ...state,
        cardsOnPiles: { ...action.pilesState },
      };
    default:
      return state;
  }
};
