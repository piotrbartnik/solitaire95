import React from "react";
import { render } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import Foundation from "../Foundation";
import { cardConfigType } from "src/configs/cardTypes";

const testAceCardStock = [["ace", "clubs", undefined, "black", 1]];

describe("render Foundation", () => {
  it("and it is visible", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(<Foundation cardsOnFoundation={[]} foundationId={1} />)
      )
    );
    expect(container.querySelector(".foundation")).toBeVisible();
  });
  it("and it renders card on top of the foundation", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(
          <Foundation
            cardsOnFoundation={testAceCardStock as cardConfigType[]}
            foundationId={1}
          />
        )
      )
    );
    expect(container.querySelector('div[data-cardname="ace"]')).toBeVisible();
  });
});
