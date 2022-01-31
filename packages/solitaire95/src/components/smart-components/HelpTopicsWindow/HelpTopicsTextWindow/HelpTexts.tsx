import React, { useState } from "react";
import styles from "./HelpTopicsTextWindow.module.scss";

type AdditionalInfoPropTypes = {
  additionalInfoVisible: boolean;
};

const AdditionalInfo: React.VFC<AdditionalInfoPropTypes> = ({
  additionalInfoVisible,
}) => {
  return additionalInfoVisible ? (
    <div className={styles.externalInfo}>
      Cards are stacked in descending order, alternating between red cards and
      black cards. For example, you can play the two of hearts on the three of
      clubs
    </div>
  ) : null;
};

export const HowToPlay: React.VFC = () => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

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
            onMouseOver={() => setShowAdditionalInfo(true)}
            onMouseOut={() => setShowAdditionalInfo(false)}
          >
            row stacks
          </span>
          <AdditionalInfo additionalInfoVisible={showAdditionalInfo} />
          and <span className={styles.anchor}>suit stacks.</span>
          <br /> To free up cards that you need to build a suit stackc, you
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
