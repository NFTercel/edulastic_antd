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
  elementsNumber,
  toolbar
}) => {
  const segmentsTools = [
    "segments_point",
    "segment_both_point_included",
    "segment_both_points_hollow",
    "segment_left_point_hollow",
    "segment_right_point_hollow",
    "ray_left_direction",
    "ray_right_direction",
    "ray_left_direction_right_hollow",
    "ray_right_direction_left_hollow"
  ];

  const uiTools =
    toolbar.length > 0
      ? toolbar.map((tool, index) => ({
          name: tool,
          index,
          groupIndex: -1
        }))
      : segmentsTools.map((tool, index) => ({
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
      <SegmentsToolBtn
        style={{ width: fontSize > 20 ? 105 : 93, marginLeft: "auto" }}
        className={getToolClassName({ name: "trash", groupIndex: -1, index: uiTools.length })}
        onClick={getToolClickHandler({ name: "trash", groupIndex: -1, index: uiTools.length })}
      >
        <SegmentsToolbarItem>
          <ToolbarItemIcon className="tool-btn-icon" style={{ marginBottom: fontSize / 2 }}>
            {getIconTemplate("trash", {
              width: fontSize + 2,
              height: fontSize + 2,
              color: ""
            })}
          </ToolbarItemIcon>
        </SegmentsToolbarItem>
      </SegmentsToolBtn>
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
