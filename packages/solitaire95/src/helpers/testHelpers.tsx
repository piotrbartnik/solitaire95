import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../store/reducers";
import * as actions from "../store/actions/cardActions";

const store = createStore(rootReducer);

export const dndWrapper = (component: JSX.Element): JSX.Element => (
  <DndProvider backend={HTML5Backend}>{component}</DndProvider>
);

export const reduxWrapper = (component: JSX.Element): JSX.Element => {
  store.dispatch(actions.dealCards());
  return <Provider store={store}>{component}</Provider>;
};
