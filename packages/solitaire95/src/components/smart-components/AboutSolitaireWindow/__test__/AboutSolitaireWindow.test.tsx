import React from "react";
import { screen, act } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { AboutSolitaire } from "../AboutSolitaireWindow";

jest.useFakeTimers();
beforeEach(() => {
  reduxRtlWrapper(dndWrapper(<AboutSolitaire />));
});

describe("renders AboutSolitaire", () => {
  it("and check score wrapper exists with top label", () => {
    expect(screen.getByText("About Solitaire")).toBeTruthy();
  });
  it("and default text is there", () => {
    expect(screen.getByText("Solitaire")).toBeTruthy();
    expect(screen.getByText(/Time since opening Solitaire:/)).toBeTruthy();
    expect(screen.getByText("Your operation system is:")).toBeTruthy();
  });
  it("and timer is updated", () => {
    act(() => {
      jest.advanceTimersByTime(130000);
    });

    expect(
      screen.getByText(/Time since opening Solitaire: 13\d seconds/)
    ).toBeInTheDocument();
  });
});
