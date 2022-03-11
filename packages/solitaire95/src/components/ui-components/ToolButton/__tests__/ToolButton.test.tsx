import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToolButton } from "../ToolButton";

describe("render ToolButton", () => {
  it("and check if it is visible", () => {
    const { container } = render(<ToolButton label={"Open"} />);
    expect(container.querySelector(".toolElement")).toBeVisible();
  });

  it("and can be disabled", () => {
    const { container } = render(<ToolButton label={"Open"} disabled />);
    expect(container.querySelector(".disabled")).toBeVisible();
  });

  it("check if tool button can be clicked", () => {
    const testFn = jest.fn();
    render(<ToolButton label={"Open"} onClick={testFn} />);
    fireEvent.click(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });

  it("has a mouseOver event", () => {
    const testFn = jest.fn();
    render(<ToolButton label={"Open"} onMouseOver={testFn} />);
    fireEvent.mouseOver(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });

  it("has a mouseLeave event", () => {
    const testFn = jest.fn();
    render(<ToolButton label={"Open"} onMouseLeave={testFn} />);
    fireEvent.mouseLeave(screen.getByText("Open"));
    expect(testFn).toHaveBeenCalled();
  });

  it("check if tool button can be clicked by enter", () => {
    const testFn = jest.fn();
    render(<ToolButton label={"Open"} onClick={testFn} />);
    userEvent.tab();
    userEvent.keyboard("{enter}");
    expect(testFn).toHaveBeenCalled();
  });
});
