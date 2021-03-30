/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const openAboutWindow = () => {
  fireEvent.click(screen.getByRole("button", { name: "Help" }));
  fireEvent.click(screen.getByRole("button", { name: "About" }));
};

describe("render MainPage for About window testing", () => {
  it("when dropdown Help -> About clicked About window is visible", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openAboutWindow();

    expect(screen.getByText("About Solitaire")).toBeVisible();
  });
  it("when dropdown Help -> About clicked About window is visible and on OK click it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openAboutWindow();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.getByText("Select Card Back")).not.toBeVisible();
  });
  it("when dropdown Help -> About clicked About window is visible and x button is clicked it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openAboutWindow();

    fireEvent.click(screen.getByRole("button", { name: "close window" }));
    expect(screen.getByText("Select Card Back")).not.toBeVisible();
  });
});