import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { dndWrapper } from "../../../../helpers/testHelpers";
import { SettingsWindow } from "../SettingsWindow";

describe("render SettingsWindows", () => {
  it("and check if it is visible", () => {
    render(dndWrapper(<SettingsWindow windowTitle={"Test window"} visible />));
    expect(screen.getByText("Test window")).toBeVisible();
  });
  it("has buttons when passed", () => {
    render(
      dndWrapper(
        <SettingsWindow
          windowTitle={"Test window"}
          visible
          buttons={[{ text: "Test button", onClick: () => null }]}
        />
      )
    );
    expect(screen.getByText("Test button")).toBeVisible();
  });
  it("and passed button can be clicked", async () => {
    const testClickFn = jest.fn();
    render(
      dndWrapper(
        <SettingsWindow
          windowTitle={"Test window"}
          visible
          buttons={[{ text: "Test button", onClick: testClickFn }]}
        />
      )
    );
    fireEvent.click(screen.getByText("Test button"));

    expect(testClickFn).toHaveBeenCalled();
  });
});
