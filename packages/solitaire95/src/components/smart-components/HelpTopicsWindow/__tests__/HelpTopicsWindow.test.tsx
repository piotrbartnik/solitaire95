import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { reduxRtlWrapper, dndWrapper } from "../../../../helpers/testHelpers";
import { HelpTopics } from "../HelpTopics";

const helpWindowVisibleState = {
  toggleWindows: { helpTopicsWindow: true },
};

describe("render HelpTopics", () => {
  it("and check if tab navs are visible", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    expect(
      screen.getByRole("button", { name: "Contents" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Index" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Find" })).toBeInTheDocument();
  });

  it("and can be closed with x button", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    expect(
      screen.getByRole("button", { name: "Contents" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Index" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Find" })).toBeInTheDocument();

    userEvent.click(
      screen.getByRole("button", {
        name: "Help Topics: Solitaire Help close button",
      })
    );

    expect(screen.queryByRole("button", { name: "Contents" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Index" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Find" })).toBeNull();
  });

  it("and contents tab is visible as default", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    expect(
      screen.getByText(
        "Click a topic, and then click Display. Or click another tab, such as Index."
      )
    ).toBeVisible();

    expect(
      screen.getByRole("button", { name: "How to play Solitaire" })
    ).toBeVisible();

    expect(
      screen.getByRole("button", { name: "Scoring information" })
    ).toBeVisible();
  });

  it("and how to play solitaire window can be opened", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(
      screen.getByRole("button", { name: "How to play Solitaire" })
    );

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(
      screen.getByText("To play Solitaire: starting the game")
    ).toBeVisible();
  });

  it("and scoring window can be opened", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(
      screen.getByRole("button", { name: "Scoring information" })
    );

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(screen.getByText("To choose a scoring system")).toBeVisible();
  });

  it("and index tab can be turned on", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    expect(
      screen.getByText(
        "Click a topic, and then click Display. Or click another tab, such as Index."
      )
    ).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    expect(
      screen.queryAllByText(
        "Click a topic, and then click Display. Or click another tab, such as Index."
      )
    ).toHaveLength(0);

    expect(
      screen.getByText(
        /Type the first few letters of the word you're looking for/
      )
    ).toBeVisible();

    expect(
      screen.getByText(
        /Click the index entry you want, and then click Display./
      )
    ).toBeVisible();

    expect(screen.getByRole("button", { name: "how to play" })).toBeVisible();

    expect(screen.getByRole("button", { name: "scoring" })).toBeVisible();
  });

  it("and find tab can not be turned on", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    expect(
      screen.getByText(
        "Click a topic, and then click Display. Or click another tab, such as Index."
      )
    ).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "Find" }));

    expect(
      screen.getByText(
        "Click a topic, and then click Display. Or click another tab, such as Index."
      )
    ).toBeVisible();
  });

  it("and index search can be typed and it selects the help topics", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.type(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      }),
      "sc"
    );

    expect(screen.getByRole("button", { name: "scoring" })).toHaveClass(
      "clickableText__textContainer--selected"
    );

    userEvent.clear(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      })
    );

    userEvent.type(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      }),
      "ho"
    );

    expect(screen.getByRole("button", { name: "how to play" })).toHaveClass(
      "clickableText__textContainer--selected"
    );
  });

  it("and solitaire how to play help can be opened from index search", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.type(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      }),
      "ho"
    );

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(
      screen.getByText("To play Solitaire: starting the game")
    ).toBeVisible();
  });

  it("and scoring window can be opened from index search", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.type(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      }),
      "sc"
    );

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(screen.getByText("To choose a scoring system")).toBeVisible();
  });

  it("and solitaire how to play help can be opened from index text button", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.click(screen.getByRole("button", { name: "how to play" }));

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(
      screen.getByText("To play Solitaire: starting the game")
    ).toBeVisible();
  });

  it("and scoring window can be opened from index text button", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.click(screen.getByRole("button", { name: "scoring" }));

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(screen.getByText("To choose a scoring system")).toBeVisible();
  });

  it("and scoring window can be closed with x click", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.click(screen.getByRole("button", { name: "scoring" }));

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(screen.getByText("To choose a scoring system")).toBeVisible();

    userEvent.click(
      screen.getByRole("button", { name: "Solitaire Help close button" })
    );

    expect(screen.queryByText("To choose a scoring system")).toBeNull();
  });

  it("and solitaire help window can be closed with x click", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.click(screen.getByRole("button", { name: "how to play" }));

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    expect(
      screen.getByText("To play Solitaire: starting the game")
    ).toBeVisible();

    userEvent.click(
      screen.getByRole("button", { name: "Solitaire Help close button" })
    );

    expect(
      screen.queryByText("To play Solitaire: starting the game")
    ).toBeNull();
  });

  it("additional info winows for how to play solitaire are opened", () => {
    reduxRtlWrapper(dndWrapper(<HelpTopics />), helpWindowVisibleState);

    userEvent.click(screen.getByRole("button", { name: "Index" }));

    userEvent.type(
      screen.getByRole("textbox", {
        name: "Type the first few letters of the word you are looking for.",
      }),
      "ho"
    );

    userEvent.click(screen.getByRole("button", { name: "Display" }));

    userEvent.hover(screen.getAllByText(/row stacks/)[1]);

    expect(
      screen.getByText(
        /Cards are stacked in descending order, alternating between red cards and/
      )
    ).toBeVisible();

    userEvent.unhover(screen.getAllByText(/row stacks/)[1]);

    expect(
      screen.queryAllByText(
        /Cards are stacked in descending order, alternating between red cards and/
      )
    ).toHaveLength(0);

    userEvent.hover(screen.getAllByText(/suit stacks/)[1]);

    expect(
      screen.getByText(
        /Cards are stacked in the four areas at the top right of the screen in/
      )
    ).toBeVisible();

    userEvent.unhover(screen.getAllByText(/suit stacks/)[1]);

    expect(
      screen.queryAllByText(
        /Cards are stacked in the four areas at the top right of the screen in/
      )
    ).toHaveLength(0);
  });
});
