import React from "react";
import { render, screen, act } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import { AboutSolitaire } from "../AboutSolitaireWindow";

jest.useFakeTimers();
const aboutSolitaireWindow = dndWrapper(reduxWrapper(<AboutSolitaire />));

describe("renders AboutSolitaire", () => {
  it("and check score wrapper exists with top label", () => {
    render(aboutSolitaireWindow);
    expect(screen.getByText("About Solitare")).toBeTruthy();
  });
  it("and default text is there", () => {
    render(aboutSolitaireWindow);
    expect(screen.getByText("Solitaire")).toBeTruthy();
    expect(screen.getByText(/Time since opening Solitaire:/)).toBeTruthy();
    expect(screen.getByText("Your operation system is:")).toBeTruthy();
  });
  it("and timer is updated", () => {
    render(aboutSolitaireWindow);
    act(() => {
      jest.advanceTimersByTime(127000);
    });

    expect(
      screen.getByText("Time since opening Solitaire: 128 seconds")
    ).toBeInTheDocument();
  });
});
