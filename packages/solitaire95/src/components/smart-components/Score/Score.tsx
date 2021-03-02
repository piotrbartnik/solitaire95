import React from "react";

type PropTypes = {
  score?: number;
};

const Score: React.FC<PropTypes> = (props) => {
  const { score } = props;
  return <div>Score: {score}</div>;
};

export default Score;
