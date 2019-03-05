import React from "react";
import PropTypes from "prop-types";
import { Col, Select } from "antd";
import { StyledRow, StyledRowLabel } from "./styled";
import { selectsData } from "../../../common";

const PolicySelector = ({ openPolicy, closePolicy, changeField }) => (
  <React.Fragment>
    <StyledRowLabel gutter={16}>
      <Col span={12}>Open Policy</Col>
      <Col span={12}>Close Policy</Col>
    </StyledRowLabel>
    <StyledRow gutter={16}>
      <Col span={12}>
        <Select
          data-cy="openPolicy"
          defaultValue="Automatically on Start Date"
          size="large"
          style={{ width: "100%" }}
          value={openPolicy}
          onChange={changeField("openPolicy")}
        >
          {selectsData.openPolicy.map(({ value, text }) => (
            <Select.Option key={value} value={value} data-cy="open">
              {text}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={12}>
        <Select
          data-cy="closePolicy"
          defaultValue="Automatically on Due Date"
          size="large"
          style={{ width: "100%" }}
          value={closePolicy}
          onChange={changeField("closePolicy")}
        >
          {selectsData.closePolicy.map(({ value, text }) => (
            <Select.Option key={value} value={value} data-cy="close">
              {text}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </StyledRow>
  </React.Fragment>
);

PolicySelector.propTypes = {
  openPolicy: PropTypes.string.isRequired,
  closePolicy: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired
};

export default PolicySelector;
