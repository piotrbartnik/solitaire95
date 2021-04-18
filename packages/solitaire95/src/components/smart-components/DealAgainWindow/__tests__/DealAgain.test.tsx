import React from "react";
import { screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { DealAgain } from "../DealAgain";

beforeEach(() => {
  reduxRtlWrapper(dndWrapper(<DealAgain />));
});

describe("renders DealAgain", () => {
  it("and check score wrapper exists with top label", () => {
    expect(screen.getByText("Deal again?")).toBeVisible();
  });
});
