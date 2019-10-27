import React from "react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { loadTheme } from "office-ui-fabric-react";
import PropTypes from "prop-types";

const theme = loadTheme({
  palette: {
    themePrimary: "#dda7ea",
    themeLighterAlt: "#090709",
    themeLighter: "#231b26",
    themeLight: "#423246",
    themeTertiary: "#85648d",
    themeSecondary: "#c293ce",
    themeDarkAlt: "#e0afed",
    themeDark: "#e5bbef",
    themeDarker: "#ecccf4",
    neutralLighterAlt: "#44114a",
    neutralLighter: "#4b1552",
    neutralLight: "#561d5e",
    neutralQuaternaryAlt: "#5d2265",
    neutralQuaternary: "#63276b",
    neutralTertiaryAlt: "#7c3e84",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#3d0d43",
    primaryBackground: "#3d0d43",
    primaryText: "#ffffff",
    bodyBackground: "#3d0d43",
    bodyText: "#ffffff",
    disabledBackground: "#4b1552",
    disabledText: "#7c3e84"
  }
});

export const targetLanguages = {
  typescriptNodeClient: {
    label: "Typescript for Node Client",
    key: "typescript_nodeclient",
    monaco: "typescript",
    fileExt: "ts"
  },
  typescriptNodeServer: {
    label: "Typescript for Node Server",
    key: "typescript_nodeserver",
    monaco: "typescript",
    fileExt: "ts"
  },
  javaAndroid: {
    label: "Java for Android",
    key: "java_android",
    monaco: "java",
    fileExt: "java"
  },
  swiftIos: {
    label: "Swift for iOS",
    key: "swift_ios",
    monaco: "swift",
    fileExt: "swift"
  }
};

export const Header = props => {
  const handleOnClick = targetLanguage => {
    if (props.selectedTargetLanguage !== targetLanguage) {
      props.setSelectedTargetLanguage(targetLanguage);
      // props.compile();
    }
  };

  const getItems = () => {
    return [
      {
        key: "selectTargetLanguage",
        name: props.selectedTargetLanguage.label,
        iconProps: {
          iconName: "BullseyeTarget"
        },
        ariaLabel: "Select target language",
        subMenuProps: {
          items: [
            {
              key: targetLanguages.typescriptNodeClient.key,
              name: targetLanguages.typescriptNodeClient.label,
              iconProps: {
                iconName: "FileCode"
              },
              ["data-automation-id"]: "typescriptNodeClientButton",
              onClick: () => handleOnClick(targetLanguages.typescriptNodeClient)
            },
            {
              key: targetLanguages.typescriptNodeServer.key,
              name: targetLanguages.typescriptNodeServer.label,
              iconProps: {
                iconName: "FileCode"
              },
              ["data-automation-id"]: "typescriptNodeServerButton",
              onClick: () => handleOnClick(targetLanguages.typescriptNodeServer)
            },
            {
              key: targetLanguages.javaAndroid.key,
              name: targetLanguages.javaAndroid.label,
              iconProps: {
                iconName: "FileCode"
              },
              ["data-automation-id"]: "javaAndroidButton",
              onClick: () => handleOnClick(targetLanguages.javaAndroid)
            },
            {
              key: targetLanguages.swiftIos.key,
              name: targetLanguages.swiftIos.label,
              iconProps: {
                iconName: "FileCode"
              },
              ["data-automation-id"]: "swiftIosButton",
              onClick: () => handleOnClick(targetLanguages.swiftIos)
            }
          ]
        }
      }
    ];
  };

  return <CommandBar items={getItems()} theme={theme}></CommandBar>;
};

Header.propTypes = {
  selectedTargetLanguage: PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
    monaco: PropTypes.string
  }),
  setSelectedTargetLanguage: function(selectedTargetLanguage) {},
  compile: function() {}
};
