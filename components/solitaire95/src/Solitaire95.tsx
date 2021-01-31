import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as cardActions from "../src/store/actions/cardActions";
import * as scoreActions from "../src/store/actions/scoreActions";
import { reducers } from "./store/reducers";
import MainPage from "./containers/MainPage/MainPage";
import "./Solitaire95.scss";

const persistedState = localStorage.getItem("solitaireState")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("solitaireState"))
  : undefined;

delete persistedState?.toggleWindows;

const store = createStore(
  reducers,
  persistedState,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("solitaireState", JSON.stringify(store.getState()));
});

if (!persistedState) {
  store.dispatch(cardActions.dealCards());
  store.dispatch(scoreActions.resetScore());
}

type propTypes = {
  playSounds?: boolean;
};

const Solitaire95: React.FC<propTypes> = (props) => {
  const { playSounds } = props;
  return (
    <Provider store={store}>
      <MainPage playSounds={playSounds} />
    </Provider>
  );
};

export { Solitaire95 };
