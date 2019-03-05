import React from "react";
import { Select } from "antd";
import { Col } from "antd";
import { StyledRow, StyledRowLabel } from "./styled";

const ClassSelector = ({ onChange, fetchStudents, selectedGroups, group }) => (
  <React.Fragment>
    <StyledRowLabel gutter={16}>
      <Col span={12}>Class/Group Section</Col>
    </StyledRowLabel>
    <StyledRow>
      <Col span={24}>
        <Select
          data-cy="selectClass"
          placeholder="Please select"
          style={{ width: "100%" }}
          mode="multiple"
          cache="false"
          onChange={onChange}
          onSelect={classId => {
            fetchStudents({ classId });
          }}
          value={selectedGroups}
        >
          {group.map(data => (
            <Select.Option data-cy="class" key={data._id} value={data._id}>
              {data.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </StyledRow>
  </React.Fragment>
);

export default ClassSelector;
