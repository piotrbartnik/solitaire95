import React from "react";
import { screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { BottomBar } from "../BottomBar";

describe("render BottomBar", () => {
  it("and check if bottom bar container is rendered", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<BottomBar />));
    expect(container.querySelectorAll(".bottomBar__bar")).toHaveLength(1);
  });

  it("and check if bottom bar text is rendered", () => {
    reduxRtlWrapper(dndWrapper(<BottomBar text={"Test"} bottomBarVisible />));
    expect(screen.getByText("Test")).toBeVisible();
  });

  it("and check if score is rendered", () => {
    reduxRtlWrapper(dndWrapper(<BottomBar bottomBarVisible scoreVisible />));
    expect(screen.getByText("Score:")).toBeVisible();
  });

  it("and if score is passed it is rendered", () => {
    reduxRtlWrapper(
      dndWrapper(<BottomBar score={11} bottomBarVisible scoreVisible />)
    );
    expect(screen.getByText("Score: 11")).toBeVisible();
  });

  it("and check if time is rendered", () => {
    reduxRtlWrapper(dndWrapper(<BottomBar bottomBarVisible timerVisible />));
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("and timer can be hidden", () => {
    reduxRtlWrapper(
      dndWrapper(<BottomBar bottomBarVisible timerVisible={false} />)
    );
    expect(screen.queryAllByText("Time:")).toHaveLength(0);
  });

  it("and score can be hidden", () => {
    reduxRtlWrapper(dndWrapper(<BottomBar scoreVisible={false} />));
    expect(screen.queryAllByText("Score:")).toHaveLength(0);
  });
});
