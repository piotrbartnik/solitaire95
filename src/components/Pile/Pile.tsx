import React from "react";
import { Card } from "..";

const Pile: React.FC = () => {
  return (
    <div>
      <Card front={"kingOfHearts"} back={"acorns"} isTurnedBack={false} />
    </div>
  );
};

export default Pile;
