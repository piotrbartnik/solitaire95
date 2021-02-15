import React from "react";
import { render, screen } from "@testing-library/react";
import Score from "../Score";

describe("renders Score", () => {
  it("and check score wrapper exists", () => {
    render(<Score />);
    expect(screen.getByText(/Score:/)).toBeTruthy();
  });

  it("and shows score", () => {
    render(<Score score={27} />);
    expect(screen.getByText(/Score: 27/)).toBeTruthy();
  });
});
