import React from "react";
import PropTypes from "prop-types";
import { Col, Select, Radio } from "antd";
import { StyledRowLabel, StyledRow } from "./styled";

const RadioGroup = Radio.Group;

const StudentsSelector = ({ specificStudents, students = [], updateStudents, onChange, studentNames }) => (
  <React.Fragment>
    <StyledRow gutter={16}>
      <Col span={24}>
        <RadioGroup value={specificStudents ? 2 : 1}>
          <Radio value={1} onClick={() => onChange("specificStudents", false)}>
            Entire Class
          </Radio>
          <Radio value={2} data-cy="specificStudent" onClick={() => onChange("specificStudents", true)}>
            Specific Student
          </Radio>
        </RadioGroup>
      </Col>
    </StyledRow>
    {specificStudents && (
      <React.Fragment>
        <StyledRowLabel gutter={16}>
          <Col span={12}>Student</Col>
        </StyledRowLabel>
        <StyledRow>
          <Col span={24}>
            <Select
              placeholder="Please select"
              style={{ width: "100%" }}
              mode="multiple"
              onChange={updateStudents}
              value={studentNames}
            >
              {students.map(({ _id, firstName, lastName, groupId }) => (
                <Select.Option key={_id} value={_id}>
                  {`${firstName || "Anonymous"} ${lastName || ""}`}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </StyledRow>
      </React.Fragment>
    )}
  </React.Fragment>
);

StudentsSelector.propTypes = {
  studentNames: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  updateStudents: PropTypes.func.isRequired
};

StudentsSelector.defaultProps = {
  studentNames: []
};

export default StudentsSelector;
