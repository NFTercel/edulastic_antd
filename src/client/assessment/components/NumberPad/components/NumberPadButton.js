import React from "react";
import PropTypes from "prop-types";

import { Item } from "../styled/Item";

const NumberPadButton = ({ children, onClick, buttonStyle }) => (
  <Item style={buttonStyle} onClick={onClick}>{children}</Item>
);

NumberPadButton.propTypes = {
  children: PropTypes.any.isRequired,
  buttonStyle: PropTypes.object,
  onClick: PropTypes.func
};

NumberPadButton.defaultProps = {
  onClick: () => {},
  buttonStyle: {}
};

export default NumberPadButton;
