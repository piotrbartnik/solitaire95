import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ToolButton } from "../ToolButton";

describe("render ToolButton", () => {
  it("and check if it is visible", () => {
    const { container } = render(<ToolButton text={"Open"} />);
    expect(container.querySelector(".toolElement")).toBeVisible();
  });
  it("and can be disabled", () => {
    const { container } = render(<ToolButton text={"Open"} disabled />);
    expect(container.querySelector(".disabled")).toBeVisible();
  });
  it("check if tool button can be clicked", () => {
    const testFn = jest.fn();
    render(<ToolButton text={"Open"} onClick={testFn} />);
    fireEvent.click(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });
  it("has a mouseOver event", () => {
    const testFn = jest.fn();
    render(<ToolButton text={"Open"} onMouseOver={testFn} />);
    fireEvent.mouseOver(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });
  it("has a mouseLeave event", () => {
    const testFn = jest.fn();
    render(<ToolButton text={"Open"} onMouseLeave={testFn} />);
    fireEvent.mouseLeave(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });
});
