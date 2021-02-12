import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { dndWrapper, reduxWrapper } from "../../../../helpers/testHelpers";
import { cardConfigType } from "../../../../configs/cardTypes";
import CardStock from "../CardStock";

const mockStore = configureStore([]);

describe("renders CardStock", () => {
  it("with 24 cards turned back on it", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(
          <CardStock
            cardsOnStock={[["ace", "clubs", undefined, "black", 1]]}
            distanceBtwPiles={0}
            cardsFromStock={[]}
            takeOneFromStock={() => null}
            reverseStock={() => null}
            removeCardMovedToFoundation={() => null}
            cardsOnFoundations={[]}
            addPoints={() => null}
            startGame={() => null}
            addCardToFoundation={() => null}
          />
        )
      )
    );
    expect(container.querySelectorAll(".cardBack")).toHaveLength(24);
  });

  it("and when card clicked it is turned front and added to cards on table", () => {
    const { container } = render(
      dndWrapper(
        reduxWrapper(
          <CardStock
            cardsOnStock={[["ace", "clubs", undefined, "black", 1]]}
            distanceBtwPiles={0}
            cardsFromStock={[]}
            takeOneFromStock={() => null}
            reverseStock={() => null}
            removeCardMovedToFoundation={() => null}
            cardsOnFoundations={[]}
            addPoints={() => null}
            startGame={() => null}
            addCardToFoundation={() => null}
          />
        )
      )
    );
    fireEvent.click(container.querySelector(".card") as Element);
    expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
  });

  describe("with custom state", () => {
    const testAceCardStock = [["ace", "clubs", undefined, "black", 1]];

    const store = mockStore({
      cardDistribution: {
        cardsOnStock: testAceCardStock,
        cardsFromStock: testAceCardStock,
      },
      cardsOnFoundation: {
        cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
      },
    });

    it("with 1 card turned back on it", () => {
      const { container } = render(
        dndWrapper(
          <Provider store={store}>
            <CardStock
              cardsOnStock={testAceCardStock as cardConfigType[]}
              distanceBtwPiles={0}
              cardsFromStock={[]}
              takeOneFromStock={() => null}
              reverseStock={() => null}
              removeCardMovedToFoundation={() => null}
              cardsOnFoundations={[]}
              addPoints={() => null}
              startGame={() => null}
              addCardToFoundation={() => null}
            />
          </Provider>
        )
      );
      expect(container.querySelectorAll(".cardBack")).toHaveLength(1);
    });

    it("with ace and it is moved to foundations on doubleclick", () => {
      const { container } = render(
        dndWrapper(
          <Provider store={store}>
            <CardStock
              cardsOnStock={testAceCardStock as cardConfigType[]}
              distanceBtwPiles={0}
              cardsFromStock={[]}
              takeOneFromStock={() => null}
              reverseStock={() => null}
              removeCardMovedToFoundation={() => null}
              cardsOnFoundations={[]}
              addPoints={() => null}
              startGame={() => null}
              addCardToFoundation={() => null}
            />
          </Provider>
        )
      );
      fireEvent.dblClick(container.querySelector(".cardFront") as Element);
      expect(container.querySelectorAll(".cardFront")).toHaveLength(1);
    });
  });
});
