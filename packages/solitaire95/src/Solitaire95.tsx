import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { dealCards } from "./store/actions/";
import { undoActions } from "./helpers/undo";
import { rootReducer } from "./store/reducers";
import { MainPage } from "./components/game-containers/MainPage/MainPage";
import "./Solitaire95.scss";

const persistedState = localStorage.getItem("solitaireState")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("solitaireState"))
  : undefined;

delete persistedState?.toggleWindows;

const middlewareEnhancer = applyMiddleware(undoActions);
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(middlewareEnhancer)
);

if (!persistedState) {
  store.dispatch(dealCards());
}

type PropTypes = {
  playSounds?: boolean;
  aboutChildren?: JSX.Element;
  preserveStateInLocalStorage?: boolean;
};

const Solitaire95: React.FC<PropTypes> = (props) => {
  const { playSounds, aboutChildren, preserveStateInLocalStorage } = props;

  if (preserveStateInLocalStorage) {
    if (persistedState?.gameState?.keepVegasScore === undefined) {
      store.dispatch(dealCards());
    }

    store.subscribe(() => {
      localStorage.setItem("solitaireState", JSON.stringify(store.getState()));
    });
  }

  return (
    <Provider store={store}>
      <MainPage playSounds={playSounds} aboutChildren={aboutChildren} />
    </Provider>
  );
};

export { Solitaire95 };
