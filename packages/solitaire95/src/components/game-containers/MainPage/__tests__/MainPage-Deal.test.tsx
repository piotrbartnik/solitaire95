import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { MainPage } from "../MainPage";

export const fireDeal = (): void => {
  fireEvent.click(screen.getByRole("button", { name: "Game" }));
  fireEvent.click(screen.getByRole("button", { name: "Deal" }));
};

jest.useFakeTimers();

describe("render MainPage, start game", () => {
  it("and when deal is cliked points count, timer and cards are set to new game", () => {
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
    fireEvent.click(
      container.querySelector(".cardStock__cardHolder") as Element
    );
    fireEvent.doubleClick(container.querySelector(".card__front") as Element);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("Score: 10")).toBeVisible();
    expect(screen.getByText("Time: 5")).toBeVisible();
    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(1);

    fireDeal();

    expect(
      container.querySelector(".foundation")?.querySelectorAll(".card")
    ).toHaveLength(0);
    expect(screen.getByText("Score: 0")).toBeVisible();
    expect(screen.getByText("Time: 0")).toBeVisible();
  });
});
