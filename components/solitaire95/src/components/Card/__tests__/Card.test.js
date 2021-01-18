import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { dndWrapper } from "../../../helpers/testHelpers";
import Card from "../Card";

describe("renders Card", () => {
  it("and check if card back is rendered", () => {
    const { container } = render(dndWrapper(<Card isTurnedBack />));
    expect(container.querySelectorAll(".cardBack")).toHaveLength(1);
  });

  it("and check if card front is rendered", () => {
    const { container } = render(dndWrapper(<Card isTurnedBack={false} />));
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
  });

  it("and card can be turned on click if turned back", () => {
    const { container } = render(dndWrapper(<Card isTurnedBack canBeTurned />));
    fireEvent.click(container.querySelector(".card"));
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
  });

  it("and cards makes action on double click", () => {
    const handleDoubleClick = jest.fn();

    const { container } = render(
      dndWrapper(
        <Card isTurnedBack={false} onDoubleClick={handleDoubleClick} />
      )
    );
    fireEvent.doubleClick(container.querySelector(".card"));
    expect(handleDoubleClick).toHaveBeenCalledTimes(1);
  });
});
