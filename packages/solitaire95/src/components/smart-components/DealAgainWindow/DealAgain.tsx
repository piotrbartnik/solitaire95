import React from "react";
import { connect } from "react-redux";
import { dealCards, toggleWindow } from "../../../store/actions/";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";

export type DealAgainStateTypes = {
  isWindowVisible: boolean;
};
export type DealAgainDispatchTypes = {
  toggleAboutWindow: (windowState: boolean, windowToToggle: string) => void;
  dealCards: () => void;
};

const DealAgainInternal: React.FC<
  DealAgainDispatchTypes & DealAgainStateTypes
> = (props) => {
  const { dealCards, isWindowVisible } = props;

  const dealWindowPositionX = window.innerWidth;
  const dealWindowPositionY = window.innerHeight;

  return (
    <SettingsWindow
      windowTitle={"Solitaire"}
      buttons={[
        { text: "Yes", onClick: dealCards },
        { text: "No", onClick: dealCards },
      ]}
      visible={isWindowVisible}
      width={"350px"}
      height={"200px"}
      positionOnWindow={[
        dealWindowPositionY / 2 - 100,
        dealWindowPositionX / 2 - 175,
      ]}
    >
      Deal again?
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => {
  return {
    isWindowVisible: state.toggleWindows.dealAgainWindow,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    dealCards: () => dispatch(dealCards()),
    toggleAboutWindow: (windowState: boolean, windowToToggle: string) =>
      dispatch(toggleWindow(windowState, windowToToggle)),
  };
};

export const DealAgain = connect<DealAgainStateTypes, DealAgainDispatchTypes>(
  mapStateToProps,
  mapDispatchToProps
)(DealAgainInternal);
