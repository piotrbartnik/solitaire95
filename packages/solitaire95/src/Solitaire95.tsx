import React from "react";
import { Provider } from "react-redux";
import { createStore, Middleware, applyMiddleware, compose } from "redux";
import { dealCards, setUndoAction } from "../src/store/actions/";
import { cardConfigType } from "./configs/cardTypes";
import { rootReducer } from "./store/reducers";
import { MainPage } from "./components/game-containers/MainPage/MainPage";
import "./Solitaire95.scss";

const persistedState = localStorage.getItem("solitaireState")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("solitaireState"))
  : undefined;

delete persistedState?.toggleWindows;

const logger: Middleware = (store) => (next) => (action) => {
  const previousState = store.getState();
  let actionToUndo: [string, cardConfigType[], cardConfigType[]] | [] = [];
  if (action.type === "TAKE_ONE_FROM_STOCK") {
    actionToUndo = [
      "TAKE_ONE_FROM_STOCK",
      previousState.cardDistribution.cardsOnStock,
      previousState.cardDistribution.cardsFromStock,
    ];
    store.dispatch(setUndoAction(actionToUndo));
  }
  if (action.type === "REMOVE_CARD_FROM_FOUNDATION") {
    actionToUndo = [
      "REMOVE_CARD_FROM_FOUNDATION",
      previousState.cardsOnFoundation,
      [],
    ];
    store.dispatch(setUndoAction(actionToUndo));
  }
  if (action.type === "ADD_CARD_TO_PILE") {
    const undoState = store.getState().gameState.actionToUndo;
    if (undoState[0] === "REMOVE_CARD_FROM_FOUNDATION") {
      undoState[0] = "FROM_FOUNDATION_TO_STOCK";
      undoState[2] = previousState.cardDistribution.cardsOnPiles;
      store.dispatch(setUndoAction(undoState));
    } else {
      actionToUndo = [
        "ADD_CARD_TO_PILE",
        previousState.cardDistribution.cardsOnPiles,
        [],
      ];
      store.dispatch(setUndoAction(actionToUndo));
    }
  }
  if (action.type === "REMOVE_CARD_FROM_STOCK") {
    const undoState = store.getState().gameState.actionToUndo;
    if (undoState[0] === "ADD_CARD_TO_FOUNDATION") {
      undoState[0] = "FROM_STOCK_TO_FOUNDATION";
    }
    if (undoState[0] === "ADD_CARD_TO_PILE") {
      undoState[0] = "FROM_STOCK_TO_PILE";
    }
    undoState[2] = previousState.cardDistribution.cardsFromStock;
    store.dispatch(setUndoAction(undoState));
  }
  if (action.type === "REMOVE_CARD_FROM_PILE") {
    const undoState = store.getState().gameState.actionToUndo;
    if (undoState[0] === "ADD_CARD_TO_FOUNDATION") {
      undoState[0] = "FROM_PILE_TO_FOUNDATION";
    }
    undoState[2] = previousState.cardDistribution.cardsOnPiles;
    store.dispatch(setUndoAction(undoState));
  }
  if (action.type.match(/ADD_CARD_TO_[A-Z]+_FOUNDATION/)) {
    actionToUndo = [
      "ADD_CARD_TO_FOUNDATION",
      previousState.cardsOnFoundation,
      [],
    ];
    store.dispatch(setUndoAction(actionToUndo));
  }

  return next(action);
};

const middlewareEnhancer = applyMiddleware(logger);

const store = createStore(
  rootReducer,
  persistedState,
  // {},
  compose(
    middlewareEnhancer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  localStorage.setItem("solitaireState", JSON.stringify(store.getState()));
});

if (!persistedState) {
  store.dispatch(dealCards());
}

type PropTypes = {
  playSounds?: boolean;
  aboutChildren?: JSX.Element;
};

const Solitaire95: React.FC<PropTypes> = (props) => {
  const { playSounds, aboutChildren } = props;
  return (
    <Provider store={store}>
      <MainPage playSounds={playSounds} aboutChildren={aboutChildren} />
    </Provider>
  );
};

export { Solitaire95 };
