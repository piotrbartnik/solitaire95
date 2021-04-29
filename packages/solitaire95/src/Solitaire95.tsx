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
  if (action.type === "ADD_CARD_TO_PILE") {
    actionToUndo = [
      "ADD_CARD_TO_PILE",
      previousState.cardDistribution.cardsOnPiles,
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
  compose(
    middlewareEnhancer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.subscribe(() => {
//   localStorage.setItem("solitaireState", JSON.stringify(store.getState()));
// });

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
