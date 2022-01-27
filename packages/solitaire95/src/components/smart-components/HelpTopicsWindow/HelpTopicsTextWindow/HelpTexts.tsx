import React from "react";
import styles from "./HelpTopicsTextWindow.module.scss";

export const howToPlay = (
  <div className={styles.textContainer}>
    <p>To play Solitaire: starting the game</p>
    <ol>
      <li>On the Game menu, click Deal.</li>
      <li>
        Begin play by double-clicking any aces on top of the seven row stacks to
        move them to the spaces at the top right fo the screen and then making
        any other plays available on the board.
        <br /> You will be building two kinds of stacks: row stacks and suit
        stacks.
        <br /> To free up cards that you need to build a suit stackc, you build
        row stacks. <br /> To move a card or a stack of cards from one row to
        another, drag it. <br />
        To move a card to a suit stack, double-click it.
      </li>
      <li>
        When you have made all the available plays on the board, click the deck
        to begin turning over cards. The card that is face up on top of the deck
        is always available to play
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
