import React, { useState } from "react";
import styles from "./HelpTopicsTextWindow.module.scss";

const rowStacksInfo = (
  <div className={styles.externalInfo}>
    Cards are stacked in descending order, alternating between red cards and
    black cards. For example, you can play the two of hearts on the three of
    clubs.
  </div>
);

const suitStacksInfo = (
  <div className={styles.externalInfo}>
    Cards are stacked in the four areas at the top right of the screen in
    ascending order, beginning with aces. For example, you can play the two of
    hearts on the ace of hearts.
  </div>
);

export const HowToPlay: React.VFC = () => {
  const [showRowStacksInfo, setRowStacksInfo] = useState(false);
  const [showSuitStacksInfo, setSuitStacksInfo] = useState(false);

  return (
    <div className={styles.textContainer}>
      <p>To play Solitaire: starting the game</p>
      <ol>
        <li>On the Game menu, click Deal.</li>
        <li>
          Begin play by double-clicking any aces on top of the seven row stacks
          to move them to the spaces at the top right fo the screen and then
          making any other plays available on the board.
          <br /> You will be building two kinds of stacks:{" "}
          <span
            className={styles.anchor}
            onMouseOver={() => setRowStacksInfo(true)}
            onMouseOut={() => setRowStacksInfo(false)}
          >
            row stacks
          </span>
          {showRowStacksInfo && rowStacksInfo} and{" "}
          <span
            className={styles.anchor}
            onMouseOver={() => setSuitStacksInfo(true)}
            onMouseOut={() => setSuitStacksInfo(false)}
          >
            suit stacks.
          </span>
          {showSuitStacksInfo && suitStacksInfo}
          <br /> To free up cards that you need to build a suit stacks, you
          build row stacks. <br /> To move a card or a stack of cards from one
          row to another, drag it. <br />
          To move a card to a suit stack, double-click it.
        </li>
        <li>
          When you have made all the available plays on the board, click the
          deck to begin turning over cards. The card that is face up on top of
          the deck is always available to play
        </li>
      </ol>
      <p>Note</p>
      <ul>
        <li>
          The object of the game is to use all the cards in the deck to build up
          the four suit stacks from ace to king.
        </li>
      </ul>
    </div>
  );
};

const standardScoringInfo = (
  <div className={styles.externalInfo}>
    <p>Standard scoring</p>
    <ul>
      <li>If you move a card to a suit stack, you get 10 points.</li>
      <li>
        If you move a card from the deck to a row stack, you get 5 points.
      </li>
      <li>If you turn onver a card in a row stack, you get 5 points.</li>
      <li>
        If you move a card from a suit stack back to a row stack, you lose 15
        points.
      </li>
      <li>
        If you are playing with the Draw Three option, you lose 20 points every
        time you go trough the deck after the third time.
      </li>
      <li>
        If you are playing with the Draw One option, you lose 100 points every
        time you go trough the deck after first time.
      </li>
      <li>
        For timed games only, you lose 2 points every 10 seconds of play, and
        you receive bonus points at the end of the game. The shorter the game,
        the larger the bonus.
      </li>
    </ul>
  </div>
);

const vegasScoringInfo = (
  <div className={styles.externalInfo}>
    <p>Vegas scoring</p>
    <ul>
      <li>
        You stard the game with a debt of 52 dollars, which represents your
        wager.
      </li>
      <li>You win 5 dollars for every card you play on a suit stack.</li>
      <li>The object of the game is to earn more money than you wager.</li>
    </ul>
  </div>
);

export const ScoringInformation: React.VFC = () => {
  const [showStandardScoringInfo, setStandardScoringInfo] = useState(false);
  const [showVegasScoringInfo, setShowVegasScoringInfo] = useState(false);

  return (
    <div className={styles.textContainer}>
      <p>To choose a scoring system</p>
      <ol>
        <li>On the Game menu, click Options.</li>
        <li>
          In the Scoring box, click{" "}
          <span
            className={styles.anchor}
            onMouseOver={() => setStandardScoringInfo(true)}
            onMouseOut={() => setStandardScoringInfo(false)}
          >
            Standard scoring
          </span>
          {showStandardScoringInfo && standardScoringInfo},{" "}
          <span
            className={styles.anchor}
            onMouseOver={() => setShowVegasScoringInfo(true)}
            onMouseOut={() => setShowVegasScoringInfo(false)}
          >
            Vegas scoring
          </span>{" "}
          {showVegasScoringInfo && vegasScoringInfo}
          or None.
        </li>
      </ol>
      <p>Note</p>
      <ul>
        <li>
          On the Options menu, you can also specify whether to draw one or three
          cards at a time. These options are scored slightly differently.
        </li>
      </ul>
    </div>
  );
};
