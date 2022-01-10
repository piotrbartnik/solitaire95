import React, { useCallback } from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { ToggleWindowType } from "../../../store/actions/actionTypes";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow } from "../../ui-components";
import { HelpTabs } from "../HelpTabs/HelpTabs";

export type HelpTopicsStateTypes = {
  isWindowVisible?: boolean;
};

export type HelpTopicsDispatchTypes = {
  toggleHelpWindow: ToggleWindowType;
};

const HelpTopicsInternal: React.FC<
  HelpTopicsDispatchTypes & HelpTopicsStateTypes
> = (props) => {
  const { isWindowVisible, toggleHelpWindow } = props;

  const okOnClick = () => {
    toggleHelpWindow(false, "helpTopicsWindow");
  };

  const closeButtonActionCallback = useCallback(
    () => toggleHelpWindow(false, "helpTopicsWindow"),
    [toggleHelpWindow]
  );

  return (
    <SettingsWindow
      windowTitle={"Help Topics: Solitaire Help"}
      buttons={[
        {
          text: (
            <>
              <span>D</span>isplay
            </>
          ),
          onClick: okOnClick,
        },
        {
          text: (
            <>
              <span>P</span>rint
            </>
          ),
          onClick: okOnClick,
        },
        { text: "Cancel", onClick: okOnClick },
      ]}
      visible={isWindowVisible as boolean}
      closeButtonAction={closeButtonActionCallback}
      width={528}
      height={600}
    >
      <HelpTabs />
    </SettingsWindow>
  );
};

const mapStateToProps = (state: { toggleWindows: WindowsState }) => ({
  isWindowVisible: state.toggleWindows.helpTopicsWindow,
});

const mapDispatchToProps = {
  toggleHelpWindow: toggleWindow,
};

export const HelpTopics = connect<
  HelpTopicsStateTypes,
  HelpTopicsDispatchTypes
>(
  mapStateToProps,
  mapDispatchToProps
)(HelpTopicsInternal);
