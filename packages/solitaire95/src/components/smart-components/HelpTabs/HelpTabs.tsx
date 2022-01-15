import React from "react";
import { TabGroup } from "./TabGroup/TabGroup";

export const HelpTabs: React.FC = () => {
  const tabs = ["Contents", "Index", "Find"];

  return <TabGroup tabs={tabs} defaultActiveTab="Contents" />;
};
