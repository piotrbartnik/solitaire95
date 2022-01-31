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
