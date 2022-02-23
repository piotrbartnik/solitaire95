import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TopbarButton } from "../TopbarButton";

describe("render TopbarButton", () => {
  it("and check if it is visible", () => {
    const testFn = jest.fn();
    render(<TopbarButton id={"test"} label={"Test button"} onClick={testFn} />);
    expect(screen.getByText("Test button")).toBeVisible();
  });
  it("and it can be clicked", () => {
    const testFn = jest.fn();
    render(<TopbarButton id={"test"} label={"Test button"} onClick={testFn} />);
    fireEvent.click(screen.getByText("Test button"));
    expect(testFn).toHaveBeenCalled();
  });

  it("and it can be focused", () => {
    const testFn = jest.fn();
    render(<TopbarButton id={"test"} label={"Test button"} onClick={testFn} />);
    const button = screen.getByRole("button", { name: "Test button" });

    userEvent.tab();
    expect(button).toHaveFocus();

    userEvent.tab();
    expect(button).not.toHaveFocus();
  });

  it("and it can be triggered by enter or space", () => {
    const testFn = jest.fn();
    render(<TopbarButton id={"test"} label={"Test button"} onClick={testFn} />);

    userEvent.tab();
    userEvent.keyboard("{enter}");
    expect(testFn).toHaveBeenCalled();
    userEvent.keyboard("{space}");
    expect(testFn).toHaveBeenCalled();
  });
});
