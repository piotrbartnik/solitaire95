import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { dealCards } from "./store/actions/";
import { undoActions } from "./helpers/undo";
import { rootReducer } from "./store/reducers";
import { MainPage } from "./components/game-containers/MainPage/MainPage";
import "./Solitaire95.scss";

const persistedState = localStorage.getItem("solitaireState")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("solitaireState"))
  : undefined;

delete persistedState?.toggleWindows;

const middlewareEnhancer = applyMiddleware(undoActions);

const store = createStore(
  rootReducer,
  persistedState,
  // {},
  compose(
    middlewareEnhancer,
    process.env.NODE_ENV === "development"
      ? // @ts-ignore
        window && (window as unknown).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : (a: unknown) => a
  )
);

store.subscribe(() => {
  localStorage.setItem(
    "solitaireState",
    JSON.stringify({
      cardDistribution: {
        cardsOnStock: [],
        cardsFromStock: [["king", "hearts", true, "red", "12"]],
        cardsOnPiles: {
          "0": [],
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
        },
      },
      cardsOnFoundation: {
        cardsOnFirstFoundation: {
          foundationSuite: "diamonds",
          cards: [
            ["ace", "diamonds", true, "red", "0"],
            ["two", "diamonds", true, "red", "1"],
            ["three", "diamonds", true, "red", "2"],
            ["four", "diamonds", true, "red", "3"],
            ["five", "diamonds", true, "red", "4"],
            ["six", "diamonds", true, "red", "5"],
            ["seven", "diamonds", true, "red", "6"],
            ["eight", "diamonds", true, "red", "7"],
            ["nine", "diamonds", true, "red", "8"],
            ["ten", "diamonds", true, "red", "9"],
            ["jack", "diamonds", true, "red", "10"],
            ["queen", "diamonds", true, "red", "11"],
            ["king", "diamonds", true, "red", "12"],
          ],
        },
        cardsOnSecondFoundation: {
          foundationSuite: "spades",
          cards: [
            ["ace", "spades", true, "black", "0"],
            ["two", "spades", true, "black", "1"],
            ["three", "spades", true, "black", "2"],
            ["four", "spades", true, "black", "3"],
            ["five", "spades", true, "black", "4"],
            ["six", "spades", true, "black", "5"],
            ["seven", "spades", true, "black", "6"],
            ["eight", "spades", true, "black", "7"],
            ["nine", "spades", true, "black", "8"],
            ["ten", "spades", true, "black", "9"],
            ["jack", "spades", true, "black", "10"],
            ["queen", "spades", true, "black", "11"],
            ["king", "spades", true, "black", "12"],
          ],
        },
        cardsOnThirdFoundation: {
          foundationSuite: "clubs",
          cards: [
            ["ace", "clubs", true, "black", "0"],
            ["two", "clubs", true, "black", "1"],
            ["three", "clubs", true, "black", "2"],
            ["four", "clubs", true, "black", "3"],
            ["five", "clubs", true, "black", "4"],
            ["six", "clubs", true, "black", "5"],
            ["seven", "clubs", true, "black", "6"],
            ["eight", "clubs", true, "black", "7"],
            ["nine", "clubs", true, "black", "8"],
            ["ten", "clubs", true, "black", "9"],
            ["jack", "clubs", true, "black", "10"],
            ["queen", "clubs", true, "black", "11"],
            ["king", "clubs", true, "black", "12"],
          ],
        },
        cardsOnFourthFoundation: {
          foundationSuite: "hearts",
          cards: [
            ["ace", "hearts", true, "red", "0"],
            ["two", "hearts", true, "red", "1"],
            ["three", "hearts", true, "red", "2"],
            ["four", "hearts", true, "red", "3"],
            ["five", "hearts", true, "red", "4"],
            ["six", "hearts", true, "red", "5"],
            ["seven", "hearts", true, "red", "6"],
            ["eight", "hearts", true, "red", "7"],
            ["nine", "hearts", true, "red", "8"],
            ["ten", "hearts", true, "red", "9"],
            ["jack", "hearts", true, "red", "10"],
            ["queen", "hearts", true, "red", "11"],
          ],
        },
      },
      toggleWindows: {
        cardBackWindow: false,
        aboutWindow: false,
        optionsWindow: false,
        dealAgainWindow: false,
      },
      countScore: {
        points: 512,
      },
      gameState: {
        gameStarted: true,
        gameFinished: false,
      },
      stockCounter: {
        stockRevolutions: 2,
      },
      timeCounter: {
        initialTime: 0,
        scoreTime: 0,
      },
    })
  );
});

if (!persistedState) {
  store.dispatch(dealCards());
}

type PropTypes = {
  playSounds?: boolean;
  aboutChildren?: JSX.Element;
};

const Solitaire95: React.FC<PropTypes> = (props) => {
  const { playSounds, aboutChildren } = props;
  return (
    <Provider store={store}>
      <MainPage playSounds={playSounds} aboutChildren={aboutChildren} />
    </Provider>
  );
};

export { Solitaire95 };
