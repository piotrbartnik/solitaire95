import React from "react";
import { render, screen } from "@testing-library/react";
import { Score } from "../Score";

describe("renders Score", () => {
  it("and check score wrapper exists", () => {
    render(<Score />);
    expect(screen.getByText(/Score:/)).toBeTruthy();
  });

  it("and shows score", () => {
    render(<Score score={27} />);
    expect(screen.getByText(/Score: 27/)).toBeTruthy();
  });

  it("and vegas class is applied when svore is vegas", () => {
    const { container } = render(<Score score={-27} isVegas />);
    expect(screen.getByText("Score:")).toBeInTheDocument();
    expect(screen.getByText("-$27")).toBeInTheDocument();
    expect(container.querySelector(".vegasScore")).toBeInTheDocument();
  });
});
