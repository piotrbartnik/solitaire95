import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { dndWrapper } from "../../../../helpers/testHelpers";
import Card from "../Card";

describe("renders Card", () => {
  it("and check if card back is rendered", () => {
    const { container } = render(
      dndWrapper(
        <Card
          isTurnedBack
          cardBack={"test"}
          cardColor={"test"}
          cardFront={"test"}
          cardOrder={"test"}
          cardSuite={"test"}
          canBeTurned
        />
      )
    );
    expect(container.querySelectorAll(".cardBack")).toHaveLength(1);
  });

  it("and check if card front is rendered", () => {
    const { container } = render(
      dndWrapper(
        <Card
          isTurnedBack={false}
          cardBack={"test"}
          cardColor={"test"}
          cardFront={"test"}
          cardOrder={"test"}
          cardSuite={"test"}
          canBeTurned
        />
      )
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
  });

  it("and card can be turned on click if turned back", () => {
    const { container } = render(
      dndWrapper(
        <Card
          isTurnedBack
          canBeTurned
          cardBack={"test"}
          cardColor={"test"}
          cardFront={"test"}
          cardOrder={"test"}
          cardSuite={"test"}
        />
      )
    );
    fireEvent.click(container.querySelector(".card") as Element);
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
  });

  it("and cards makes action on double click", () => {
    const handleDoubleClick = jest.fn();

    const { container } = render(
      dndWrapper(
        <Card
          isTurnedBack={false}
          onDoubleClick={handleDoubleClick}
          cardBack={"test"}
          cardColor={"test"}
          cardFront={"test"}
          cardOrder={"test"}
          cardSuite={"test"}
          canBeTurned
        />
      )
    );
    fireEvent.doubleClick(container.querySelector(".card") as Element);
    expect(handleDoubleClick).toHaveBeenCalledTimes(1);
  });
});
