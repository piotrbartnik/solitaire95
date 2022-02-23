import React from "react";
import { render, screen } from "@testing-library/react";
import { RadioBox } from "../RadioBox";

describe("render radio box", () => {
  it("and check its functionality", () => {
    render(
      <RadioBox label="Radio box title" width={600} heigth={600}>
        <div>Test children</div>
      </RadioBox>
    );
    expect(screen.getByText("Radio box title")).toBeVisible();
    expect(screen.getByText("Test children")).toBeVisible();
  });
});
