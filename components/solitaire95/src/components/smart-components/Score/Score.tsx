import React from "react";

type propTypes = {
  score?: number;
};

const Score: React.FC<propTypes> = (props) => {
  const { score } = props;
  return <div>Score: {score}</div>;
};

export default Score;
