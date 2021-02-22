import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";
import CloseButton from "../CloseButton";

describe("render Button", () => {
  it("and check if it has text on it rendered", () => {
    render(<Button text={"OK"} />);
    expect(screen.getByText("OK")).toBeVisible();
  });

  it("and it can be clicked", () => {
    const clickMock = jest.fn();
    render(<Button text={"OK"} onClick={clickMock} />);
    fireEvent.click(screen.getByText("OK"));

    expect(clickMock).toHaveBeenCalled();
  });
});

describe("render CloseButton", () => {
  it("and check if it has text on it rendered", () => {
    const { container } = render(<CloseButton />);
    expect(container.querySelector(".closeButton")).toBeVisible();
  });

  it("and it can be clicked", () => {
    const clickMock = jest.fn();
    const { container } = render(<CloseButton onClick={clickMock} />);
    fireEvent.click(container.querySelector(".closeButton") as Element);

    expect(clickMock).toHaveBeenCalled();
  });
});
