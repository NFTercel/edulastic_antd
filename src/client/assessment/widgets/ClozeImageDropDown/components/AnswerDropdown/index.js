import PropTypes from "prop-types";
import React from "react";
import { Select } from "antd";

import { SelectContainer } from "./styled/SelectContainer";

const AnswerDropdown = ({ responseIndex, style, onChange, options, defaultValue }) => (
  <SelectContainer style={style}>
    <Select
      data-cy={`dropdown-res-${responseIndex}`}
      defaultValue={defaultValue}
      onChange={value => {
        onChange(value);
      }}
    >
      {options.map((item, index) => (
        <Select.Option data-cy={`dropdown-res-item-${responseIndex}-${index}`} key={index} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  </SelectContainer>
);

AnswerDropdown.propTypes = {
  responseIndex: PropTypes.number,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  style: PropTypes.object.isRequired
};

AnswerDropdown.defaultProps = {
  defaultValue: "",
  responseIndex: 0
};

export default AnswerDropdown;
