import React from "react";
import { render } from "@testing-library/react";
import { ToolBar } from "../ToolBar";

describe("render ToolBar", () => {
  it("and check if it is visible", () => {
    const { container } = render(<ToolBar>Test</ToolBar>);
    expect(container.querySelector(".toolBar__bar")).toBeVisible();
  });
});
