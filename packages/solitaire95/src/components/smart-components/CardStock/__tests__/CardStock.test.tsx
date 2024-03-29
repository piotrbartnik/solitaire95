import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";
import { dndWrapper, reduxRtlWrapper } from "../../../../helpers/testHelpers";
import { CardStock } from "../CardStock";

const mockStore = configureStore([]);

const testAceCardStock = [["ace", "clubs", undefined, "black", 1]];

const store = {
  cardDistribution: {
    cardsOnStock: testAceCardStock,
    cardsFromStock: testAceCardStock,
    threeCardsOnTable: [],
  },
  gameState: { gameStarted: false, drawType: "drawOne", scoreType: "standard" },
  stockCounter: { stockRevolutions: 0 },
  cardsOnFoundation: {
    cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
    cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
    cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
    cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
  },
};

describe("renders CardStock", () => {
  it("with 24 cards turned back on it", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<CardStock />));
    expect(container.querySelectorAll(".card__back")).toHaveLength(24);
  });

  it("and when card clicked it is turned front and added to cards on table", () => {
    const { container } = reduxRtlWrapper(dndWrapper(<CardStock />));
    fireEvent.click(container.querySelector(".card") as Element);
    expect(container.querySelectorAll(".card__front")).toHaveLength(1);
  });

  describe("with custom state", () => {
    it("with 1 card turned back on it", () => {
      const { container } = reduxRtlWrapper(
        dndWrapper(
          <Provider store={mockStore(store)}>
            <CardStock />
          </Provider>
        )
      );
      expect(container.querySelectorAll(".card__back")).toHaveLength(1);
    });

    it("with ace and it is moved to foundations on doubleclick", () => {
      const { container } = reduxRtlWrapper(
        dndWrapper(
          <Provider store={mockStore(store)}>
            <CardStock />
          </Provider>
        )
      );
      fireEvent.dblClick(container.querySelector(".card__front") as Element);
      expect(container.querySelectorAll(".card__front")).toHaveLength(1);
    });
  });
});
