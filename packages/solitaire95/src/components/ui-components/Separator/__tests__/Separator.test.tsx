import React from "react";
import { render } from "@testing-library/react";
import Separator from "../Separator";

describe("render Separator", () => {
  it("and check if it is visible", () => {
    const { container } = render(<Separator />);
    expect(container.querySelector(".separator")).toBeVisible();
  });
});
