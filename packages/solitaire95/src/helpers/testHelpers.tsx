/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../store/reducers";

export const dndWrapper = (component: JSX.Element): JSX.Element => (
  <DndProvider backend={HTML5Backend}>{component}</DndProvider>
);

export const reduxRtlWrapper = (
  component: JSX.Element,
  {
    initialState,
    store = createStore(rootReducer, initialState),
  }: { initialState?: any; store?: any }
): any => {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(component, { wrapper: Wrapper });
};
