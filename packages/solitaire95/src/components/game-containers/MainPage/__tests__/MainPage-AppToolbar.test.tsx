/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

describe("render MainPage for AppToolbar testing", () => {
  it("when Game button clicked Game dropown opens up and is closed on clicking anywhere else", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    // game dropdown not visible on page
    expect(screen.queryByRole("listbox", { name: "Game" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Game" }));
    // game dropdown visible after button click
    expect(screen.getByRole("listbox", { name: "Game" })).toBeVisible();
    fireEvent.click(screen.getAllByText("Solitaire")[1]);
    // not visible after clicking anywhere else
    expect(screen.queryByRole("listbox", { name: "Game" })).toBeNull();
  });
  it("when Help button clicked Help dropown opens up and is closed on clicking anywhere else", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    // help dropdown not visible on page
    expect(screen.queryByRole("listbox", { name: "Help" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    // help dropdown visible after button click
    expect(screen.getByRole("listbox", { name: "Help" })).toBeVisible();
    fireEvent.click(screen.getAllByText("Solitaire")[1]);
    // not visible after clicking anywhere else
    expect(screen.queryByRole("listbox", { name: "Help" })).toBeNull();
  });
  it("each Game button on mouse hover shows different text on bottom bar", () => {
    const gameButtonTexts = {
      Deal: "Deal a new game",
      Undo: "Undo last action",
      Deck: "Choose new deck back",
      Options: "Change Solitaire options",
      Exit: "Exit Solitaire",
    };
    reduxRtlWrapper(dndWrapper(<MainPage />));
    fireEvent.click(screen.getByRole("button", { name: "Game" }));
    Object.keys(gameButtonTexts).forEach((button) => {
      fireEvent.mouseOver(screen.getByRole("button", { name: button }));
      expect(screen.getByText(gameButtonTexts[button])).toBeVisible();
      fireEvent.mouseLeave(screen.getByRole("button", { name: button }));
      expect(screen.queryByText(gameButtonTexts[button])).toBeNull();
    });
  });
  it("each Help button on mouse hover shows different text on bottom bar", () => {
    const helpButtonTexts = {
      "Help Topics": "Index of Solitaire help topics",
      About: "About Solitaire",
    };
    reduxRtlWrapper(dndWrapper(<MainPage />));
    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    Object.keys(helpButtonTexts).forEach((button) => {
      fireEvent.mouseOver(screen.getByRole("button", { name: button }));
      expect(screen.getByText(helpButtonTexts[button])).toBeVisible();
      fireEvent.mouseLeave(screen.getByRole("button", { name: button }));
      expect(screen.queryByText(helpButtonTexts[button])).toBeNull();
    });
  });
});
