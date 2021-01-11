import React, { useState } from "react";

const Score: React.FC = () => {
  const [score] = useState(0);

  return <div>Score: {score}</div>;
};

export default Score;
