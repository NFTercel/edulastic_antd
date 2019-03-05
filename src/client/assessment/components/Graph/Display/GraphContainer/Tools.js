import React from "react";
import PropTypes from "prop-types";
import { IconGraphClear as IconClear } from "@edulastic/icons";
import {
  GraphToolbar,
  ToolbarLeft,
  ToolbarRight,
  ToolBtn,
  ToolbarItem,
  ToolbarItemLabel,
  ToolbarItemIcon
} from "./styled";
import Dropdown from "./Dropdown";
import utils from "./utils";

export default function Tools(props) {
  const { tools, tool, onSelect, onReset, fontSize, getIconByToolName } = props;

  const uiTools = tools.map((_tool, index) => {
    if (Array.isArray(_tool)) {
      const group = _tool.map((item, toolInnerIndex) => ({
        name: item,
        index: toolInnerIndex,
        groupIndex: index
      }));

      return { group };
    }

    return {
      name: _tool,
      index,
      groupIndex: -1
    };
  });

  const isActive = uiTool => uiTool.index === tool.index && uiTool.groupIndex === tool.groupIndex;

  const resetThenSet = newTool => {
    onSelect(newTool);
  };

  const getIconTemplate = (toolName = "point", options) => getIconByToolName(toolName.toLowerCase(), options);
  return (
    <GraphToolbar fontSize={fontSize}>
      <ToolbarLeft>
        {uiTools.map(
          uiTool =>
            !uiTool.group && (
              <ToolBtn
                style={{ width: fontSize > 20 ? 105 : 93 }}
                className={isActive(uiTool) ? "active" : ""}
                onClick={() => onSelect(uiTool)}
                key={Math.random().toString(36)}
              >
                <ToolbarItem>
                  <ToolbarItemIcon className="tool-btn-icon" style={{ marginBottom: fontSize / 2 }}>
                    {getIconTemplate(uiTool.name, {
                      width: fontSize + 2,
                      height: fontSize + 2,
                      color: ""
                    })}
                  </ToolbarItemIcon>
                  <ToolbarItemLabel style={{ fontSize }}>{utils.capitalizeFirstLetter(uiTool.name)}</ToolbarItemLabel>
                </ToolbarItem>
              </ToolBtn>
            )
        )}
        {uiTools.map(uiTool =>
          uiTool.group
            ? uiTool.group[0] && (
                <Dropdown
                  key={Math.random().toString(36)}
                  list={uiTool.group}
                  resetThenSet={resetThenSet}
                  currentTool={tool}
                  fontSize={fontSize}
                  getIconTemplate={getIconTemplate}
                />
              )
            : null
        )}
      </ToolbarLeft>

      <ToolbarRight>
        {
          <ToolBtn onClick={onReset} style={{ width: fontSize > 20 ? 105 : 93 }}>
            <ToolbarItem>
              <ToolbarItemIcon style={{ marginBottom: fontSize / 2 }}>
                <IconClear
                  width={fontSize + 2}
                  height={fontSize}
                  style={{
                    color: "#4aac8b",
                    fill: "#4aac8b",
                    stroke: "#4aac8b"
                  }}
                />
              </ToolbarItemIcon>
              <ToolbarItemLabel style={{ fontSize }} color="#4aac8b">
                Clear
              </ToolbarItemLabel>
            </ToolbarItem>
          </ToolBtn>
        }
      </ToolbarRight>
    </GraphToolbar>
  );
}

Tools.propTypes = {
  tool: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tools: PropTypes.array,
  getIconByToolName: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  fontSize: PropTypes.number
};

Tools.defaultProps = {
  tools: [],
  fontSize: 14,
  tool: {
    toolIndex: 0,
    innerIndex: 0,
    toolName: "point"
  }
};
