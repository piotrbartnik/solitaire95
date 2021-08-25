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
  it("when hide bottom bar checkbox is toggled bottom bar is turned on/off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Status bar" }));

    expect(screen.queryByText("Score: 0")).toBeNull();
    expect(screen.queryByText("Time: 0")).toBeNull();
  });
  it("when timed checkbox is clicked timer is turned off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Timed game" }));

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.queryByText("Time: 0")).toBeNull();
  });
});
