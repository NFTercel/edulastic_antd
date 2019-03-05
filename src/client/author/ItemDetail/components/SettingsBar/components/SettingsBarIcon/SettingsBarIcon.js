import React from "react";
import PropTypes from "prop-types";

import { Container, Divider } from "./styled";

const getMarginLeft = type => {
  switch (type) {
    case "30-70":
      return "30%";
    case "70-30":
      return "70%";
    case "50-50":
      return "50%";
    case "40-60":
      return "40%";
    case "60-40":
      return "60%";
    default:
      return 0;
  }
};

const SettingsBarIcon = ({ active, type }) => (
  <Container active={active}>
    <Divider active={active} type={type} getMarginLeft={getMarginLeft} />
  </Container>
);

SettingsBarIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default SettingsBarIcon;
