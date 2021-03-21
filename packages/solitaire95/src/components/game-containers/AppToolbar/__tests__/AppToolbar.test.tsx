import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { AppToolbar } from "../AppToolbar";

describe("render AppToolbar", () => {
  it("and it is visible", () => {
    const { container } = reduxRtlWrapper(
      <AppToolbar
        gameVisible
        helpVisible={false}
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={() => undefined}
      />
    );

    expect(container.querySelector(".topBarButtonContainer")).toBeVisible();
  });

  it("and it renders two button", () => {
    reduxRtlWrapper(
      <AppToolbar
        gameVisible
        helpVisible={false}
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={() => undefined}
      />
    );
    expect(screen.getByRole("button", { name: "Game" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Help" })).toBeVisible();
  });

  it("and it renders opened Game dropdown", () => {
    reduxRtlWrapper(
      <AppToolbar
        gameVisible
        helpVisible={false}
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={() => undefined}
      />
    );
    expect(screen.getByRole("listbox", { name: "Game" })).toBeVisible();
    expect(screen.queryByRole("listbox", { name: "Help" })).toBeNull();
  });
  it("and it renders opened Help dropdown", () => {
    reduxRtlWrapper(
      <AppToolbar
        gameVisible={false}
        helpVisible
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={() => undefined}
      />
    );
    expect(screen.queryByRole("listbox", { name: "Game" })).toBeNull();
    expect(screen.getByRole("listbox", { name: "Help" })).toBeVisible();
  });
  it("and Undo button is disabled", () => {
    reduxRtlWrapper(
      <AppToolbar
        gameVisible
        helpVisible={false}
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={() => undefined}
      />
    );
    expect(screen.getByRole("button", { name: "Undo" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Undo" })).toHaveClass(
      "disabled"
    );
  });
  it("and setBottomBarText is called on button mouse over", () => {
    const setBottomBarTextMock = jest.fn();
    reduxRtlWrapper(
      <AppToolbar
        gameVisible
        helpVisible={false}
        setGameVisible={() => undefined}
        setHelpVisible={() => undefined}
        setBottomBarText={setBottomBarTextMock}
      />
    );
    fireEvent.mouseOver(screen.getByRole("button", { name: "Undo" }));
    expect(setBottomBarTextMock).toHaveBeenCalled();
  });
});
