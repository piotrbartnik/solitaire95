import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TabGroup } from "../TabGroup";

const testTabs: [string, React.ReactNode, boolean?][] = [
  ["Tab1", <div key="1">Tab1 content</div>],
  ["Tab2", <div key="2">Tab2 content</div>],
  ["Tab3", <div key="3">Tab3 content</div>, true],
];

describe("render TabGroup", () => {
  it("and check if tab nav is visible", () => {
    render(<TabGroup tabs={testTabs} defaultActiveTab={testTabs[0][0]} />);

    expect(screen.getByRole("button", { name: "Tab1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tab2" })).toBeInTheDocument();
  });

  it("and check if first tab has active class and content for tab 2 is not visible", () => {
    render(<TabGroup tabs={testTabs} defaultActiveTab={testTabs[0][0]} />);

    expect(screen.getByRole("button", { name: "Tab1" })).toHaveClass(
      "tabButton__active"
    );
    expect(screen.queryByText("Tab2 content")).toBeNull();
  });

  it("and active tab is changed on nav click", () => {
    render(<TabGroup tabs={testTabs} defaultActiveTab={testTabs[0][0]} />);

    expect(screen.getByRole("button", { name: "Tab1" })).toHaveClass(
      "tabButton__active"
    );

    expect(screen.getByText("Tab1 content")).toBeInTheDocument();
    expect(screen.queryByText("Tab2 content")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Tab2" }));

    expect(screen.queryByText("Tab1 content")).toBeNull();

    expect(screen.getByText("Tab2 content")).toBeInTheDocument();
  });

  it("and tab can be disabled", () => {
    render(<TabGroup tabs={testTabs} defaultActiveTab={testTabs[0][0]} />);

    expect(screen.getByRole("button", { name: "Tab3" })).toHaveClass(
      "tabButton__disabled"
    );

    expect(screen.getByRole("button", { name: "Tab3" })).toBeDisabled();
  });
});
