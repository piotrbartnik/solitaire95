import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radiobutton } from "../Radiobutton";

describe("render radio box", () => {
  it("and check its functionality", () => {
    const clickMock = jest.fn();
    render(
      <Radiobutton
        label="Radio button test"
        onClick={clickMock}
        currentValue="Radio button test"
      />
    );
    expect(screen.getByText("Radio button test")).toBeVisible();
    fireEvent.click(screen.getByRole("radio", { name: "Radio button test" }));
    expect(clickMock).toHaveBeenCalled();
  });
});
