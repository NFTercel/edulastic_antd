import React from "react";
import PropTypes from "prop-types";

import { StyledDiv, StyledDivF } from "./styled";

class Display extends React.Component {
  render() {
    return (
      <StyledDiv className="component-display">
        <StyledDivF>{this.props.value}</StyledDivF>
      </StyledDiv>
    );
  }
}
Display.propTypes = {
  value: PropTypes.string
};
export default Display;
