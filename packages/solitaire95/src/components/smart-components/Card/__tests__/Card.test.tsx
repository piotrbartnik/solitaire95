import React from "react";
import { fireEvent } from "@testing-library/react";
import { reduxRtlWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { Card } from "../Card";

describe("renders Card", () => {
  it("and check if card back is rendered", () => {
    const { container } = reduxRtlWrapper(
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
    const { container } = reduxRtlWrapper(
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

  it("and cards makes action on double click", () => {
    const handleDoubleClick = jest.fn();

    const { container } = reduxRtlWrapper(
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
