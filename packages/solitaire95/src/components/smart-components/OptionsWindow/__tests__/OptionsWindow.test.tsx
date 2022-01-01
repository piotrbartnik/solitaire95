import React from "react";
import { reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { Options } from "../OptionsWindow";

describe("renders Options Window", () => {
  it("and check if it has the single div wrapper", () => {
    const { asFragment } = reduxRtlWrapper(<Options />);
    expect(asFragment().querySelectorAll("div")).toHaveLength(1);
  });
});
