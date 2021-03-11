import React from "react";
import { render } from "@testing-library/react";
import { reduxWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { GameContainer } from "../GameContainer";

describe("render GameContainer", () => {
  it("and it is visible", () => {
    const { container } = render(dndWrapper(reduxWrapper(<GameContainer />)));
    expect(container.querySelector(".gameContainer")).toBeVisible();
  });
  it("and creates 7 piles", () => {
    const { container } = render(dndWrapper(reduxWrapper(<GameContainer />)));
    expect(
      container.querySelectorAll(".gameContainer__singlePile")
    ).toHaveLength(7);
  });
  it("and creates 4 foundations", () => {
    const { container } = render(dndWrapper(reduxWrapper(<GameContainer />)));
    expect(container.querySelectorAll(".foundation")).toHaveLength(4);
  });
  it("and creates 1 cardStock", () => {
    const { container } = render(dndWrapper(reduxWrapper(<GameContainer />)));
    expect(container.querySelectorAll(".cardStock")).toHaveLength(1);
  });
  it("and there are 52 cards", () => {
    const { container } = render(dndWrapper(reduxWrapper(<GameContainer />)));
    expect(container.querySelectorAll(".card")).toHaveLength(52);
  });
});
