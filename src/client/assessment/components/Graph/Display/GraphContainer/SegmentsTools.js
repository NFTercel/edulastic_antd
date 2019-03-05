import React from "react";
import PropTypes from "prop-types";
import { GraphToolbar, SegmentsToolBtn, SegmentsToolbarItem, ToolbarItemIcon } from "./styled";

const SegmentsTools = ({
  tool,
  onSelect,
  fontSize,
  getIconByToolName,
  graphType,
  responsesAllowed,
  elementsNumber
}) => {
  const segmentsTools = [
    "segmentsPoint",
    "bothIncludedSegment",
    "bothNotIncludedSegment",
    "onlyRightIncludedSegment",
    "onlyLeftIncludedSegment",
    "infinityToIncludedSegment",
    "includedToInfinitySegment",
    "infinityToNotIncludedSegment",
    "notIncludedToInfinitySegment",
    "trash"
  ];

  const uiTools = segmentsTools.map((tool, index) => ({
    name: tool,
    index,
    groupIndex: -1
  }));

  const isActive = uiTool => uiTool.index === tool.index && uiTool.groupIndex === tool.groupIndex;

  const getToolClassName = uiTool => {
    if (uiTool.name === "trash") {
      if (isActive(uiTool)) {
        return "active";
      } else {
        return "";
      }
    } else {
      if (elementsNumber >= responsesAllowed) {
        return "disabled";
      } else {
        if (isActive(uiTool)) {
          return "active";
        } else {
          return "";
        }
      }
    }
  };

  const getToolClickHandler = uiTool => {
    if (uiTool.name === "trash") {
      return () => onSelect(uiTool, graphType, responsesAllowed);
    } else {
      if (elementsNumber >= responsesAllowed) {
        return null;
      } else {
        return () => onSelect(uiTool, graphType, responsesAllowed);
      }
    }
  };

  const getIconTemplate = (toolName = "point", options) => getIconByToolName(toolName, options);
  console.log("Elements number: ", elementsNumber);
  return (
    <GraphToolbar fontSize={fontSize}>
      {uiTools.map(
        uiTool =>
          !uiTool.group && (
            <SegmentsToolBtn
              style={{ width: fontSize > 20 ? 105 : 93 }}
              className={getToolClassName(uiTool)}
              onClick={getToolClickHandler(uiTool)}
              key={Math.random().toString(36)}
            >
              <SegmentsToolbarItem>
                <ToolbarItemIcon className="tool-btn-icon" style={{ marginBottom: fontSize / 2 }}>
                  {getIconTemplate(uiTool.name, {
                    width: fontSize + 2,
                    height: fontSize + 2,
                    color: ""
                  })}
                </ToolbarItemIcon>
              </SegmentsToolbarItem>
            </SegmentsToolBtn>
          )
      )}
    </GraphToolbar>
  );
};

SegmentsTools.propTypes = {
  tool: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  graphType: PropTypes.string.isRequired,
  responsesAllowed: PropTypes.number.isRequired,
  getIconByToolName: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  fontSize: PropTypes.number
};

SegmentsTools.defaultProps = {
  fontSize: 14,
  tool: {
    toolIndex: 0,
    innerIndex: 0,
    toolName: "segmentsPoint"
  }
};

export default SegmentsTools;
