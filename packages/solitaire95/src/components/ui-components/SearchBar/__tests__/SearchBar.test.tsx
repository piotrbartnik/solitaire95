import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("render SearchBar", () => {
  it("and check if it is visible", () => {
    render(<SearchBar />);
    expect(screen.getByRole("textbox")).toBeVisible();
  });

  it("and the value is changing when user types inside", () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Search string" },
    });

    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      "Search string"
    );
  });
});
