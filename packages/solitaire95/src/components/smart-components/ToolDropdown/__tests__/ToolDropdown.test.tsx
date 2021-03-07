import React from "react";
import { render } from "@testing-library/react";
import { ToolDropdown } from "../ToolDropdown";

describe("render ToolDropdown", () => {
  it("and check if it is visible", () => {
    const { container } = render(<ToolDropdown visible />);
    expect(
      container.querySelector(".dropdownContainer__visible")
    ).toBeVisible();
  });
  it("and check if it is not visible", () => {
    const { container } = render(<ToolDropdown visible={false} />);
    expect(container.querySelector(".dropdownContainer__visible")).toBeFalsy();
  });
});
