import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { rootReducer } from "./store/reducers/";
import { Provider } from "react-redux";
import { Solitaire95 } from "./Solitaire95";

const store = createStore(rootReducer);

describe("renders App page", () => {
  it("and check if it has the top bar", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Solitaire95 />
      </Provider>
    );
    expect(asFragment().querySelectorAll(".topBar__bar")).toHaveLength(3);
  });
});
