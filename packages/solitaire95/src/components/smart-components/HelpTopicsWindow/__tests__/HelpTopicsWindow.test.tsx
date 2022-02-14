import React from "react";
import { screen } from "@testing-library/react";
import { reduxRtlWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { HelpTopics } from "../HelpTopics";

describe("render HelpTopics", () => {
  it("and check if tab navs are visible", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />));

    expect(
      screen.getByRole("button", { name: "Contents", hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Index", hidden: true })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Find", hidden: true })
    ).toBeInTheDocument();
  });
});
