import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import DeckSelect from "../DeckSelect";

const deckSelectComponent = dndWrapper(
  reduxWrapper(
    <DeckSelect isWindowVisible={true} toggleCardBackWindow={() => false} />
  )
);

describe("renders DeckSelect", () => {
  it("and check score wrapper exists with top label", () => {
    render(deckSelectComponent);
    expect(screen.getByText("Select Card Back")).toBeTruthy();
  });

  it("and check there are 12 card backs to choose", () => {
    const { container } = render(deckSelectComponent);
    expect(container.querySelectorAll(".deckContainer__cardBack")).toHaveLength(
      12
    );
  });
  it("and deck window has ok, cancel and x button", () => {
    const { container } = render(deckSelectComponent);
    expect(screen.getByText("OK")).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(container.querySelectorAll(".closeButton")).toHaveLength(1);
  });
  it("and when card clicked two times it update card back state", () => {
    const { container } = render(deckSelectComponent);
    fireEvent.dblClick(
      container.querySelectorAll(".deckContainer__cardBack")[0]
    );
  });
});
