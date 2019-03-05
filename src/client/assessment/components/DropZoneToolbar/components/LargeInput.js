import React from "react";
import PropTypes from "prop-types";

import { FlexContainer } from "@edulastic/common";

import { StyledInput } from "../styled/StyledInput";
import { Label } from "../styled/Label";

const LargeInput = ({ value, onChange, type, label, ...restProps }) => (
  <FlexContainer>
    <StyledInput type={type} value={value} onChange={e => onChange(e.target.value)} size="large" {...restProps} />
    <Label>{label}</Label>
  </FlexContainer>
);

LargeInput.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default LargeInput;
