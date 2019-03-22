import React from "react";
import PropTypes from "prop-types";
import { StyledDiv, StyledButton } from "./styled";

class CalculatorButton extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    return (
      <StyledDiv wide={this.props.wide}>
        <StyledButton onClick={this.handleClick} orange={this.props.orange}>
          {this.props.name}
        </StyledButton>
      </StyledDiv>
    );
  }
}
CalculatorButton.propTypes = {
  name: PropTypes.string,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
  clickHandler: PropTypes.func
};
export default CalculatorButton;
