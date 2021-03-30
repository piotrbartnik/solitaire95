/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const openDeckWindow = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Deck" }));
};

describe("render MainPage for DeckSelect window testing", () => {
  it("when dropdown Game -> Deck clikced Select Card Barck window is visible", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    expect(screen.getByText("Select Card Back")).toBeVisible();
  });
  it("when dropdown Game -> Deck clicked Select Card Barck window is visible and on Cancel click it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByText("Select Card Back")).toBeNull();
  });
  it("when dropdown Game -> Deck clicked Select Card Barck window is visible and on OK click it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByText("Select Card Back")).toBeNull();
  });
  it("when dropdown Game -> Deck clicked Select Card Barck window is visible and card back is dobule clicked it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    fireEvent.dblClick(screen.getByRole("button", { name: "castle" }));
    expect(screen.queryByText("Select Card Back")).toBeNull();
  });
  it("when dropdown Game -> Deck clicked Select Card Barck window is visible and x button is clicked it is closed", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    fireEvent.click(screen.getByRole("button", { name: "close window" }));
    expect(screen.queryByText("Select Card Back")).toBeNull();
  });
  it("when window is visible it is possible to change card back on double click from default acorns card back", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    expect(
      container.querySelector("div[data-cardback='acorns']")
    ).toBeVisible();
    fireEvent.dblClick(screen.getByRole("button", { name: "castle" }));
    expect(
      container.querySelector("div[data-cardback='castle']")
    ).toBeVisible();
  });
  it("when window is visible it is possible to change card back on single click and ok button click from default acorns card back", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />));
    openDeckWindow();

    expect(
      container.querySelector("div[data-cardback='acorns']")
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "castle" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(
      container.querySelector("div[data-cardback='castle']")
    ).toBeVisible();
  });
});
