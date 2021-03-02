import React from "react";
import { render } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import Pile from "../Pile";
import { cardConfigType } from "src/configs/cardTypes";

const testAceCardStock: cardConfigType[] = [
  ["ace", "clubs", undefined, "black", 1],
  ["ace", "clubs", undefined, "black", 1],
  ["ace", "clubs", undefined, "black", 1],
];

const testAceCardStockTwoBackTwoFront: cardConfigType[] = [
  ["ace", "clubs", undefined, "black", 1],
  ["ace", "clubs", undefined, "black", 1],
  ["ace", "clubs", true, "black", 1],
  ["ace", "clubs", true, "black", 1],
];

describe("render Pile", () => {
  it("and it is visible", () => {
    const { container } = render(
      dndWrapper(reduxWrapper(<Pile cardsOnPile={[]} pileIndex={0} />))
    );
    expect(container.querySelector(".pile__container")).toBeVisible();
  });
  it("and one card is rendered", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(<Pile cardsOnPile={testAceCardStock} pileIndex={0} />)
      )
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(3);
  });
  it("first card has 0px and second 27px from top etc if all cards are turned front", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(<Pile cardsOnPile={testAceCardStock} pileIndex={0} />)
      )
    );
    expect(container.querySelectorAll("div[style*='top: 0px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 27px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 54px;']")).toHaveLength(
      1
    );
  });
  it("first card has 0px and second 5px from top etc if all cards are turned back", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(<Pile cardsOnPile={testAceCardStock} pileIndex={4} />)
      )
    );
    expect(container.querySelectorAll("div[style*='top: 0px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 5px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 10px;']")).toHaveLength(
      1
    );
  });
  it("and two cards are back and two fron", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(
          <Pile cardsOnPile={testAceCardStockTwoBackTwoFront} pileIndex={4} />
        )
      )
    );
    expect(container.querySelectorAll("div[style*='top: 0px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 5px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 10px;']")).toHaveLength(
      1
    );
    expect(container.querySelectorAll("div[style*='top: 37px;']")).toHaveLength(
      1
    );
  });
});
