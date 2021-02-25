import React from "react";
import { render, screen } from "@testing-library/react";
import TopBar from "../TopBar";

describe("render TopBar", () => {
  it("and check if it is visible", () => {
    render(<TopBar title={"Test Title"} />);
    expect(screen.getByText("Test Title")).toBeVisible();
  });
  it("and icon is rendered when showIcon prop is set to true", () => {
    const { container } = render(<TopBar title={"Test Title"} showIcon />);
    expect(container.querySelector("img.topBar__bar--icon")).toBeVisible();
  });
  it("is disabled when shouldBeGreyedOut prop is passed", () => {
    const { container } = render(
      <TopBar title={"Test Title"} shouldBeGreyedOut />
    );
    expect(container.querySelector(".topBar__bar--grey")).toBeVisible();
  });
});
