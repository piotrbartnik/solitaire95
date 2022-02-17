import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextButton } from "../TextButton";

describe("render TextButton", () => {
  it("and check if it is visible", () => {
    const onClick = jest.fn();

    render(<TextButton onClickCallback={onClick} textId={0} label={"Test"} />);

    expect(screen.getByText("Test")).toBeVisible();
  });

  it("and click callback is called", () => {
    const onClick = jest.fn();

    render(<TextButton onClickCallback={onClick} textId={0} label={"Test"} />);

    fireEvent.click(screen.getByText("Test"));

    expect(onClick).toHaveBeenCalled();
  });

  it("and active button has active class", () => {
    const onClick = jest.fn();

    render(
      <TextButton
        onClickCallback={onClick}
        textId={0}
        selectedItem={0}
        label={"Test"}
      />
    );

    expect(screen.getByText("Test")).toHaveClass(
      "clickableText__textContainer--selected"
    );
  });
});
