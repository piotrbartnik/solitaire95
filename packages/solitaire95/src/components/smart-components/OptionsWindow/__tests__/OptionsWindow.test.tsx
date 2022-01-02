import React from "react";
import { screen } from "@testing-library/react";
import { reduxRtlWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { Options } from "../OptionsWindow";

describe("renders Options Window", () => {
  it("and options window with all elements is rendered", () => {
    reduxRtlWrapper(dndWrapper(<Options />));
    expect(screen.getByText("Options")).toBeTruthy();
  });
});
