import React from "react";

type PropTypes = {
  score?: number;
};

export const Score: React.FC<PropTypes> = (props) => {
  const { score } = props;
  return <div>Score: {score}</div>;
};
