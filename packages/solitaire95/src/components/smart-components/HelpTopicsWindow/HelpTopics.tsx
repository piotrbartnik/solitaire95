import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { toggleWindow } from "../../../store/actions/";
import { ToggleWindowType } from "../../../store/actions/actionTypes";
import { WindowsState } from "../../../store/reducers/";
import { SettingsWindow, TabGroup } from "../../ui-components";
import { ContentsTab } from "./HelpTopicsTabs/ContentsTab";
import { IndexTab } from "./HelpTopicsTabs/IndexTab";
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
  const [helpTextWindowVisible, setHelpTextWindowVisible] = useState(false);

  const toggleOffTextWindow = () => setHelpTextWindowVisible(false);

  const okOnClick = () => {
    toggleHelpWindow(false, "helpTopicsWindow");
  };

  const displayOnClick = () => {
    if (activeContentsHelp) {
      setHelpTextWindowVisible(true);
    }
  };

  const closeButtonActionCallback = useCallback(
    () => toggleHelpWindow(false, "helpTopicsWindow"),
    [toggleHelpWindow]
  );

  const notifyParentCallback = useCallback(
    (activeTab) => setActiveContentTab(activeTab),
    []
  );

  const tabs: [string, React.ReactNode, boolean?][] = [
    [
      "Contents",
      <ContentsTab key="Contents Tab" notifyParent={notifyParentCallback} />,
    ],
    ["Index", <IndexTab key="Index" notifyParent={notifyParentCallback} />],
    ["Find", "Find", true],
  ];

  return (
    <>
      <SettingsWindow
        windowTitle={"Help Topics: Solitaire Help"}
        buttons={[
          {
            text: "Display",
            onClick: displayOnClick,
            underscoredLetter: 0,
          },
          {
            text: "Print",
            onClick: okOnClick,
            underscoredLetter: 0,
            disabled: true,
          },
          { text: "Cancel", onClick: okOnClick },
        ]}
        visible={isWindowVisible as boolean}
        closeButtonAction={closeButtonActionCallback}
        width={600}
        height={600}
        topBarGreyetOut={helpTextWindowVisible}
      >
        <TabGroup tabs={tabs} defaultActiveTab="Contents" />
      </SettingsWindow>
      {helpTextWindowVisible && (
        <HelpTopicsTextWindow
          helpToDisplay={activeContentsHelp}
          toggleOffTextWindow={toggleOffTextWindow}
        />
      )}
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
