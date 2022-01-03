/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";
import { fireDeal } from "./MainPage-Deal.test";

const openOptionsWindow = () => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Options" }));
};

describe("render MainPage for Options window testing", () => {
  it("when dropdown Game -> Options clicked About Options is visible", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByRole("dialog", { name: "Options" })).toBeVisible();
  });

  it("when hide bottom bar checkbox is toggled bottom bar is turned on/off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Status bar" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.queryByText("Score: 0")).toBeNull();
    expect(screen.queryByText("Time: 0")).toBeNull();
  });

  it("when hide bottom bar checkbox is toggled and cancel is clicked  bottom bar is not turned off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Status bar" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("when timed checkbox is clicked timer is turned off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Timed game" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.queryByText("Time: 0")).toBeNull();
  });

  it("when timed checkbox and cancel is clicked timer is not turned off", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("checkbox", { name: "Timed game" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("when time turned off cards are dealt again", () => {
    const initialState = {
      cardDistribution: {
        cardsOnStock: [["ace", "clubs", undefined, "black", 1]],
        cardsFromStock: [],
        cardsOnPiles: {},
      },
    };
    const { container } = reduxRtlWrapper(
      dndWrapper(<MainPage />),
      initialState
    );
    openOptionsWindow();

    expect(container.querySelectorAll(".cardFront")).toHaveLength(0);

    fireEvent.click(screen.getByRole("checkbox", { name: "Timed game" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(container.querySelectorAll(".cardFront")).toHaveLength(7);
  });

  it("when game changed to vegas correct scoring is shown and game is rerendered", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("radio", { name: "Vegas" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.getByText("Score:")).toBeVisible();
    expect(screen.getByText("-$52")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("when game changed to none correct scoring is shown and game is rerendered", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("radio", { name: "None" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.queryByText("Score:")).toBeNull();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("when game changed to vegas correct scoring is shown and game is rerendered and score can be kept", () => {
    reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    fireEvent.click(screen.getByRole("radio", { name: "Vegas" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.getByText("Score:")).toBeVisible();
    expect(screen.getByText("-$52")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();

    openOptionsWindow();
    fireEvent.click(screen.getByRole("checkbox", { name: "Keep score" }));
    fireDeal();

    expect(screen.getByText("Score:")).toBeVisible();
    expect(screen.getByText("-$104")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });

  it("when draw one is selected only one card will be shown on stack", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    fireEvent.click(screen.getByRole("radio", { name: "Draw one" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(8);
  });

  it("when draw three is selected only one card will be shown on stack", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<MainPage />));
    openOptionsWindow();

    fireEvent.click(screen.getByRole("radio", { name: "Draw three" }));
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    expect(container.querySelectorAll(".cardFront")).toHaveLength(10);
  });
});
