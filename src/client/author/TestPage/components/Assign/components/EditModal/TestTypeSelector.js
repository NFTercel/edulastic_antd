import React from "react";
import { Select } from "antd";
import { Col } from "antd";
import { test } from "@edulastic/constants";
import { StyledRow, StyledRowLabel, TestTypeDropDown } from "./styled";
const { type } = test;
const { ASSESSMENT, PRACTICE } = type;
const testTypes = {
  [ASSESSMENT]: "Asessment",
  [PRACTICE]: "Practice"
};

const generateReport = {
  YES: {
    val: "Yes",
    type: true
  },
  NO: {
    val: "No",
    type: false
  }
};

const TestTypeSelector = ({ testType, onAssignmentTypeChange, isGenerateReport, onGenerateReportFieldChange }) => {
  return (
    <React.Fragment>
      <StyledRowLabel gutter={16} />
      <StyledRow gutter={16}>
        <Col span={12}>
          <StyledRowLabel>
            <Col span={24}>Test Type</Col>
          </StyledRowLabel>
          <StyledRow>
            <Col span={24}>
              <TestTypeDropDown defaultValue={testType} onChange={value => onAssignmentTypeChange(value)}>
                {Object.keys(testTypes).map(key => (
                  <Select.Option key={key} value={key}>
                    {testTypes[key]}
                  </Select.Option>
                ))}
              </TestTypeDropDown>
            </Col>
          </StyledRow>
        </Col>
        <Col span={12}>
          {testType === PRACTICE && (
            <React.Fragment>
              <StyledRowLabel>
                <Col span={24}>Generate Report</Col>
              </StyledRowLabel>
              <StyledRow>
                <Col span={24}>
                  <TestTypeDropDown defaultValue={isGenerateReport} onChange={onGenerateReportFieldChange}>
                    {Object.keys(generateReport).map(key => (
                      <Select.Option key={key} value={generateReport[key].type}>
                        {generateReport[key].val}
                      </Select.Option>
                    ))}
                  </TestTypeDropDown>
                </Col>
              </StyledRow>
            </React.Fragment>
          )}
        </Col>
      </StyledRow>
    </React.Fragment>
  );
};

export default TestTypeSelector;
