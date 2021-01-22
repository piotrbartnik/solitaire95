import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import * as actions from "../src/store/actions/cardActions";
import { reducers } from "./store/reducers";
import MainPage from "./containers/MainPage/MainPage";
import "./Solitaire95.scss";

// const persistedState = localStorage.getItem("solitaireState")
//   ? // @ts-ignore
//     JSON.parse(localStorage.getItem("solitaireState"))
//   : undefined;

const store = createStore(
  reducers,
  // persistedState,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("solitaireState", JSON.stringify(store.getState()));
});

// if (!persistedState) {
store.dispatch(actions.dealCards());
// }

const Solitaire95 = (): ReactElement => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export { Solitaire95 };
