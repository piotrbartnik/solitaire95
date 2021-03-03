import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TopbarButton } from "../TopbarButton";

describe("render TopbarButton", () => {
  it("and check if it is visible", () => {
    const testFn = jest.fn();
    render(<TopbarButton buttonText={"Test button"} onClick={testFn} />);
    expect(screen.getByText("Test button")).toBeVisible();
  });
  it("and it can be clicked", () => {
    const testFn = jest.fn();
    render(<TopbarButton buttonText={"Test button"} onClick={testFn} />);
    fireEvent.click(screen.getByText("Test button"));
    expect(testFn).toHaveBeenCalled();
  });
});
