import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";
import { CloseButton } from "../CloseButton";

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

  it("and it has active class on mouse down", () => {
    render(<Button text={"OK"} />);
    fireEvent.mouseDown(screen.getByText("OK"));

    expect(screen.getByText("OK").parentElement).toHaveClass("button--active");
    expect(screen.getByText("OK")).toHaveClass("button__activeBorder");
  });

  it("and it does not have active class on mouse down", () => {
    render(<Button text={"OK"} />);
    fireEvent.mouseUp(screen.getByText("OK"));

    expect(screen.getByText("OK").parentElement).not.toHaveClass(
      "button--active"
    );
    expect(screen.getByText("OK")).not.toHaveClass("button__activeBorder");
  });

  it("and it does not have active class on mouse leave", () => {
    render(<Button text={"OK"} />);
    fireEvent.mouseLeave(screen.getByText("OK"));

    expect(screen.getByText("OK").parentElement).not.toHaveClass(
      "button--active"
    );
    expect(screen.getByText("OK")).not.toHaveClass("button__activeBorder");
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

  it("and it has active class on mouse down", () => {
    const { container } = render(<CloseButton />);
    fireEvent.mouseDown(container.querySelector(".closeButton") as Element);

    expect(container.querySelector(".closeButton") as Element).toHaveClass(
      "button--active"
    );
    expect(
      (container.querySelector(".closeButton") as Element).firstChild
    ).toHaveClass("button__activeBorder");
  });

  it("and it does not have active class on mouse down", () => {
    const { container } = render(<CloseButton />);
    fireEvent.mouseUp(container.querySelector(".closeButton") as Element);

    expect(container.querySelector(".closeButton") as Element).not.toHaveClass(
      "button--active"
    );
    expect(
      (container.querySelector(".closeButton") as Element).firstChild
    ).not.toHaveClass("button__activeBorder");
  });

  it("and it does not have active class on mouse ;eave", () => {
    const { container } = render(<CloseButton />);
    fireEvent.mouseLeave(container.querySelector(".closeButton") as Element);

    expect(container.querySelector(".closeButton") as Element).not.toHaveClass(
      "button--active"
    );
    expect(
      (container.querySelector(".closeButton") as Element).firstChild
    ).not.toHaveClass("button__activeBorder");
  });
});
