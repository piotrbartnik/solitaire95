import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../Checkbox";

describe("render checkbox", () => {
  it("and check its functionality", () => {
    const clickMock = jest.fn();
    render(
      <Checkbox
        label={"Test checkbox"}
        id={"testId"}
        onClick={clickMock}
        checked={false}
      />
    );
    expect(
      screen.getByRole("checkbox", { name: "Test checkbox" })
    ).toBeVisible();
    expect(
      (
        screen.getByRole("checkbox", {
          name: "Test checkbox",
        }) as HTMLInputElement
      ).checked
    ).toEqual(false);
    fireEvent.click(screen.getByRole("checkbox", { name: "Test checkbox" }));
    expect(clickMock).toHaveBeenCalled();
    expect(
      (
        screen.getByRole("checkbox", {
          name: "Test checkbox",
        }) as HTMLInputElement
      ).checked
    ).toEqual(true);
  });
});
