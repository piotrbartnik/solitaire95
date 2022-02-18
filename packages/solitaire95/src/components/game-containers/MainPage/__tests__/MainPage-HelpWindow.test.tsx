/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const openHelpWindow = () => {
  fireEvent.click(screen.getByRole("button", { name: "Help" }));
  fireEvent.click(screen.getByRole("button", { name: "Help Topics" }));
};

describe("render MainPage for Help Topics window testing", () => {
  it("when dropdown Help -> Help Topics clicked Help window is visible", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openHelpWindow();

    expect(screen.getByText("Help Topics: Solitaire Help")).toBeVisible();
  });
});
