import React from "react";

type PilePropTypes = {
  children?: JSX.Element;
};

export const HelpTabs: React.FC<PilePropTypes> = ({
  children = "Tab here",
}) => {
  console.log("tab here");
  return <div>{children}</div>;
};
