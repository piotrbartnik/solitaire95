import React from "react";
import { connect } from "react-redux";
import { CardDestination, Card, CardPile } from "../../components";
import * as actions from "../../store/actions/changeBollean";
import styles from "./GameContainer.module.scss";

type propTypes = {
  testBoolean: boolean;
  changeBooleanFunction: any;
  changeBooleanToStringFunction: any;
};

const GameContainer: React.FC<propTypes> = (props: propTypes) => {
  const {
    testBoolean,
    changeBooleanFunction,
    changeBooleanToStringFunction,
  } = props;
  return (
    <div className={styles.gameUIBorder}>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer__top}>
          <div className={styles.gameContainer__cardPile}>
            <CardPile />
          </div>
          <div className={styles.gameContainer__cardDestination}>
            <CardDestination />
            <CardDestination />
            <CardDestination />
            <CardDestination />
          </div>
        </div>
        <button onClick={() => changeBooleanFunction(!testBoolean)}>
          Test bool
        </button>
        <button onClick={() => changeBooleanToStringFunction("test string")}>
          Test bool to string
        </button>
        <span>{JSON.stringify(testBoolean)}</span>
        <div className={styles.gameContainer__cardDestination}>
          <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state.testBoolean);
  return {
    testBoolean: state.testBoolean,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeBooleanFunction: (payload: boolean) =>
      dispatch(actions.changeBoolean(payload)),
    changeBooleanToStringFunction: (payload: string) =>
      dispatch(actions.boolToString(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
