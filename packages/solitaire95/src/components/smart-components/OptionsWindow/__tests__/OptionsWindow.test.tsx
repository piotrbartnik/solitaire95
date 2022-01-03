import React from "react";
import { screen } from "@testing-library/react";
import { reduxRtlWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { Options } from "../OptionsWindow";

describe("renders Options Window", () => {
  it("and options window with all elements is rendered", () => {
    reduxRtlWrapper(dndWrapper(<Options />));
    expect(screen.getByText("Options")).toBeTruthy();
    expect(screen.getByLabelText("Timed game")).toBeTruthy();
    expect(screen.getByLabelText("Status bar")).toBeTruthy();
    expect(screen.getByLabelText("Outline dragging")).toBeTruthy();
    expect(screen.getByLabelText("Keep score")).toBeTruthy();
    expect(screen.getByText("Draw one")).toBeTruthy();
    expect(screen.getByText("Draw three")).toBeTruthy();
    expect(screen.getByText("Standard")).toBeTruthy();
    expect(screen.getByText("Vegas")).toBeTruthy();
    expect(screen.getByText("None")).toBeTruthy();
  });
});
