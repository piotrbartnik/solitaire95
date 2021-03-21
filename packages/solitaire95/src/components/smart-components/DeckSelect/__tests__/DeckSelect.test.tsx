import React from "react";
import { screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { DeckSelect } from "../DeckSelect";

describe("renders DeckSelect", () => {
  it("and check score wrapper exists with top label", () => {
    reduxRtlWrapper(dndWrapper(<DeckSelect />));
    expect(screen.getByText("Select Card Back")).toBeTruthy();
  });

  it("and check there are 12 card backs to choose", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<DeckSelect />));
    expect(container.querySelectorAll(".deckContainer__cardBack")).toHaveLength(
      12
    );
  });
  it("and deck window has ok, cancel and x button", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<DeckSelect />));
    expect(screen.getByText("OK")).toBeTruthy();
    expect(screen.getByText("Cancel")).toBeTruthy();
    expect(container.querySelectorAll(".closeButton")).toHaveLength(1);
  });
});
