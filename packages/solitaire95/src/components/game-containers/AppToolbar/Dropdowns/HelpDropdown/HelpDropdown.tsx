import React from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../../../store/actions/";
import { ToggleWindowType } from "../../../../../store/actions/actionTypes";
import { ToolButton, Separator } from "../../../../ui-components";

type HelpDropdownDispatchTypes = {
  toggleAboutWindow: ToggleWindowType;
};

type HelpDropdownPropTypes = {
  setHelpVisible: (prevState: boolean) => void;
  setBottomBarText: (text: string) => void;
};

const HelpDropdownInternal: React.VFC<
  HelpDropdownDispatchTypes & HelpDropdownPropTypes
> = ({ toggleAboutWindow, setHelpVisible, setBottomBarText }) => (
  <>
    <ToolButton
      onMouseOver={() => setBottomBarText("Index of Solitaire help topics")}
      onMouseLeave={() => setBottomBarText("")}
      onClick={() => {
        toggleAboutWindow(true, "helpTopicsWindow");
        setHelpVisible(false);
      }}
      text={
        <>
          <span>H</span>elp Topics
        </>
      }
      label="Help Topics"
    />
    <Separator />
    <ToolButton
      onMouseOver={() => setBottomBarText("About Solitaire")}
      onMouseLeave={() => setBottomBarText("")}
      onClick={() => {
        toggleAboutWindow(true, "aboutWindow");
        setHelpVisible(false);
      }}
      text={
        <>
          <span>A</span>bout
        </>
      }
      label="About"
    />
  </>
);

const mapDispatchToProps = {
  toggleAboutWindow: toggleWindow,
};

export const HelpDropdown = connect<
  undefined,
  HelpDropdownDispatchTypes,
  HelpDropdownPropTypes
>(
  undefined,
  mapDispatchToProps
)(HelpDropdownInternal);
