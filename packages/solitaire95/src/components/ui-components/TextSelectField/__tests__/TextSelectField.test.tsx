import React from "react";
import { render, screen } from "@testing-library/react";
import { TextSelectField } from "../TextSelectField";

describe("render TextSelectField", () => {
  it("and check if it is visible", () => {
    render(<TextSelectField>Test</TextSelectField>);
    expect(screen.getByText("Test")).toBeVisible();
  });

  it("and its height can be set with prop", () => {
    render(<TextSelectField fieldHeight="200px">Test</TextSelectField>);

    expect(screen.getByText("Test").parentElement).toHaveStyle("height: 200px");
  });
});
