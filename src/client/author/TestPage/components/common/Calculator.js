import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { white } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import { Select } from "antd";

import Summary from "./Summary";
import selectsData from "./selectsData";

const Calculator = ({
  totalPoints,
  questionsCount,
  grades,
  subjects,
  onChangeGrade,
  onChangeSubjects,
  tableData,
  children,
  windowWidth
}) => (
  <Container windowWidth={windowWidth}>
    {children}

    <div>
      <Item>
        <Title>Grade</Title>
        <Select
          mode="multiple"
          size="large"
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={grades}
          onChange={onChangeGrade}
        >
          {selectsData.allGrades.map(({ value, text }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>

      <Item>
        <Title>Subject</Title>
        <Select
          mode="multiple"
          size="large"
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={subjects}
          onChange={onChangeSubjects}
        >
          {selectsData.allSubjects.map(({ value, text }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>

      <Title>Summary</Title>
      <Summary total={totalPoints} questionsCount={questionsCount} tableData={tableData} />
    </div>
  </Container>
);

Calculator.propTypes = {
  totalPoints: PropTypes.number.isRequired,
  grades: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  onChangeGrade: PropTypes.func.isRequired,
  onChangeSubjects: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
  questionsCount: PropTypes.any.isRequired,
  windowWidth: PropTypes.number.isRequired,
  children: PropTypes.any
};

Calculator.defaultProps = {
  children: null
};

export default Calculator;

const Container = styled.div`
  padding: ${props => (props.windowWidth < 468 ? "15px 5px 15px 0px" : "15px")};
  background: ${white};

  .ant-table-body {
    font-size: 13px;
    font-weight: 600;
  }
`;

const Item = styled(FlexContainer)`
  margin-bottom: 25px;
  flex-direction: column;
  align-items: flex-start;

  .ant-select-selection__choice {
    height: 23px !important;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: #d1f0ff;
    margin-top: 7px !important;
  }

  .ant-select-selection__rendered {
    padding-left: 20px;
  }

  .ant-select-selection__choice__content {
    font-size: 11px;
    letter-spacing: 0.2px;
    color: #0083be;
    font-weight: bold;
    height: 23px;
    display: flex;
    align-items: center;
  }

  .ant-select-remove-icon svg {
    fill: #0083be;
  }
`;

const Title = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #434b5d;
  margin-right: 3px;
  margin-bottom: 12px;
`;
