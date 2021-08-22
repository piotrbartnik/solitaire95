/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

const openOptionsWindow = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Options" }));
};

describe("render MainPage for Options window testing", () => {
  it("when dropdown Game -> Options clicked About Options is visible", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByRole("dialog", { name: "Options" })).toBeVisible();
  });
});
