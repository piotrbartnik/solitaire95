import React from "react";
import { render, screen } from "@testing-library/react";
import { Bio } from "../Bio";

describe("render Bio", () => {
  it("and all text on it is visible", () => {
    render(<Bio />);
    expect(
      screen.getByText("Windows 95 Solitaire remake in React")
    ).toBeVisible();
    expect(screen.getByText("Developed by")).toBeVisible();
    expect(screen.getByRole("link", { name: "Piotr Bartnik" })).toBeVisible();
    expect(
      screen.getByRole("link", { name: "GitHub Repository" })
    ).toBeVisible();
  });
});
