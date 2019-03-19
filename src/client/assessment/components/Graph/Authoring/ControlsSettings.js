import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Button, Select } from "@edulastic/common";
import {
  MoreOptionsContainer,
  MoreOptionsRow,
  MoreOptionsSubHeading,
  Row,
  Col,
  SelectWrapper,
  GraphToolsParamsWrapper,
  AddToolBtnWrapper,
  ToolSelect
} from "../common/styled_components";
import DeleteButton from "../common/DeleteButton";

class ControlsSettings extends Component {
  controls = [{ label: "Undo", value: "undo" }, { label: "Redo", value: "redo" }, { label: "Reset", value: "reset" }];

  addTool = groupIndex => {
    const { controlbar, onChange } = this.props;
    const newTools = [...controlbar.controls];
    const areToolsArray = Array.isArray(controlbar.controls[groupIndex]);
    const defaultOption = this.controls && this.controls[0] ? this.controls[0].value : "";

    if (controlbar.controls.length <= 3) {
      if (groupIndex !== undefined && areToolsArray) {
        newTools[groupIndex].push(defaultOption);
      } else {
        newTools.push(defaultOption);
      }

      onChange({
        ...toolbar,
        controls: newTools
      });
    }
  };

  deleteTool = (index, groupIndex) => {
    const { controlbar, onChange } = this.props;

    const newTools = [...controlbar.controls];
    const areToolsArray = Array.isArray(controlbar.controls[groupIndex]);

    if (groupIndex !== undefined && areToolsArray) {
      newTools[groupIndex].splice(index, 1);
    } else {
      newTools.splice(index, 1);
    }

    onChange({
      ...toolbar,
      controls: newTools
    });
  };

  handleSelect = (index, newItemVal, groupIndex) => {
    const { controlbar, onChange } = this.props;

    const newTools = [...controlbar.controls];

    if (groupIndex !== undefined) {
      newTools[groupIndex][index] = newItemVal;
    } else {
      newTools[index] = newItemVal;
    }

    onChange({
      ...toolbar,
      controls: newTools
    });
  };

  renderAddToolBtn = groupIndex => (
    <Row>
      <Button
        style={{
          minWidth: 227,
          minHeight: 40,
          marginRight: "0.7em",
          borderRadius: "4px"
        }}
        onClick={() => this.addTool(groupIndex)}
        color="primary"
        outlined
      >
        ADD TOOL
      </Button>
    </Row>
  );

  renderSingleToolsInDefaultGroup = () => {
    const { controlbar } = this.props;
    const countOfSingleTools = controlbar.controls.filter(t => !Array.isArray(t)).length;

    return (
      <Col paddingRight="2.5em" md={6} marginBottom={20}>
        {controlbar.controls.map((tool, i) =>
          !Array.isArray(tool) ? (
            <React.Fragment key={`${i}-${Math.random().toString(36)}`}>
              <ToolSelect>
                <Tool
                  value={tool}
                  options={this.controls}
                  selectWidth="100%"
                  index={i}
                  countOfSingleTools={countOfSingleTools}
                  onDelete={this.deleteTool}
                  onChange={this.handleSelect}
                />
              </ToolSelect>
            </React.Fragment>
          ) : null
        )}

        <AddToolBtnWrapper>{this.renderAddToolBtn()}</AddToolBtnWrapper>
      </Col>
    );
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <MoreOptionsContainer>
          <MoreOptionsSubHeading>Controls</MoreOptionsSubHeading>

          <MoreOptionsRow>
            <GraphToolsParamsWrapper>{this.renderSingleToolsInDefaultGroup()}</GraphToolsParamsWrapper>
          </MoreOptionsRow>
        </MoreOptionsContainer>
      </Fragment>
    );
  }
}

ControlsSettings.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  controlbar: PropTypes.object.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(ControlsSettings);

const Tool = props => {
  const {
    // countOfSingleTools,
    options,
    // isGroup,
    groupIndex,
    value,
    onChange,
    selectWidth,
    index,
    onDelete,
    deleteToolStyles
  } = props;

  // const isNeedToShowDeleteButton = () => countOfSingleTools > 1 || isGroup;

  const onSelectChange = val => {
    onChange(index, val, groupIndex);
  };

  return (
    <React.Fragment>
      <SelectWrapper>
        <Select style={{ width: selectWidth || "70%" }} onChange={onSelectChange} options={options} value={value} />

        {/* {isNeedToShowDeleteButton() && ( */}
        <DeleteButton
          onDelete={() => {
            onDelete(index, groupIndex);
          }}
          deleteToolStyles={deleteToolStyles}
        />
        {/* )} */}
      </SelectWrapper>
    </React.Fragment>
  );
};

Tool.propTypes = {
  // countOfSingleTools: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  // isGroup: PropTypes.bool,
  groupIndex: PropTypes.number,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  selectWidth: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleteToolStyles: PropTypes.object
};

Tool.defaultProps = {
  deleteToolStyles: {},
  groupIndex: undefined
  // isGroup: false
};
