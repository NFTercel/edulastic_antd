import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const CommonInput = ({ onChange, value, size, ...restProps }) => (
  <Input onChange={e => onChange(e.target.value)} value={value} size={size} {...restProps} />
);

CommonInput.propTypes = {
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  size: PropTypes.oneOf(["default", "large", "small"])
};

CommonInput.defaultProps = {
  value: "",
  size: "large"
};

export default CommonInput;
