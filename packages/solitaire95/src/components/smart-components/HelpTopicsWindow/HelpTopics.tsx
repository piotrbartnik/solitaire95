import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { ToggleWindowType } from "../../../store/actions/actionTypes";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow, TabGroup } from "../../ui-components";
import { ContentsTab } from "./HelpTopicsTabs/ContentsTab";
import { HelpTopicsTextWindow } from "./HelpTopicsTextWindow/HelpTopicsTextWindow";

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
  const [activeContentsHelp, setActiveContentTab] = useState<string>();

  console.log(activeContentsHelp);

  const okOnClick = () => {
    toggleHelpWindow(false, "helpTopicsWindow");
  };

  const displayOnClick = () => {
    if (activeContentsHelp) {
      console.log(activeContentsHelp);
      toggleHelpWindow(false, "helpTopicsWindow");
    }
  };

  const closeButtonActionCallback = useCallback(
    () => toggleHelpWindow(false, "helpTopicsWindow"),
    [toggleHelpWindow]
  );

  const tabs: [string, React.ReactNode][] = [
    [
      "Contents",
      <ContentsTab
        key="Contents Tab"
        notifyParent={(a) => setActiveContentTab(a)}
      />,
    ],
    ["Index", "index"],
    ["Find", "Find"],
  ];

  return (
    <>
      <SettingsWindow
        windowTitle={"Help Topics: Solitaire Help"}
        buttons={[
          {
            text: (
              <>
                <span>D</span>isplay
              </>
            ),
            onClick: displayOnClick,
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
        width={600}
        height={600}
      >
        <TabGroup tabs={tabs} defaultActiveTab="Contents" />
      </SettingsWindow>
      <HelpTopicsTextWindow />
    </>
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
