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

class SegmentsToolsSettings extends Component {
  controls = [
    { value: "segmentsPoint", label: "Point" },
    { value: "bothIncludedSegment", label: "Segment" },
    { value: "bothNotIncludedSegment", label: "Segment with both hollow points" },
    { value: "onlyRightIncludedSegment", label: "Segment with left hollow point" },
    { value: "onlyLeftIncludedSegment", label: "Segment with right hollow point" },
    { value: "infinityToIncludedSegment", label: "Left ray" },
    { value: "includedToInfinitySegment", label: "Right ray" },
    { value: "infinityToNotIncludedSegment", label: "Left ray with hollow point" },
    { value: "notIncludedToInfinitySegment", label: "Right ray with hollow point" }
  ];

  addTool = groupIndex => {
    const { toolbar, onChange } = this.props;
    const newTools = [...toolbar.tools];
    const areToolsArray = Array.isArray(toolbar.tools[groupIndex]);
    const defaultOption = this.controls && this.controls[0] ? this.controls[0].value : "";

    if (toolbar.tools.length <= 3) {
      if (groupIndex !== undefined && areToolsArray) {
        newTools[groupIndex].push(defaultOption);
      } else {
        newTools.push(defaultOption);
      }

      onChange({
        ...toolbar,
        tools: newTools
      });
    }
  };

  deleteTool = (index, groupIndex) => {
    const { toolbar, onChange } = this.props;

    const newTools = [...toolbar.tools];
    const areToolsArray = Array.isArray(toolbar.tools[groupIndex]);

    if (groupIndex !== undefined && areToolsArray) {
      newTools[groupIndex].splice(index, 1);
    } else {
      newTools.splice(index, 1);
    }

    onChange({
      ...toolbar,
      tools: newTools
    });
  };

  handleSelect = (index, newItemVal, groupIndex) => {
    const { toolbar, onChange } = this.props;

    const newTools = [...toolbar.tools];

    if (groupIndex !== undefined) {
      newTools[groupIndex][index] = newItemVal;
    } else {
      newTools[index] = newItemVal;
    }

    onChange({
      ...toolbar,
      tools: newTools
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
    const { toolbar } = this.props;
    const countOfSingleTools = toolbar.tools.filter(t => !Array.isArray(t)).length;

    return (
      <Col paddingRight="2.5em" md={6} marginBottom={countOfSingleTools > 0 ? 20 : 0}>
        {toolbar.tools.map((tool, i) =>
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
          <MoreOptionsSubHeading>{t("Toolbar")}</MoreOptionsSubHeading>

          <MoreOptionsRow>
            <GraphToolsParamsWrapper>{this.renderSingleToolsInDefaultGroup()}</GraphToolsParamsWrapper>
          </MoreOptionsRow>
        </MoreOptionsContainer>
      </Fragment>
    );
  }
}

SegmentsToolsSettings.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  toolbar: PropTypes.object.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(SegmentsToolsSettings);

const Tool = props => {
  const {
    countOfSingleTools,
    options,
    isGroup,
    groupIndex,
    value,
    onChange,
    selectWidth,
    index,
    onDelete,
    deleteToolStyles
  } = props;

  const isNeedToShowDeleteButton = () => countOfSingleTools > 0 || isGroup;

  const onSelectChange = val => {
    onChange(index, val, groupIndex);
  };

  return (
    <React.Fragment>
      <SelectWrapper>
        <Select style={{ width: selectWidth || "70%" }} onChange={onSelectChange} options={options} value={value} />

        {isNeedToShowDeleteButton() && (
          <DeleteButton
            onDelete={() => {
              onDelete(index, groupIndex);
            }}
            deleteToolStyles={deleteToolStyles}
          />
        )}
      </SelectWrapper>
    </React.Fragment>
  );
};

Tool.propTypes = {
  countOfSingleTools: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  isGroup: PropTypes.bool,
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
  groupIndex: undefined,
  isGroup: false
};
