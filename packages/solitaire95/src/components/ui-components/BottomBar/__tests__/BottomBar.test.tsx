import React from "react";
import { render, screen } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import { BottomBar } from "../BottomBar";

describe("render BottomBar", () => {
  it("and check if bottom bar container is rendered", () => {
    const { container } = render(dndWrapper(reduxWrapper(<BottomBar />)));
    expect(container.querySelectorAll(".bottomBar__bar")).toHaveLength(1);
  });

  it("and check if bottom bar text is rendered", () => {
    render(dndWrapper(reduxWrapper(<BottomBar text={"Test"} />)));
    expect(screen.getByText("Test")).toBeVisible();
  });

  it("and check if score is rendered", () => {
    render(dndWrapper(reduxWrapper(<BottomBar />)));
    expect(screen.getByText("Score:")).toBeVisible();
  });

  it("and if score is passed it is rendered", () => {
    render(dndWrapper(reduxWrapper(<BottomBar score={11} />)));
    expect(screen.getByText("Score: 11")).toBeVisible();
  });

  it("and check if time is rendered", () => {
    render(dndWrapper(reduxWrapper(<BottomBar />)));
    expect(screen.getByText("Time: 0")).toBeVisible();
  });
});
