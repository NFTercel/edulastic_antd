import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconGraphRightArrow as IconRightArrow } from "@edulastic/icons";
import {
  ToolBtn,
  GroupToolBtn,
  DropdownMenu,
  Icon,
  ToolbarItemLabel,
  ToolbarItem,
  ToolbarItemIcon,
  DropdownArrowWrapper
} from "./styled";
import utils from "./utils";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: false
    };

    this.dropdownMenu = null;
  }

  toggleList = () => {
    const { listOpen } = this.state;

    if (!listOpen) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  handleOutsideClick = e => {
    const { listOpen } = this.state;
    if (!listOpen) return;

    // ignore clicks on the component itself
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }

    this.toggleList();
  };

  selectItem = tool => {
    const { resetThenSet } = this.props;

    this.setState(
      state => ({
        ...state
      }),
      resetThenSet(tool)
    );
    this.toggleList();
  };

  isActiveTool = tool => {
    const { currentTool } = this.props;
    const isIndexMatches = currentTool.index === tool.index;
    const isGroupIndexMatches = currentTool.groupIndex === tool.groupIndex;

    return isIndexMatches && isGroupIndexMatches;
  };

  getActiveOrDefaultToolName = () => {
    const { currentTool, list } = this.props;

    const activeTool = list.find(
      item => item.groupIndex === currentTool.groupIndex && item.index === currentTool.index
    );

    if (activeTool) {
      return activeTool.name;
    }

    return list[0].name;
  };

  render() {
    const { list, fontSize, getIconTemplate, currentTool } = this.props;
    const { listOpen } = this.state;
    const isToolGroupActive = currentTool.groupIndex === list[0].groupIndex;
    const additionalStyles = {
      width: fontSize + 2,
      height: fontSize + 2,
      color: ""
    };

    return (
      <ToolBtn
        style={{ position: "relative", width: fontSize > 20 ? 105 : 93 }}
        className={isToolGroupActive ? "active" : ""}
        key={Math.random().toString(36)}
      >
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">
            <ToolbarItem>
              <ToolbarItemIcon>{getIconTemplate(this.getActiveOrDefaultToolName(), additionalStyles)}</ToolbarItemIcon>
              <ToolbarItemLabel style={{ fontSize }}>
                {utils.capitalizeFirstLetter(this.getActiveOrDefaultToolName())}
              </ToolbarItemLabel>
            </ToolbarItem>

            <DropdownArrowWrapper>
              <IconRightArrow style={{ stroke: "none", color: "#cfcfcf", fill: "#cfcfcf" }} width={12} height={11} />
            </DropdownArrowWrapper>
          </div>
        </div>

        {listOpen && (
          <DropdownMenu
            innerRef={comp => {
              this.dropdownMenu = comp;
            }}
          >
            {list.map(uiTool => (
              <React.Fragment key={Math.random().toString(36)}>
                <GroupToolBtn
                  className={this.isActiveTool(uiTool) ? "active" : ""}
                  key={Math.random().toString(36)}
                  onClick={() => this.selectItem(uiTool)}
                  style={{ fontSize }}
                >
                  <Icon style={{ width: fontSize + 10 }}>
                    {getIconTemplate(uiTool.name, {
                      width: fontSize + 2,
                      height: fontSize + 2,
                      color: ""
                    })}
                  </Icon>
                  {utils.capitalizeFirstLetter(uiTool.name)}
                </GroupToolBtn>
              </React.Fragment>
            ))}
          </DropdownMenu>
        )}
      </ToolBtn>
    );
  }
}

Dropdown.propTypes = {
  list: PropTypes.array.isRequired,
  resetThenSet: PropTypes.func.isRequired,
  currentTool: PropTypes.object.isRequired,
  fontSize: PropTypes.number.isRequired,
  getIconTemplate: PropTypes.func.isRequired
};

export default Dropdown;
